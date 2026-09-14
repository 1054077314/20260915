import React, { useState } from "react";
import { COST_DATA } from "../data/shishanData";
import { ChevronDown, ChevronUp, Sparkles, TrendingUp, AlertTriangle } from "lucide-react";

interface CostVisualizerProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const CostVisualizer: React.FC<CostVisualizerProps> = ({
  onMouseEnter,
  onMouseLeave,
}) => {
  const [showAll, setShowAll] = useState(false);

  // Top 3 primary official settlement benchmarks (Episode 09-12 canonical audit)
  const primaryCosts = COST_DATA.slice(0, 3);
  // Additional historical & reference benchmarks
  const secondaryCosts = COST_DATA.slice(3);

  return (
    <section className="mb-20 sm:mb-28">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/[0.08] pb-4 mb-6 gap-2">
        <div>
          <h2 className="font-serif-title italic text-3xl sm:text-4xl text-white font-normal leading-tight">
            The Cost of Truth
          </h2>
          <span className="font-mono-code text-[11px] text-zinc-500 tracking-wider uppercase block mt-1">
            确切 Token 账单与官方花费结算 · 真实能效对照
          </span>
        </div>

        {/* Toggle more records */}
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="inline-flex items-center gap-1.5 font-mono-code text-xs text-zinc-400 hover:text-white transition-colors self-start sm:self-auto py-1 px-2.5 rounded bg-white/[0.03] border border-white/[0.08]"
        >
          <span>{showAll ? "收起扩展明细" : "展开更多实战账单"}</span>
          {showAll ? (
            <ChevronUp className="w-3 h-3 text-zinc-500" />
          ) : (
            <ChevronDown className="w-3 h-3 text-zinc-500" />
          )}
        </button>
      </div>

      {/* Main Canonical 3-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        {primaryCosts.map((item, idx) => {
          const isValueKing = item.id === "ds-v41-flash";
          const isExpensive = item.id === "gemini-38" || item.badge === "EXPENSIVE";

          return (
            <div
              key={item.id}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className={`p-6 rounded-xl border transition-all flex flex-col justify-between ${
                isValueKing
                  ? "bg-gradient-to-b from-emerald-500/[0.06] to-transparent border-emerald-500/30 hover:border-emerald-500/50 shadow-[0_4px_24px_rgba(16,185,129,0.06)]"
                  : isExpensive
                  ? "bg-gradient-to-b from-rose-500/[0.04] to-transparent border-rose-500/20 hover:border-rose-500/40"
                  : "bg-white/[0.02] border-white/[0.08] hover:border-white/20"
              }`}
            >
              {/* Card Top: Title & Category Pill */}
              <div>
                <div className="flex items-center justify-between font-mono-code text-xs mb-3">
                  <span className="text-white font-medium text-[15px] tracking-tight">
                    {item.model}
                  </span>
                  <span
                    className={`text-[10px] tracking-wider uppercase font-semibold ${
                      isValueKing
                        ? "text-emerald-400"
                        : isExpensive
                        ? "text-rose-400"
                        : "text-zinc-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Big Number */}
                <div
                  className={`font-serif-title italic text-4xl sm:text-5xl leading-none my-3 ${
                    isValueKing
                      ? "text-emerald-400"
                      : isExpensive
                      ? "text-rose-400"
                      : "text-white"
                  }`}
                >
                  {item.cost}
                </div>

                {/* Token volume line with visual bar indicator */}
                <div className="font-mono-code text-xs text-zinc-400 mb-5 flex items-center justify-between">
                  <span>{item.tokens}</span>
                  {isValueKing && (
                    <span className="text-[10px] text-emerald-400/80 font-sans">一轮秒杀</span>
                  )}
                </div>

                {/* Relative token visual bar */}
                <div className="w-full bg-white/[0.04] h-1 rounded-full overflow-hidden mb-5">
                  <div
                    className={`h-full rounded-full ${
                      isValueKing
                        ? "bg-emerald-400 w-[95%]"
                        : isExpensive
                        ? "bg-rose-400/80 w-[60%]"
                        : "bg-zinc-400/80 w-[30%]"
                    }`}
                  />
                </div>
              </div>

              {/* Card Bottom: Core Verdict & Evidence Source */}
              <div className="border-t border-white/[0.06] pt-4 mt-2">
                <p className="text-xs sm:text-[13px] text-zinc-300/90 font-light leading-relaxed mb-3">
                  {item.verdict}
                </p>
                <div className="font-mono-code text-[11px] text-zinc-500">
                  出处：{item.source}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expandable Secondary Reference Cards (Qwen, Kimi, Legacy) */}
      {showAll && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 animate-fadeIn">
          {secondaryCosts.map((item) => (
            <div
              key={item.id}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className="p-5 rounded-xl bg-white/[0.015] border border-white/[0.06] hover:border-white/15 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between font-mono-code text-xs mb-2">
                  <span className="text-zinc-300 font-medium text-sm">
                    {item.model}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono-code uppercase">
                    {item.badge}
                  </span>
                </div>

                <div className={`font-serif-title italic text-3xl my-2 ${item.costColor}`}>
                  {item.cost}
                </div>
                <div className="font-mono-code text-[11px] text-zinc-500 mb-3">
                  {item.tokens}
                </div>
              </div>

              <div className="border-t border-white/[0.05] pt-3 mt-1">
                <p className="text-xs text-zinc-400 font-light leading-snug mb-2">
                  {item.verdict}
                </p>
                <div className="font-mono-code text-[10px] text-zinc-600">
                  出处：{item.source}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
