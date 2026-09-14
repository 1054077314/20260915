import React, { useState, useMemo } from "react";
import { EpisodeService } from "../../../services/episodeService";
import { CommentService } from "../../../services/commentService";
import { RealBilibiliCommentsPanel } from "../community/RealBilibiliCommentsPanel";
import {
  Tv,
  ExternalLink,
  Play,
  MessageSquare,
  Copy,
  Check,
  Filter,
  Sparkles,
  Flame,
  Eye,
  Film,
} from "lucide-react";
import { motion } from "motion/react";

export interface BilibiliEpisodesPanelProps {
  onSelectModelFilter?: (modelName: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const BilibiliEpisodesPanel: React.FC<BilibiliEpisodesPanelProps> = ({
  onSelectModelFilter,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [activeTab, setActiveTab] = useState<"episodes" | "comments">("comments");
  const [selectedModel, setSelectedModel] = useState<string>("ALL");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "play" | "danmaku">("asc");
  const [copiedBvid, setCopiedBvid] = useState<string | null>(null);

  const upInfo = useMemo(() => EpisodeService.getUpInfo(), []);
  const allComments = useMemo(() => CommentService.getAllComments(), []);

  const modelFilters = [
    "ALL",
    "DeepSeek",
    "GPT-6",
    "Claude",
    "美团龙猫",
    "Grok",
    "Kimi",
    "Qwen",
  ];

  const handleCopyBvid = (bvid: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(bvid);
    setCopiedBvid(bvid);
    setTimeout(() => setCopiedBvid(null), 2000);
  };

  // Filter episodes via EpisodeService
  const filteredEpisodes = useMemo(() => {
    return EpisodeService.filterAndSort({
      selectedModel,
      sortOrder,
    });
  }, [selectedModel, sortOrder]);

  return (
    <section
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="mb-20 sm:mb-28"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/[0.08] pb-4 mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 font-mono-code text-[11px] px-2 py-0.5 rounded bg-[#00aeec]/10 text-[#00aeec] border border-[#00aeec]/20">
              <Tv className="w-3 h-3" />
              <span>BILIBILI SOURCE · 100% 真实原生视频 & 评论溯源</span>
            </span>
          </div>
          <h2 className="font-serif-title italic text-3xl sm:text-4xl text-white font-normal leading-tight">
            Original Battlegrounds
          </h2>
          <span className="font-mono-code text-[11px] text-zinc-400 tracking-wider block mt-1">
            全 12 期《屎山论剑》原片视频档案、分集高光及真实开发者实测评论区
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08]">
          <button
            onClick={() => setActiveTab("comments")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "comments"
                ? "bg-[#00aeec] text-white font-bold shadow-md shadow-[#00aeec]/20"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>真实原评社区 ({allComments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("episodes")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "episodes"
                ? "bg-white text-black font-bold shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>12 期视频档案</span>
          </button>
        </div>
      </div>

      {/* Up Creator Hero Card */}
      <div className="p-4 sm:p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#00aeec]/20 border border-[#00aeec]/40 flex items-center justify-center shrink-0 shadow-lg shadow-[#00aeec]/10">
              <Tv className="w-7 h-7 text-[#00aeec]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg text-white">{upInfo.name}</span>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  B 站知名硬核科技 UP 主
                </span>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  UID: {upInfo.mid}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans mt-1 leading-relaxed">
                {upInfo.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <a
              href={upInfo.seasonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200 hover:text-white border border-white/[0.1] font-mono-code text-xs transition-colors flex items-center gap-1.5"
            >
              <Film className="w-3.5 h-3.5 text-[#00aeec]" />
              <span>查看 B 站官方合集</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>
            <a
              href={upInfo.spaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#00aeec] hover:bg-[#00aeec]/90 text-white font-mono-code text-xs font-bold transition-all shadow-lg shadow-[#00aeec]/25 hover:shadow-[#00aeec]/40 flex items-center gap-1.5"
            >
              <span>关注 UP 主主页</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Conditional Rendering: Real Comments Panel vs Episodes List */}
      {activeTab === "comments" ? (
        <RealBilibiliCommentsPanel />
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono-code">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-zinc-500 shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                <span>参测模型:</span>
              </span>
              {modelFilters.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedModel(m)}
                  className={`px-2.5 py-1 rounded-lg transition-colors shrink-0 cursor-pointer ${
                    selectedModel === m
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "bg-white/[0.04] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.08]"
                  }`}
                >
                  {m === "ALL" ? "全部 (12期)" : m}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
              <span className="text-zinc-500">排序:</span>
              <div className="flex items-center gap-1">
                {[
                  { id: "asc", label: "第1-12期" },
                  { id: "desc", label: "最新期优先" },
                  { id: "play", label: "播放量最高" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSortOrder(s.id as any)}
                    className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                      sortOrder === s.id
                        ? "bg-[#00aeec]/20 text-[#00aeec] font-bold border border-[#00aeec]/30"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Episode Video Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredEpisodes.map((ep) => (
              <motion.div
                key={ep.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/20 transition-all p-4 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 font-mono-code text-xs">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 font-bold border border-blue-500/20">
                      {ep.episode}
                    </span>
                    <button
                      onClick={(e) => handleCopyBvid(ep.bvid, e)}
                      className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1 cursor-pointer"
                      title="复制 BVID"
                    >
                      {copiedBvid === ep.bvid ? (
                        <>
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                          <span className="text-emerald-400">已复制</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-2.5 h-2.5" />
                          <span>{ep.bvid}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h3 className="font-sans font-bold text-white text-sm leading-snug group-hover:text-[#00aeec] transition-colors mb-2">
                    {ep.title}
                  </h3>

                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-3 line-clamp-2">
                    {ep.summary}
                  </p>

                  <div className="p-2.5 rounded-xl bg-amber-500/[0.05] border border-amber-500/20 text-amber-200/90 text-xs font-mono-code leading-relaxed mb-3">
                    <div className="text-[10px] text-amber-400/80 mb-0.5 flex items-center gap-1 font-semibold">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>实测名场面 / 核心考点:</span>
                    </div>
                    {ep.keyHighlight}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {ep.keyModels.map((m) => (
                      <span
                        key={m}
                        className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300 border border-white/[0.08]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono-code text-zinc-400">
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1 text-zinc-300">
                      <Eye className="w-3 h-3 text-zinc-400" />
                      {ep.playCount}
                    </span>
                    <span className="flex items-center gap-1 text-zinc-400">
                      <MessageSquare className="w-3 h-3" />
                      {ep.danmakuCount}
                    </span>
                  </div>

                  <a
                    href={ep.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#00aeec] hover:bg-[#00aeec]/90 text-white font-semibold text-xs transition-colors flex items-center gap-1 shadow-md shadow-[#00aeec]/20"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>原片播放</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
