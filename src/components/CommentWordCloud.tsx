import React, { useState } from "react";
import { CommentKeyword, COMMENT_KEYWORDS } from "../data/bilibiliCommentsData";
import { Sparkles, Flame, Tag, Check, X, ArrowUpRight, Filter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CommentWordCloudProps {
  activeKeyword: CommentKeyword | null;
  onSelectKeyword: (keyword: CommentKeyword | null) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const CommentWordCloud: React.FC<CommentWordCloudProps> = ({
  activeKeyword,
  onSelectKeyword,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [hoveredKeyword, setHoveredKeyword] = useState<CommentKeyword | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  const categories = [
    { id: "ALL", label: "全部热词" },
    { id: "highlight", label: "攻坚高光" },
    { id: "cost", label: "Token账单" },
    { id: "bug", label: "终局地雷" },
    { id: "slop", label: "翻车槽点" },
    { id: "praise", label: "真实口碑" },
  ];

  const displayedKeywords = COMMENT_KEYWORDS.filter(
    (kw) => filterCategory === "ALL" || kw.category === filterCategory
  );

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.1] shadow-2xl relative mb-8 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-80 h-36 bg-[#00aeec]/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-10 w-60 h-28 bg-rose-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Cloud Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08] mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[10px] font-mono-code font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Interactive Topic Cloud
            </span>
            <span className="font-mono-code text-[11px] text-zinc-400">
              萃取自 12 期实测弹幕与万条深度长评
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1.5 flex items-center gap-2">
            <span>评论关键词热词矩阵</span>
            <span className="text-xs font-mono-code px-2 py-0.5 rounded-full bg-white/[0.08] text-zinc-300 font-normal">
              {COMMENT_KEYWORDS.length} 核心槽点与战力特征
            </span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-mono-code">
            ⚡ <strong className="text-zinc-200">点击任意关键词</strong>：将自动联动过滤并高亮上方{" "}
            <span className="text-[#00aeec] underline decoration-[#00aeec]/40 underline-offset-2">
              《The Kill-Line Matrix》
            </span>{" "}
            斩杀线表格中包含该特性的模型
          </p>
        </div>

        {/* Current Active Keyword Status */}
        {activeKeyword && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#00aeec]/10 border border-[#00aeec]/40 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 text-xs font-mono-code text-[#00aeec]">
              <Check className="w-3.5 h-3.5" />
              <span>
                当前锁定: <strong>{activeKeyword.text}</strong>
              </span>
              <span className="text-zinc-400 text-[11px]">
                ({activeKeyword.matchedModelNames.length} 款模型)
              </span>
            </div>
            <button
              onClick={() => onSelectKeyword(null)}
              className="p-1 rounded hover:bg-[#00aeec]/20 text-zinc-300 hover:text-white transition-colors"
              title="清除过滤"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-1.5 flex-wrap mb-5 text-xs font-mono-code">
        <span className="text-zinc-500 text-[11px] flex items-center gap-1 mr-1">
          <Filter className="w-3 h-3" /> 分类:
        </span>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
              filterCategory === cat.id
                ? "bg-white text-black font-semibold shadow-sm"
                : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Word Cloud Visual Canvas */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 py-3 px-2 sm:px-4 min-h-[140px] rounded-xl bg-black/40 border border-white/[0.04]">
        {displayedKeywords.map((kw) => {
          const isSelected = activeKeyword?.id === kw.id;
          const isHovered = hoveredKeyword?.id === kw.id;

          // Compute sizing class based on weight
          const sizeClass =
            kw.weight >= 26
              ? "text-sm sm:text-base font-bold py-2 px-3.5"
              : kw.weight >= 23
              ? "text-xs sm:text-sm font-semibold py-1.5 px-3"
              : "text-[11px] sm:text-xs font-medium py-1 px-2.5";

          return (
            <div key={kw.id} className="relative group">
              <motion.button
                onClick={() => {
                  if (isSelected) {
                    onSelectKeyword(null);
                  } else {
                    onSelectKeyword(kw);
                  }
                }}
                onMouseEnter={() => {
                  setHoveredKeyword(kw);
                  onMouseEnter?.();
                }}
                onMouseLeave={() => {
                  setHoveredKeyword(null);
                  onMouseLeave?.();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-xl font-mono-code border transition-all flex items-center gap-2 cursor-pointer shadow-sm ${sizeClass} ${
                  isSelected
                    ? "bg-[#00aeec]/20 border-[#00aeec] text-white ring-2 ring-[#00aeec]/60 shadow-[0_0_15px_rgba(0,174,236,0.3)]"
                    : `${kw.badgeColor} ${kw.borderColor} ${kw.textColor} hover:border-white/60 hover:text-white`
                }`}
              >
                <span>{kw.text}</span>

                <span className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.2 rounded-full bg-black/50 text-zinc-300 font-normal">
                  <Flame className="w-2.5 h-2.5 text-rose-400" />
                  {kw.heat}
                </span>

                {isSelected && <Check className="w-3 h-3 text-[#00aeec]" />}
              </motion.button>

              {/* Hover Tooltip / Preview Card */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3 rounded-xl bg-[#181820]/95 backdrop-blur-md border border-white/15 shadow-2xl text-xs font-mono-code pointer-events-none"
                  >
                    <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/[0.08]">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-white/[0.08] text-white text-[10px]">
                          {kw.categoryLabel}
                        </span>
                        <span className="text-zinc-400 text-[10px]">{kw.episodeTag}</span>
                      </div>
                      <span className="text-rose-400 text-[10px] flex items-center gap-0.5">
                        <Flame className="w-3 h-3" />
                        热度 {kw.heatNum}
                      </span>
                    </div>

                    <p className="text-zinc-200 text-[11px] leading-relaxed mb-2 font-sans italic">
                      “{kw.sampleQuote}”
                    </p>

                    <div className="pt-1.5 border-t border-white/[0.06] flex items-center justify-between text-[10px]">
                      <div className="text-zinc-400">
                        命中标的:{" "}
                        <strong className="text-white">
                          {kw.matchedModelNames.join("、")}
                        </strong>
                      </div>
                      <span className="text-[#00aeec] flex items-center gap-0.5 font-bold">
                        点击过滤表格 <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer Instructions */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-code text-zinc-500 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00aeec] animate-pulse" />
          <span>点击任意标签即刻过滤，支持再次点击取消筛选</span>
        </div>
        {activeKeyword && (
          <button
            onClick={() => {
              const el = document.getElementById("kill-line-matrix");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-[#00aeec] hover:underline flex items-center gap-1 font-medium"
          >
            <span>直达斩杀线表格查看命中详情 ({activeKeyword.matchedModelNames.length} 款)</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
