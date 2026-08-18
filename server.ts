import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "25mb" }));

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "SnapFit Studio API" });
  });

  // 1. Gemini Chat API (AI Studio Consultation & Hidden Fee Advisor)
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { messages, context } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "messages array is required" });
        return;
      }

      const systemInstruction = `당신은 '스냅핏(SnapFit)'의 AI 사진 스튜디오 수석 컨설턴트 '핏매니저'입니다.
스냅핏은 강남언니처럼 '목적 기반 사진 스튜디오 소싱 & 표준 견적 비교'를 제공하는 플랫폼입니다.

핵심 역할:
1. 사진 촬영 목적(만삭/신생아/100일/돌/가족/웨딩/프로필/커플/반려동물 등)에 맞는 최적의 컨셉, 의상, 촬영 방식(스튜디오 vs 출장), 시기 가이드.
2. 스튜디오 가격의 숨은 추가금(원본 파일비, 헬퍼비, 주말할증, 인원추가비, 보정컷 추가비, 액자 업셀링 등) 주의사항 안내 및 실결제 견적 산정 팁 제공.
3. 스튜디오 선정 시 필수 확인 체크리스트(수유실, 대기실, 조명 스타일, 작가 경력, 원본 포함 여부) 명쾌한 답변.
4. 친절하고 신뢰감 있는 전문가 톤(존댓말)으로 간결하고 핵심적인 조언을 전달하세요.

컨텍스트 정보: ${JSON.stringify(context || {})}`;

      const ai = getAi();
      const contents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "답변을 생성하지 못했습니다.";
      res.json({ reply: replyText });
    } catch (err: any) {
      console.error("Gemini Chat Error:", err);
      res.status(500).json({ error: err.message || "Failed to generate chat response" });
    }
  });

  // 2. Gemini Concept Image Generation (High-quality concept moodboards, 1K/2K/4K resolution)
  app.post("/api/gemini/generate-concept-image", async (req, res) => {
    try {
      const { prompt, occasion, concept, imageSize = "1K", aspectRatio = "1:1" } = req.body;
      if (!prompt) {
        res.status(400).json({ error: "prompt is required" });
        return;
      }

      const enhancedPrompt = `High quality professional photo studio photoshoot for '${occasion || "Photography"}' with '${concept || "Natural"}' concept style. ${prompt}, cinematic lighting, photorealistic DSLR 85mm portrait, high dynamic range, aesthetic composition, pristine Korean studio aesthetic.`;

      const ai = getAi();
      
      // Use gemini-3.1-flash-image with resolution option (supports 1K, 2K, 4K)
      let imageUrl: string | null = null;
      let modelUsed = "gemini-3.1-flash-image";

      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-image",
          contents: {
            parts: [{ text: enhancedPrompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio as any,
              imageSize: (["1K", "2K", "4K"].includes(imageSize) ? imageSize : "1K") as any,
            },
          },
        });

        const candidates = response.candidates;
        if (candidates && candidates[0]?.content?.parts) {
          for (const part of candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
              imageUrl = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
              break;
            }
          }
        }
      } catch (genErr: any) {
        console.warn("Primary image model error, trying fallback:", genErr?.message);
        // Fallback to gemini-3.1-flash-lite-image
        modelUsed = "gemini-3.1-flash-lite-image";
        const fallbackResp = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite-image",
          contents: {
            parts: [{ text: enhancedPrompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio as any,
            },
          },
        });

        if (fallbackResp.candidates && fallbackResp.candidates[0]?.content?.parts) {
          for (const part of fallbackResp.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
              imageUrl = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
              break;
            }
          }
        }
      }

      if (!imageUrl) {
        res.status(500).json({ error: "이미지가 생성되지 않았습니다." });
        return;
      }

      res.json({
        imageUrl,
        imageSize,
        aspectRatio,
        modelUsed,
        prompt: enhancedPrompt,
      });
    } catch (err: any) {
      console.error("Image generation error:", err);
      res.status(500).json({ error: err.message || "Failed to generate image" });
    }
  });

  // 3. AI Quote Analyzer / Additional Fee Auditor
  app.post("/api/gemini/analyze-quote", async (req, res) => {
    try {
      const { quoteDetails } = req.body;
      const ai = getAi();
      const prompt = `다음 사진 스튜디오 견적 조건을 분석하여 소비자 관점에서 실결제 예상액과 잠재적 추가금 위험도를 정밀 진단해주세요:
${JSON.stringify(quoteDetails, null, 2)}

결과는 한국어로:
1. 실결제 예상가 산출 및 표기가 대비 차이 분석
2. 계약 전 반드시 물어봐야 할 숨은 비용 체크리스트 3가지
3. 가성비 & 퀄리티 평가 및 스튜디오 협상 팁
을 정돈된 형식으로 작성해주세요.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
      });

      res.json({ analysis: response.text });
    } catch (err: any) {
      console.error("Quote analysis error:", err);
      res.status(500).json({ error: err.message || "Failed to analyze quote" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
