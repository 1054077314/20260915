import React, { useState } from "react";
import { ModelService } from "../../../services/modelService";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";

export interface CostVisualizerProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const CostVisualizer: React.FC<CostVisualizerProps> = ({
  onMouseEnter,
  onMouseLeave,
}) => {
  const [showAll, setShowAll] = useState(false);

  // Top 3 primary official settlement benchmarks (Episode 09-12 canonical audit)
  const costData = ModelService.getCostData();
  const primaryCosts = costData.slice(0, 3);
  // Additional historical & reference benchmarks
  const secondaryCosts = costData.slice(3);

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
          className="inline-flex items-center gap-1.5 font-mono-code text-xs text-zinc-400 hover:text-white transition-colors self-start sm:self-auto py-1 px-2.5 rounded bg-white/[0.03] border border-white/[0.08] cursor-pointer"
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
        {primaryCosts.map((item) => {
          const isValueKing = item.id === "ds-v41-flash";
          const isExpensive = item.id === "gemini-38" || item.badge === "EXPENSIVE";

          return (
            <div
              key={item.id}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className={`p-6 rounded-xl border transition-all flex flex-col justify-between ${
                isValueKing
                  ? "border-emerald-500/50 bg-emerald-950/10 shadow-[0_0_30px_rgba(16,185,129,0.08)]"
                  : isExpensive
                  ? "border-amber-500/30 bg-amber-950/10"
                  : "border-white/[0.08] bg-[#050505] hover:border-white/20"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3 font-mono-code text-xs">
                  <span className="text-zinc-400 font-semibold">{item.model}</span>
                  {isValueKing ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/40 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> 极致性价比王
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-white/[0.05] text-zinc-400 text-[10px]">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <div
                    className={`font-serif-title text-4xl font-normal ${
                      isValueKing ? "text-emerald-400 font-bold" : "text-white"
                    }`}
                  >
                    {item.cost}
                  </div>
                  <span className="font-mono-code text-xs text-zinc-500">
                    {item.source}
                  </span>
                </div>

                <div className="space-y-2 border-t border-white/[0.06] pt-4 font-mono-code text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>消耗 Token:</span>
                    <span className="text-zinc-200 font-bold">{item.tokens}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>实测能效评级:</span>
                    <span className="text-zinc-300 font-bold">{item.efficiencyRating} 级</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.04] text-[11px] text-zinc-500 italic">
                {item.verdict}
              </div>
            </div>
          );
        })}
      </div>

      {/* Extended Cost Records (Collapsible) */}
      {showAll && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 animate-fadeIn">
          {secondaryCosts.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:border-white/20 transition-all font-mono-code text-xs"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-zinc-200">{item.model}</span>
                <span className="text-zinc-500 text-[10px]">{item.badge}</span>
              </div>
              <div className="text-lg font-serif-title text-white mb-2">
                {item.cost}
                <span className="text-xs font-mono-code text-zinc-500 ml-1.5">
                  ({item.source})
                </span>
              </div>
              <div className="text-zinc-400 text-[11px] space-y-1">
                <div>Token 吞吐: {item.tokens}</div>
                <div>战果评价: {item.verdict}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
