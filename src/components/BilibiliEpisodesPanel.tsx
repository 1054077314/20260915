import React, { useState, useMemo } from "react";
import { BILIBILI_EPISODES, BILIBILI_UP_INFO, BilibiliVideoRecord } from "../data/bilibiliData";
import { REAL_BILIBILI_COMMENTS } from "../data/realBilibiliComments";
import { RealBilibiliCommentsPanel } from "./RealBilibiliCommentsPanel";
import { Tv, ExternalLink, Play, MessageSquare, Copy, Check, Filter, Sparkles, Flame, Eye, Film } from "lucide-react";
import { motion } from "motion/react";

interface BilibiliEpisodesPanelProps {
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

  const filteredEpisodes = useMemo(() => {
    let list = [...BILIBILI_EPISODES];

    if (selectedModel !== "ALL") {
      list = list.filter((ep) =>
        ep.keyModels.some((m) => m.toLowerCase().includes(selectedModel.toLowerCase())) ||
        ep.title.toLowerCase().includes(selectedModel.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      list.sort((a, b) => a.episodeIndex - b.episodeIndex);
    } else if (sortOrder === "desc") {
      list.sort((a, b) => b.episodeIndex - a.episodeIndex);
    } else if (sortOrder === "play") {
      const parsePlay = (p: string) => parseFloat(p.replace("万", "")) * 10000;
      list.sort((a, b) => parsePlay(b.playCount) - parsePlay(a.playCount));
    } else if (sortOrder === "danmaku") {
      const parseDan = (d: string) => parseInt(d.replace(/,/g, ""), 10) || 0;
      list.sort((a, b) => parseDan(b.danmakuCount) - parseDan(a.danmakuCount));
    }

    return list;
  }, [selectedModel, sortOrder]);

  return (
    <section className="mb-20 sm:mb-28">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/[0.08] pb-4 mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="p-1 rounded bg-[#00aeec]/10 text-[#00aeec] border border-[#00aeec]/30 text-[11px] font-mono-code font-semibold flex items-center gap-1">
              <Tv className="w-3 h-3" />
              BILIBILI ARCHIVE &amp; COMMUNITY
            </span>
            <span className="font-mono-code text-[11px] text-zinc-400">
              UP 主: <strong className="text-zinc-200">{BILIBILI_UP_INFO.name}</strong> (UID: {BILIBILI_UP_INFO.mid})
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] font-mono-code">
              已全量抓取 404 条原评
            </span>
          </div>
          <h2 className="font-serif-title italic text-3xl sm:text-4xl text-white font-normal leading-tight mt-2">
            B站《屎山论剑》原片实测与真实原评
          </h2>
          <span className="font-mono-code text-[11px] text-zinc-400 block mt-1">
            全 12 期官方视频档案 · 404 条全量真实热评与楼中楼 · 真实技术实测与开发者实战研讨
          </span>
        </div>

        {/* Space and Collection Direct Links */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <a
            href={BILIBILI_UP_INFO.seasonUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00aeec] text-black font-semibold hover:bg-[#00aeec]/90 font-mono-code text-xs transition-all shadow-[0_0_12px_rgba(0,174,236,0.3)]"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>前往 B 站合集播放全部</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={BILIBILI_UP_INFO.spaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.1] font-mono-code text-xs transition-all"
          >
            <span>UP主空间</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </a>
        </div>
      </div>

      {/* Main Mode Tabs Switcher */}
      <div className="flex items-center gap-2.5 mb-6 border-b border-white/[0.08] pb-3">
        <button
          onClick={() => setActiveTab("comments")}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono-code font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "comments"
              ? "bg-[#00aeec] text-black shadow-lg shadow-[#00aeec]/20"
              : "bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.08]"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>B 站 404 条真实原评与研讨</span>
          <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono-code ${activeTab === "comments" ? "bg-black/20 text-black font-bold" : "bg-white/10 text-zinc-300"}`}>
            {REAL_BILIBILI_COMMENTS.length} 条已抓取
          </span>
        </button>

        <button
          onClick={() => setActiveTab("episodes")}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono-code font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "episodes"
              ? "bg-[#00aeec] text-black shadow-lg shadow-[#00aeec]/20"
              : "bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.08]"
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          <span>官方 12 期实测视频档案</span>
          <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono-code ${activeTab === "episodes" ? "bg-black/20 text-black font-bold" : "bg-white/10 text-zinc-300"}`}>
            {BILIBILI_EPISODES.length} 期全
          </span>
        </button>
      </div>

      {/* Tab 1: Real Comments Panel */}
      {activeTab === "comments" && (
        <RealBilibiliCommentsPanel
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      )}

      {/* Tab 2: Episodes Video Archive Grid */}
      {activeTab === "episodes" && (
        <div>
          {/* Filter and Controls Toolbar */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Model Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono-code text-xs">
          <span className="text-zinc-500 text-[11px] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> 参测模型:
          </span>
          {modelFilters.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedModel(m)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                selectedModel === m
                  ? "bg-white text-black font-semibold"
                  : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]"
              }`}
            >
              {m === "ALL" ? "全部12期" : m}
            </button>
          ))}
        </div>

        {/* Sort select */}
        <div className="flex items-center gap-2 font-mono-code text-xs">
          <span className="text-zinc-500 text-[11px]">排序方式:</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="bg-[#121218] text-zinc-200 border border-white/[0.12] rounded px-2.5 py-1 text-xs outline-none focus:border-[#00aeec]"
          >
            <option value="asc">按期数顺序列出 (第1期 → 12期)</option>
            <option value="desc">按期数倒序展示 (第12期 → 1期)</option>
            <option value="play">按播放量由高到低</option>
            <option value="danmaku">按弹幕数量由高到低</option>
          </select>
        </div>
      </div>

      {/* 12 Episodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEpisodes.map((ep) => (
          <div
            key={ep.id}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="group rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#00aeec]/40 transition-all duration-200 flex flex-col overflow-hidden"
          >
            {/* Video Cover Area with Duration and Stats */}
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
              <img
                src={ep.cover}
                alt={ep.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Fallback dark gradient banner if external image is blocked
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Episode badge on top left */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm border border-white/20 text-[11px] font-mono-code font-bold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00aeec]" />
                {ep.episode}
              </div>

              {/* Duration badge on bottom right */}
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[11px] font-mono-code text-zinc-300">
                {ep.duration}
              </div>

              {/* Stats overlay bottom left */}
              <div className="absolute bottom-2 left-2 flex items-center gap-2.5 text-[11px] font-mono-code text-zinc-200">
                <span className="flex items-center gap-1 drop-shadow">
                  <Eye className="w-3 h-3 text-zinc-400" />
                  {ep.playCount}
                </span>
                <span className="flex items-center gap-1 drop-shadow">
                  <MessageSquare className="w-3 h-3 text-zinc-400" />
                  {ep.danmakuCount} 弹幕
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                {/* BVID bar & copy button */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono-code text-[11px] text-[#00aeec] font-semibold tracking-wider">
                    {ep.bvid}
                  </span>
                  <button
                    onClick={(e) => handleCopyBvid(ep.bvid, e)}
                    title="复制 BV 号"
                    className="text-[10px] font-mono-code text-zinc-400 hover:text-white flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                  >
                    {copiedBvid === ep.bvid ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">已复制</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>复制</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-zinc-100 leading-snug line-clamp-2 group-hover:text-[#00aeec] transition-colors mb-2">
                  {ep.title}
                </h3>

                {/* Key Highlight / Focus */}
                <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-2 mb-3">
                  {ep.keyHighlight}
                </p>

                {/* Tested Models Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {ep.keyModels.map((m) => (
                    <button
                      key={m}
                      onClick={() => onSelectModelFilter && onSelectModelFilter(m)}
                      title={`点击在上方斩杀线表格中筛选: ${m}`}
                      className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-white/[0.04] hover:bg-[#00aeec]/20 hover:text-[#00aeec] text-zinc-400 border border-white/[0.06] transition-colors cursor-pointer"
                    >
                      #{m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Link Button */}
              <div className="pt-2 border-t border-white/[0.06]">
                <a
                  href={ep.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-[#00aeec]/10 hover:bg-[#00aeec] text-[#00aeec] hover:text-black font-mono-code text-xs font-semibold transition-all flex items-center justify-center gap-2 group/btn border border-[#00aeec]/25 hover:border-[#00aeec]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>在 B 站观看实测 / 看真实弹幕</span>
                  <ExternalLink className="w-3 h-3 opacity-70 group-hover/btn:opacity-100" />
                </a>
              </div>
            </div>
          </div>
        ))}
          </div>
        </div>
      )}
    </section>
  );
};
