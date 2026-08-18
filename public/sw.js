// 스냅핏 서비스 워커
// HTML은 네트워크 우선(항상 최신 배포를 받도록), 해시가 붙은 정적 자산은 캐시 우선.
const VERSION = 'snapfit-v1';
const ASSET_CACHE = `${VERSION}-assets`;
const PAGE_CACHE = `${VERSION}-pages`;

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // 해시 파일명이 붙는 빌드 자산: 캐시 우선
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((res) => {
            const copy = res.clone();
            caches.open(ASSET_CACHE).then((c) => c.put(request, copy));
            return res;
          }),
      ),
    );
    return;
  }

  // 그 외(HTML 내비게이션 포함): 네트워크 우선, 실패 시 캐시 → 마지막으로 index.html
  event.respondWith(
    fetch(request)
      .then((res) => {
        const copy = res.clone();
        caches.open(PAGE_CACHE).then((c) => c.put(request, copy));
        return res;
      })
      .catch(() =>
        caches
          .match(request)
          .then((cached) => cached || (request.mode === 'navigate' ? caches.match('/index.html') : undefined)),
      ),
  );
});
