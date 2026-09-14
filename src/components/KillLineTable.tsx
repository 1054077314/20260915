import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { KillLineRecord, StatusType } from "../types";
import { CommentKeyword } from "../data/bilibiliCommentsData";
import { ArrowUpDown, ChevronDown, ChevronUp, ExternalLink, HelpCircle, ChevronsUpDown, Loader2, Tv, Sparkles, X } from "lucide-react";

interface KillLineTableProps {
  data: KillLineRecord[];
  selectedModel: KillLineRecord;
  onSelectModel: (model: KillLineRecord) => void;
  selectedForCompare?: KillLineRecord[];
  onToggleCompare?: (model: KillLineRecord) => void;
  onOpenDetailModal: (model: KillLineRecord) => void;
  filterTier: string;
  onFilterTierChange: (t: string) => void;
  sortBy: "score" | "name" | "diamond" | "king";
  onSortByChange: (s: "score" | "name" | "diamond" | "king") => void;
  activeKeyword?: CommentKeyword | null;
  onClearKeyword?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const KillLineTable: React.FC<KillLineTableProps> = ({
  data,
  selectedModel,
  onSelectModel,
  onOpenDetailModal,
  filterTier,
  onFilterTierChange,
  sortBy,
  onSortByChange,
  activeKeyword,
  onClearKeyword,
  onMouseEnter,
  onMouseLeave,
}) => {
  // State for expanded rows - empty by default so it starts in maximally streamlined collapsed mode
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  // Skeleton transition state when filtering or sorting
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Trigger smooth skeleton loading during filter or sort changes
  const handleFilterChange = (tabId: string) => {
    if (tabId === filterTier) return;
    setIsTransitioning(true);
    onFilterTierChange(tabId);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 240);
  };

  const handleSortChange = (newSort: "score" | "name" | "diamond" | "king") => {
    if (newSort === sortBy) return;
    setIsTransitioning(true);
    onSortByChange(newSort);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 240);
  };

  // Toggle single row expand/collapse
  const toggleExpand = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Toggle all rows expand/collapse
  const isAllExpanded = data.length > 0 && data.every((row) => expandedIds[row.id]);
  const toggleAll = () => {
    if (isAllExpanded) {
      setExpandedIds({});
    } else {
      const next: Record<string, boolean> = {};
      data.forEach((r) => {
        next[r.id] = true;
      });
      setExpandedIds(next);
    }
  };

  // Status indicator rendering
  const renderStatus = (status: StatusType, text: string) => {
    if (status === "pass") {
      return (
        <div className="inline-flex items-center gap-1.5 font-mono-code text-xs text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] shrink-0" />
          <span className="font-medium tracking-tight">{text}</span>
        </div>
      );
    }
    if (status === "warn") {
      return (
        <div className="inline-flex items-center gap-1.5 font-mono-code text-xs text-amber-400">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)] shrink-0" />
          <span className="font-medium tracking-tight">{text}</span>
        </div>
      );
    }
    if (status === "fail") {
      return (
        <div className="inline-flex items-center gap-1.5 font-mono-code text-xs text-rose-400/90">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80 shrink-0" />
          <span className="tracking-tight">{text}</span>
        </div>
      );
    }
    return (
      <div className="inline-flex items-center gap-1.5 font-mono-code text-xs text-zinc-600">
        <span className="w-1 h-1 rounded-full bg-zinc-700 shrink-0" />
        <span className="text-zinc-600">无记录</span>
      </div>
    );
  };

  const renderTier = (tier: string) => {
    const colorMap: Record<string, string> = {
      T0: "text-rose-400 font-bold",
      T1: "text-amber-400 font-bold",
      T2: "text-blue-400 font-semibold",
      T3: "text-emerald-400 font-semibold",
    };
    return (
      <span className={`font-mono-code text-xs tracking-wider shrink-0 ${colorMap[tier] || "text-zinc-500"}`}>
        {tier}
      </span>
    );
  };

  return (
    <section id="kill-line-matrix" className="mb-20 sm:mb-28 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/[0.08] pb-4 mb-4 gap-3">
        <div>
          <h2 className="font-serif-title italic text-3xl sm:text-4xl text-white font-normal leading-tight">
            The Kill-Line Matrix
          </h2>
          <span className="font-mono-code text-[11px] text-zinc-500 tracking-wider uppercase block mt-1">
            王者绝壁斩杀线 · 点击任意行展开黄金线与实测证言
          </span>
        </div>

        {/* Minimal Controls */}
        <div className="flex items-center gap-2.5 font-mono-code text-xs flex-wrap">
          {/* Expand/Collapse All Button */}
          <button
            onClick={toggleAll}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-zinc-400 hover:text-white transition-colors text-xs"
            title={isAllExpanded ? "折叠全部" : "展开全部"}
          >
            <ChevronsUpDown className="w-3 h-3 text-zinc-500" />
            <span>{isAllExpanded ? "折叠全部" : "展开全部"}</span>
          </button>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-0.5 rounded">
            {[
              { id: "ALL", label: "全部" },
              { id: "TOP", label: "突围旗舰" },
              { id: "FLASH", label: "Flash" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id)}
                className={`px-2.5 py-1 rounded transition-colors text-xs flex items-center gap-1 ${
                  filterTier === tab.id
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] px-2.5 py-1 rounded text-zinc-400">
            <ArrowUpDown className="w-3 h-3 text-zinc-500" />
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as any)}
              className="bg-transparent border-none text-zinc-300 hover:text-white focus:outline-none cursor-pointer text-xs font-mono-code"
            >
              <option value="score" className="bg-[#121216] text-white">默认战力</option>
              <option value="king" className="bg-[#121216] text-white">王者表现</option>
              <option value="diamond" className="bg-[#121216] text-white">钻石表现</option>
              <option value="name" className="bg-[#121216] text-white">名称 A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Keyword Cloud Filter Indicator */}
      {activeKeyword && (
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-[#00aeec]/15 via-[#00aeec]/5 to-transparent border border-[#00aeec]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 shadow-[0_0_20px_rgba(0,174,236,0.1)]">
          <div className="flex items-center gap-2 text-xs font-mono-code">
            <span className="p-1 rounded-md bg-[#00aeec]/20 text-[#00aeec]">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-zinc-400">词云联动过滤:</span>
              <span className="px-2 py-0.5 rounded-full bg-[#00aeec]/20 border border-[#00aeec]/40 text-white font-bold">
                {activeKeyword.text}
              </span>
              <span className="text-zinc-400 text-[11px]">
                ({activeKeyword.categoryLabel} · 已高亮匹配 {data.length} 款模型)
              </span>
            </div>
          </div>
          <button
            onClick={onClearKeyword}
            className="flex items-center gap-1 text-xs font-mono-code text-[#00aeec] hover:text-white px-2.5 py-1 rounded bg-[#00aeec]/20 hover:bg-[#00aeec]/30 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span>清除词云筛选</span>
          </button>
        </div>
      )}

      {/* Streamlined Table: Maximally Simplified Layout with Skeleton Loading */}
      <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-white/[0.01] relative">
        {/* Subtle loading indicator bar */}
        {isTransitioning && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-pulse z-20" />
        )}

        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.02] font-mono-code text-[11px] text-zinc-500 uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-6 font-medium">模型名称</th>
              <th className="py-3 px-4 font-medium w-28 text-center">天梯梯队</th>
              <th className="py-3 px-4 font-medium">
                <div className="inline-flex items-center gap-1">
                  <span>王者线状态</span>
                  <div className="relative group cursor-help">
                    <HelpCircle className="w-3 h-3 text-zinc-600 hover:text-zinc-400" />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover:block bg-[#16161c] text-zinc-300 text-[10px] p-2 rounded shadow-2xl border border-white/10 w-48 z-20 font-sans normal-case">
                      全 12 期最残酷绝壁。仅 Astra 一轮秒杀，绝大多数模型在此折戟。
                    </div>
                  </div>
                </div>
              </th>
              <th className="py-3 px-4 sm:px-6 text-right font-medium w-20">详情</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {isTransitioning ? (
              // ---------------- ELEGANT SKELETON SCREEN ----------------
              Array.from({ length: 6 }).map((_, idx) => (
                <tr key={`skeleton-${idx}`} className="bg-white/[0.01] animate-pulse">
                  {/* Model Name Skeleton */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-4 rounded bg-white/[0.09] transition-all"
                        style={{ width: `${90 + (idx % 3) * 35}px` }}
                      />
                      <div className="h-3 w-16 rounded bg-white/[0.04] hidden sm:block" />
                    </div>
                  </td>

                  {/* Tier Skeleton */}
                  <td className="py-4 px-4 text-center">
                    <div className="h-4 w-9 rounded bg-white/[0.07] mx-auto" />
                  </td>

                  {/* King Line Status Skeleton */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white/[0.1] shrink-0" />
                      <div
                        className="h-3.5 rounded bg-white/[0.06]"
                        style={{ width: `${110 + (idx % 2) * 40}px` }}
                      />
                    </div>
                  </td>

                  {/* Chevron Skeleton */}
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <div className="h-4 w-4 rounded-full bg-white/[0.05] ml-auto" />
                  </td>
                </tr>
              ))
            ) : (
              // ---------------- REAL DATA ROWS ----------------
              data.map((row) => {
                const isExpanded = !!expandedIds[row.id];
                const isSelected = selectedModel?.id === row.id;
                const isKeywordHit = Boolean(
                  activeKeyword &&
                    (activeKeyword.relatedModelIds.includes(row.id) ||
                      row.model.toLowerCase().includes(activeKeyword.text.toLowerCase()) ||
                      row.quote.toLowerCase().includes(activeKeyword.text.toLowerCase()))
                );

                return (
                  <React.Fragment key={row.id}>
                    {/* Collapsed Clean Row: Only Model Name, Tier, and King Status */}
                    <tr
                      onClick={() => {
                        onSelectModel(row);
                        toggleExpand(row.id);
                      }}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                      className={`transition-colors cursor-pointer group select-none ${
                        isKeywordHit
                          ? "bg-[#00aeec]/[0.08] hover:bg-[#00aeec]/[0.12] ring-1 ring-inset ring-[#00aeec]/40"
                          : isExpanded
                          ? "bg-white/[0.035]"
                          : isSelected
                          ? "bg-white/[0.025]"
                          : "hover:bg-white/[0.02]"
                      }`}
                    >
                      {/* 1. Model Name */}
                      <td className="py-3.5 px-4 sm:px-6 align-middle">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm sm:text-[15px] font-medium text-white tracking-tight group-hover:text-rose-200 transition-colors">
                            {row.model}
                          </span>
                          <span className="text-[11px] font-mono-code text-zinc-500 hidden sm:inline">
                            ({row.timestamp})
                          </span>
                          {isKeywordHit && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00aeec]/20 border border-[#00aeec]/50 text-[#00aeec] text-[10px] font-mono-code font-bold tracking-tight animate-pulse">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>词云命中标的</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 2. Tier */}
                      <td className="py-3.5 px-4 text-center align-middle">
                        {renderTier(row.tier)}
                      </td>

                      {/* 3. King Line Status (With Tooltip on hover) */}
                      <td className="py-3.5 px-4 align-middle">
                        <div className="relative group/tip inline-block">
                          {renderStatus(row.kingStatus, row.king)}

                          {/* Tooltip: fast glance at hidden metrics without expanding */}
                          {!isExpanded && (
                            <div className="absolute left-0 bottom-full mb-2 hidden group-hover/tip:flex flex-col gap-1 bg-[#16161c]/95 backdrop-blur border border-white/10 p-2.5 rounded-lg shadow-2xl z-30 min-w-[200px] pointer-events-none text-xs font-mono-code">
                              <div className="text-[10px] text-zinc-500 uppercase pb-1 border-b border-white/[0.06]">
                                阶段速览
                              </div>
                              <div className="flex justify-between text-zinc-300">
                                <span className="text-zinc-500">黄金线:</span>
                                <span>{row.gold}</span>
                              </div>
                              <div className="flex justify-between text-zinc-300">
                                <span className="text-zinc-500">钻石线:</span>
                                <span>{row.diamond}</span>
                              </div>
                              <div className="text-[10px] text-rose-400 pt-1 text-right">
                                点击行展开实录证言 ↗
                              </div>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* 4. Expand / Collapse Trigger */}
                      <td className="py-3.5 px-4 sm:px-6 text-right align-middle">
                        <button
                          onClick={(e) => toggleExpand(row.id, e)}
                          className="text-zinc-500 group-hover:text-zinc-300 p-1 rounded hover:bg-white/[0.05] transition-colors"
                          title={isExpanded ? "收起详情" : "展开详情"}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-rose-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Expandable Accordion: Details revealed only on user click */}
                    <AnimatePresence>
                      {isExpanded && (
                        <tr className="bg-[#0b0b10] border-b border-white/[0.08]">
                          <td colSpan={4} className="p-0">
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="py-4 px-4 sm:px-6 space-y-3.5">
                                {/* Gold & Diamond metrics */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-white/[0.06] font-mono-code text-xs">
                                  <div className="p-2.5 rounded bg-white/[0.02] border border-white/[0.04]">
                                    <span className="text-zinc-500 uppercase text-[10px] block mb-1">
                                      黄金线状态 (基础门槛)
                                    </span>
                                    {renderStatus(row.goldStatus, row.gold)}
                                  </div>
                                  <div className="p-2.5 rounded bg-white/[0.02] border border-white/[0.04]">
                                    <span className="text-zinc-500 uppercase text-[10px] block mb-1">
                                      钻石线状态 (分水岭)
                                    </span>
                                    {renderStatus(row.diamondStatus, row.diamond)}
                                  </div>
                                </div>

                                {/* Combat Log & Quote */}
                                <div>
                                  <div className="font-mono-code text-[10px] text-zinc-500 uppercase mb-1">
                                    实战评测证言 (12 期实录)
                                  </div>
                                  <p className="text-xs sm:text-[13px] text-zinc-300 font-light leading-relaxed">
                                    {row.log}
                                  </p>
                                </div>

                                {row.quote && (
                                  <div className="pl-3 border-l-2 border-rose-500/40 py-1 font-mono-code text-xs text-zinc-400 italic bg-rose-500/[0.02]">
                                    “{row.quote}”
                                  </div>
                                )}

                                {/* Bilibili Comment Word Cloud Match Highlight */}
                                {isKeywordHit && activeKeyword && (
                                  <div className="p-3 rounded-lg bg-[#00aeec]/10 border border-[#00aeec]/30 flex items-start gap-2.5">
                                    <Sparkles className="w-4 h-4 text-[#00aeec] shrink-0 mt-0.5" />
                                    <div className="space-y-0.5 text-xs font-mono-code">
                                      <div className="text-[#00aeec] font-bold flex items-center gap-2 flex-wrap">
                                        <span>B站评论词云关联: 「{activeKeyword.text}」</span>
                                        <span className="text-zinc-400 font-normal">
                                          ({activeKeyword.categoryLabel} · {activeKeyword.episodeTag} · 热度 {activeKeyword.heat})
                                        </span>
                                      </div>
                                      <p className="text-zinc-300 italic font-sans text-xs leading-relaxed pt-0.5">
                                        “{activeKeyword.sampleQuote}”
                                      </p>
                                    </div>
                                  </div>
                                )}

                                {/* Actions footer inside expansion */}
                                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code">
                                  <div className="flex items-center gap-3">
                                    <span className="text-zinc-500 text-[11px]">
                                      战力指数: <strong className="text-white font-bold">{row.score}</strong> 分
                                    </span>
                                    {row.sourceEpisodeTitle && (
                                      <a
                                        href="https://space.bilibili.com/3546747185924773"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-1 text-[11px] text-[#00aeec] hover:underline"
                                      >
                                        <Tv className="w-3 h-3" />
                                        <span>B站来源: {row.sourceEpisodeTitle}</span>
                                      </a>
                                    )}
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onOpenDetailModal(row);
                                    }}
                                    className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 transition-colors"
                                  >
                                    <span>深入战损档案</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
