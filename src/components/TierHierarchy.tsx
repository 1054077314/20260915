import React from "react";
import { TIER_DATA } from "../data/shishanData";
import { AlertCircle, Layers } from "lucide-react";

interface TierHierarchyProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const TierHierarchy: React.FC<TierHierarchyProps> = ({
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <section className="mb-24 sm:mb-32">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-6 mb-8">
        <h2 className="font-serif-title italic text-3xl sm:text-5xl text-white font-normal">
          The Verified Hierarchy · 实战天梯
        </h2>
        <p className="text-xs text-zinc-400 font-mono-code mt-1.5">
          经全 12 期弹幕与视频元数据严谨订正后的工程实战梯队
        </p>
      </div>

      {/* Ladder list */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl divide-y divide-white/[0.06] overflow-hidden">
        {TIER_DATA.map((tier) => (
          <div
            key={tier.tier}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-start sm:items-center gap-5 sm:gap-7">
              <span
                className={`font-serif-title text-4xl sm:text-5xl shrink-0 w-12 sm:w-16 ${
                  tier.tier === "T0"
                    ? "text-rose-400"
                    : tier.tier === "T1"
                    ? "text-amber-400"
                    : tier.tier === "T2"
                    ? "text-blue-400"
                    : tier.tier === "T3"
                    ? "text-emerald-400"
                    : "text-zinc-500"
                }`}
              >
                {tier.tier}
              </span>
              <div>
                <div className="text-lg sm:text-xl font-medium text-white mb-1 tracking-tight">
                  {tier.models}
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  {tier.desc}
                </div>
              </div>
            </div>

            <div className="md:text-right shrink-0">
              <span
                className={`inline-block text-[11px] font-mono-code px-2.5 py-1 rounded border ${tier.badgeColor}`}
              >
                {tier.summary}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Scenario notice */}
      <div className="mt-6 p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
        <div className="font-mono-code text-xs text-zinc-400 leading-relaxed">
          <strong className="text-zinc-200">场景限定声明：</strong>
          GLM 5.3 完整版与 Kimi K3 归入 T4，仅代表其在「屎山论剑恶劣工况与长程代码排错」特定极端测试场景下的实战收敛表现，不代表模型在通用多模态或学术文科任务上的综合排名。
        </div>
      </div>
    </section>
  );
};
