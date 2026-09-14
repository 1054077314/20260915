import React from "react";
import { STAGE_SURVIVAL_STATS } from "../data/shishanData";
import { AlertTriangle, Award, CheckCircle2, ChevronRight } from "lucide-react";

interface SurvivalFunnelProps {
  onFilterByStage?: (stage: "gold" | "diamond" | "king") => void;
}

export const SurvivalFunnel: React.FC<SurvivalFunnelProps> = ({ onFilterByStage }) => {
  return (
    <section className="mb-20 sm:mb-24 p-6 sm:p-8 rounded-xl bg-white/[0.02] border border-white/[0.08]">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/[0.08] pb-4 mb-6">
        <div>
          <h2 className="font-serif-title italic text-2xl sm:text-3xl text-white font-normal">
            The Survival Funnel · 难度斩杀漏斗
          </h2>
          <p className="text-xs text-zinc-500 font-mono-code mt-1">
            全 12 期跨期综合通过率：从基础语法陷阱到极端架构死锁的淘汰阶梯
          </p>
        </div>
        <div className="mt-2 sm:mt-0 text-[11px] font-mono-code text-zinc-400">
          样本量: 11 款主流参测模型
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STAGE_SURVIVAL_STATS.map((item, idx) => {
          const isGold = idx === 0;
          const isDiamond = idx === 1;
          const isKing = idx === 2;

          const barColor = isGold
            ? "bg-emerald-500"
            : isDiamond
            ? "bg-amber-500"
            : "bg-rose-500";

          const textColor = isGold
            ? "text-emerald-400"
            : isDiamond
            ? "text-amber-400"
            : "text-rose-400";

          const borderBadge = isGold
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
            : isDiamond
            ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
            : "border-rose-500/30 bg-rose-500/10 text-rose-300";

          return (
            <div
              key={item.stage}
              className="flex flex-col justify-between p-5 rounded-lg bg-black/40 border border-white/[0.06] hover:border-white/[0.15] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded border uppercase ${borderBadge}`}>
                    {idx === 0 ? "ENTRY TIER" : idx === 1 ? "WATERSHED" : "ULTIMATE"}
                  </span>
                  <span className={`font-serif-title text-2xl ${textColor}`}>
                    {item.percentage}%
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white mb-1">
                  {item.stage}
                </h3>
                <div className="text-xs text-zinc-500 font-mono-code mb-3">
                  {item.subtitle}
                </div>

                {/* Progress bar container */}
                <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full ${barColor}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>

                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between font-mono-code text-[11px] text-zinc-500">
                <span>通关模型数:</span>
                <span className="text-zinc-300 font-medium">
                  {item.passCount} / {item.totalCount} 款
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
