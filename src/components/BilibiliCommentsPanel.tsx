import React, { useState } from "react";
import { BILIBILI_COMMENTS, BILIBILI_UP_INFO, CommunityComment, CommentKeyword } from "../data/bilibiliCommentsData";
import { CommentWordCloud } from "./CommentWordCloud";
import { MessageSquare, ThumbsUp, Flame, Filter, ExternalLink, Sparkles, Tv, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BilibiliCommentsPanelProps {
  onSelectModelFilter?: (modelName: string) => void;
  activeKeyword: CommentKeyword | null;
  onSelectKeyword: (keyword: CommentKeyword | null) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const BilibiliCommentsPanel: React.FC<BilibiliCommentsPanelProps> = ({
  onSelectModelFilter,
  activeKeyword,
  onSelectKeyword,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedModelTag, setSelectedModelTag] = useState<string>("ALL");
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  const categories = [
    { id: "ALL", label: "全部实测热评" },
    { id: "slop-complaint", label: "屎山破防/吐槽" },
    { id: "token-cost", label: "Token账单惊叹" },
    { id: "bug-postmortem", label: "深坑代码复盘" },
    { id: "model-debate", label: "模型战力论剑" },
  ];

  const modelTags = [
    "ALL",
    "DeepSeek V4.1 Flash",
    "GPT-6 Astra",
    "Gemini 3.8",
    "Kimi K3",
    "美团龙猫 LongCat 2.0",
    "Grok 4.6",
    "Claude Fable 5.1",
  ];

  const filteredComments = BILIBILI_COMMENTS.filter((c) => {
    const matchCategory = activeCategory === "ALL" || c.category === activeCategory;
    const matchModel =
      selectedModelTag === "ALL" ||
      (c.modelTagged && c.modelTagged.toLowerCase().includes(selectedModelTag.toLowerCase()));
    return matchCategory && matchModel;
  });

  const handleToggleLike = (id: string) => {
    setLikedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="mb-20 sm:mb-28">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/[0.08] pb-4 mb-6 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#00aeec]/10 text-[#00aeec] border border-[#00aeec]/30 text-[11px] font-mono-code font-semibold flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              COMMUNITY HOT TAKES
            </span>
            <span className="font-mono-code text-[11px] text-zinc-500">
              UP: {BILIBILI_UP_INFO.name} (UID: {BILIBILI_UP_INFO.mid})
            </span>
          </div>
          <h2 className="font-serif-title italic text-3xl sm:text-4xl text-white font-normal leading-tight mt-2">
            B站《屎山论剑》实测精选热评与词云
          </h2>
          <span className="font-mono-code text-[11px] text-zinc-400 block mt-1">
            严选自 12 期真实视频评论区与 UP 主互动 · 抓取高频槽点生成交互式词云，直达斩杀线模型高亮
          </span>
        </div>

        {/* Direct Link */}
        <a
          href={BILIBILI_UP_INFO.spaceUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00aeec]/10 text-[#00aeec] hover:bg-[#00aeec]/20 border border-[#00aeec]/30 font-mono-code text-xs transition-all self-start sm:self-auto"
        >
          <Tv className="w-3.5 h-3.5" />
          <span>查看 B 站原评论区</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Interactive Keyword Word Cloud Component */}
      <CommentWordCloud
        activeKeyword={activeKeyword}
        onSelectKeyword={onSelectKeyword}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />

      {/* Control Filters Bar */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono-code text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeCategory === cat.id
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Model Tag Filter */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono-code text-[11px]">
          <span className="text-zinc-500 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> 模型关联:
          </span>
          <select
            value={selectedModelTag}
            onChange={(e) => setSelectedModelTag(e.target.value)}
            className="bg-[#121218] text-zinc-200 border border-white/[0.12] rounded px-2.5 py-1 text-xs outline-none focus:border-[#00aeec]"
          >
            {modelTags.map((t) => (
              <option key={t} value={t}>
                {t === "ALL" ? "全部关联模型" : t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredComments.map((comment) => {
          const isLiked = likedComments[comment.id];
          return (
            <div
              key={comment.id}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className={`p-4 sm:p-5 rounded-xl border transition-all flex flex-col justify-between ${
                comment.isUpReply
                  ? "bg-[#00aeec]/[0.03] border-[#00aeec]/30"
                  : "bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.08]"
              }`}
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    {/* Avatar */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                        comment.isUpReply
                          ? "bg-[#00aeec] text-black"
                          : "bg-white/[0.08] text-zinc-300 border border-white/[0.1]"
                      }`}
                    >
                      {comment.avatarText}
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-medium ${
                          comment.isUpReply ? "text-[#00aeec] font-bold" : "text-zinc-200"
                        }`}
                      >
                        {comment.author}
                      </span>
                      <span
                        className={`text-[10px] font-mono-code px-1.5 py-0.2 rounded ${
                          comment.isUpReply
                            ? "bg-[#00aeec]/20 text-[#00aeec] font-semibold"
                            : "bg-white/[0.06] text-zinc-400"
                        }`}
                      >
                        {comment.level}
                      </span>
                      {comment.isHot && (
                        <span className="flex items-center gap-0.5 text-[10px] font-mono-code text-rose-400 px-1 rounded bg-rose-500/10 border border-rose-500/20">
                          <Flame className="w-2.5 h-2.5" />
                          HOT
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-[11px] font-mono-code text-zinc-500">
                    {comment.timeAgo}
                  </span>
                </div>

                {/* Comment Content */}
                <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-light mb-3">
                  {comment.content}
                </p>
              </div>

              {/* Footer info: tags, likes, episode */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono-code text-[11px]">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-400 text-[10px]">
                    {comment.episodeTagged}
                  </span>
                  {comment.modelTagged && (
                    <button
                      onClick={() => onSelectModelFilter?.(comment.modelTagged!)}
                      className="px-1.5 py-0.5 rounded bg-[#00aeec]/10 text-[#00aeec] text-[10px] hover:underline"
                    >
                      #{comment.modelTagged}
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleToggleLike(comment.id)}
                  className={`inline-flex items-center gap-1 transition-colors ${
                    isLiked ? "text-rose-400 font-bold" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <ThumbsUp className={`w-3 h-3 ${isLiked ? "fill-rose-400" : ""}`} />
                  <span>{isLiked ? "已点赞" : comment.likes}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
