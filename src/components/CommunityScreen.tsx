import React, { useState } from 'react';
import { CommunityPost } from '../types';
import { INITIAL_COMMUNITY_POSTS } from '../data/mockData';
import { Heart, MessageCircle, Share2, Plus, AlertTriangle, ImagePlus, X } from 'lucide-react';

export const CommunityScreen: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // New post form state
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState<'추가금 제보' | '후기 자랑' | '촬영 질문' | '자유수다'>('추가금 제보');

  const categories = ['전체', '추가금 제보', '후기 자랑', '촬영 질문', '자유수다'];

  const filteredPosts =
    selectedCategory === '전체'
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      n: '익명_예비맘',
      category: newCategory,
      time: '방금 전',
      title: newTitle,
      text: newText,
      images: [],
      likes: 1,
      commentsCount: 0,
      isWarn: newCategory === '추가금 제보',
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewText('');
    setIsWriteModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Top Nav */}
      <div className="h-[54px] flex items-center justify-between px-5 border-b border-[#F2F4F6] shrink-0">
        <h2 className="text-[20px] font-black text-[#191F28] tracking-tight">커뮤니티</h2>
        <button
          onClick={() => setIsWriteModalOpen(true)}
          className="flex items-center gap-1 bg-[#111111] text-white px-3.5 py-1.5 rounded-full text-[13px] font-extrabold hover:bg-[#333] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>제보 / 글쓰기</span>
        </button>
      </div>

      {/* Category Chips Bar */}
      <div className="flex gap-2 px-5 py-3 overflow-x-auto no-scrollbar border-b border-[#F2F4F6] shrink-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-[13.5px] font-extrabold shrink-0 transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#111111] text-white shadow-xs'
                : 'bg-[#F2F4F6] text-[#4A5058] hover:bg-[#E5E8EB]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-[#F2F4F6] pb-16">
        {/* Whistleblower Banner */}
        <div className="p-4 mx-5 my-3 bg-[#FFEDE6] rounded-[16px] border border-[#FFD0BE] flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#FF5C1F] shrink-0 mt-0.5" />
          <div className="text-[13px] text-[#5A4034] leading-relaxed">
            <b className="text-[#FF5C1F] font-black">추가금 제보 캠페인 진행 중!</b>
            <p className="mt-0.5">
              계약서에 사전 고지되지 않은 원본비/헬퍼비/추가금을 제보해주시면 스냅핏이 검증 후 위험 스튜디오 경고 뱃지를 부착합니다.
            </p>
          </div>
        </div>

        {filteredPosts.map((post) => (
          <div key={post.id} className="p-5 space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F2F4F6] text-[#8B95A1] font-black text-xs flex items-center justify-center">
                  {post.n[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <b className="text-[14.5px] font-extrabold text-[#191F28]">{post.n}</b>
                    {post.isWarn && (
                      <span className="bg-[#FFECEA] text-[#E5484D] text-[10.5px] font-black px-1.5 py-0.2 rounded">
                        추가금 제보
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] text-[#8B95A1]">
                    {post.time} · {post.category}
                  </div>
                </div>
              </div>
            </div>

            {/* Title & Body */}
            <div>
              <h3 className="text-[16px] font-black text-[#191F28] tracking-tight mb-1.5 leading-snug">
                {post.title}
              </h3>
              <p className="text-[14px] text-[#333A42] leading-relaxed whitespace-pre-line">
                {post.text}
              </p>
            </div>

            {/* Images */}
            {post.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {post.images.map((img, i) => (
                  <div
                    key={i}
                    className="w-[140px] h-[140px] rounded-[12px] overflow-hidden shrink-0 bg-[#F2F4F6]"
                  >
                    <img
                      src={img}
                      alt="post photo"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center gap-5 pt-1 text-[13px] font-semibold text-[#8B95A1]">
              <button
                onClick={() => toggleLike(post.id)}
                className="flex items-center gap-1.5 hover:text-[#FF5C1F] transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-[#191F28] transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>{post.commentsCount}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-[#191F28] transition-colors ml-auto">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write Post Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-[420px] bg-white rounded-[20px] shadow-2xl p-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F2F4F6]">
              <h3 className="text-[17px] font-black text-[#191F28]">커뮤니티 글쓰기</h3>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1 text-[#8B95A1] hover:text-[#191F28]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-[13px] font-bold text-[#8B95A1] mb-1.5">카테고리</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['추가금 제보', '후기 자랑', '촬영 질문', '자유수다'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewCategory(cat)}
                      className={`py-2 rounded-xl text-[13px] font-bold transition-all ${
                        newCategory === cat
                          ? 'bg-[#111111] text-white shadow-xs'
                          : 'bg-[#F2F4F6] text-[#4A5058]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#8B95A1] mb-1.5">제목</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="제목을 입력하세요 (예: 원본비 30만원 당황스럽네요)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E8EB] text-[14px] font-semibold text-[#191F28] focus:outline-none focus:border-[#111111]"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#8B95A1] mb-1.5">내용</label>
                <textarea
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  rows={4}
                  placeholder="스튜디오명과 실제 겪으신 상황이나 궁금한 점을 적어주세요."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E8EB] text-[14px] font-semibold text-[#191F28] focus:outline-none focus:border-[#111111] resize-none"
                  required
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-[#F2F4F6] text-[#4A5058] font-bold text-[14px]"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#111111] text-white font-extrabold text-[14px] hover:bg-[#333]"
                >
                  등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
