import React, { useState } from "react";
import { COST_DATA } from "../data/shishanData";
import { CostRecord } from "../types";
import { BarChart3, Coins, Flame, Info, Sparkles, TrendingUp } from "lucide-react";

interface CostVisualizerProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const CostVisualizer: React.FC<CostVisualizerProps> = ({
  onMouseEnter,
  onMouseLeave,
}) => {
  const [selectedCostMetric, setSelectedCostMetric] = useState<"cost" | "tokens">("cost");

  // Max value for normalized progress bar
  const maxCost = Math.max(...COST_DATA.map((d) => d.estimatedCostYuan));
  const maxTokens = Math.max(...COST_DATA.map((d) => d.tokenMillions));

  return (
    <section className="mb-24 sm:mb-32">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/[0.08] pb-6 mb-8 gap-4">
        <div>
          <h2 className="font-serif-title italic text-3xl sm:text-5xl text-white font-normal">
            Cost & Token Economics
          </h2>
          <p className="text-xs text-zinc-400 font-mono-code mt-1.5">
            官方结算与实测成本账单对照 · 谁在狂烧词元？谁在极端控费？
          </p>
        </div>

        {/* Metric toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/[0.08] rounded-lg self-start sm:self-auto font-mono-code text-xs">
          <button
            onClick={() => setSelectedCostMetric("cost")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              selectedCostMetric === "cost"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            以单期实付折算 (¥)
          </button>
          <button
            onClick={() => setSelectedCostMetric("tokens")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              selectedCostMetric === "tokens"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            以词元吞吐 (千万 Token)
          </button>
        </div>
      </div>

      {/* Comparative Visual Bars */}
      <div className="mb-10 p-6 rounded-xl bg-white/[0.02] border border-white/[0.08]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-300">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>实战成本与词元能效横向梯度条</span>
          </div>
          <span className="text-[11px] font-mono-code text-zinc-500">
            基准：第 09-12 期屎山高压测试
          </span>
        </div>

        <div className="space-y-4">
          {COST_DATA.map((item) => {
            const barPercentage =
              selectedCostMetric === "cost"
                ? Math.min(100, (item.estimatedCostYuan / maxCost) * 100)
                : Math.min(100, (item.tokenMillions / maxTokens) * 100);

            const isValueKing = item.badge === "VALUE NO.1";

            return (
              <div key={item.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{item.model}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded border ${
                        isValueKing
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                          : "bg-white/[0.05] text-zinc-400 border-white/[0.1]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500 text-[11px]">{item.tokens}</span>
                    <span className={`font-semibold ${item.costColor}`}>
                      {item.cost}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/[0.04] h-2.5 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isValueKing
                        ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                        : item.badge === "EXPENSIVE"
                        ? "bg-rose-500"
                        : item.badge === "UNSTABLE"
                        ? "bg-zinc-600"
                        : "bg-amber-400"
                    }`}
                    style={{ width: `${Math.max(4, barPercentage)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid of Detailed Cost Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {COST_DATA.map((item) => (
          <div
            key={item.id}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="p-6 rounded-xl bg-[#08080c] border border-white/[0.08] hover:border-white/[0.2] transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between font-mono-code text-xs mb-3">
                <span className="text-zinc-400 font-medium">{item.model}</span>
                <span
                  className={`text-[10px] tracking-wider px-2 py-0.5 rounded border uppercase ${
                    item.badge === "VALUE NO.1"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-semibold"
                      : item.badge === "EXPENSIVE"
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                      : "bg-white/[0.04] text-zinc-400 border-white/[0.1]"
                  }`}
                >
                  {item.badge}
                </span>
              </div>

              <div
                className={`font-serif-title text-3xl sm:text-4xl ${item.costColor} mb-1`}
              >
                {item.cost}
              </div>
              <div className="font-mono-code text-xs text-zinc-500 mb-4">
                {item.tokens}
              </div>
            </div>

            <div className="border-t border-white/[0.06] pt-4 mt-2">
              <p className="text-xs text-zinc-300 font-light leading-relaxed mb-3">
                {item.verdict}
              </p>
              <div className="font-mono-code text-[11px] text-zinc-500 flex items-center justify-between">
                <span>来源: {item.source}</span>
                <span className="text-zinc-400">评级: {item.efficiencyRating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
