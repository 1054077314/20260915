import React from "react";
import { KillLineRecord, StatusType } from "../types";
import { X, GitCompare, Check, AlertTriangle, Coins, ShieldCheck, Zap } from "lucide-react";

interface ModelComparatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  models: KillLineRecord[];
  allModels: KillLineRecord[];
  onSelectModelForSlot: (slotIndex: number, model: KillLineRecord) => void;
}

export const ModelComparatorModal: React.FC<ModelComparatorModalProps> = ({
  isOpen,
  onClose,
  models,
  allModels,
  onSelectModelForSlot,
}) => {
  if (!isOpen || models.length === 0) return null;

  const modelA = models[0];
  const modelB = models[1] || models[0];

  const renderBadge = (status: StatusType, text: string) => {
    if (status === "pass") {
      return (
        <span className="font-mono-code text-xs px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          {text}
        </span>
      );
    }
    if (status === "warn") {
      return (
        <span className="font-mono-code text-xs px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
          {text}
        </span>
      );
    }
    if (status === "fail") {
      return (
        <span className="font-mono-code text-xs px-2.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30">
          {text}
        </span>
      );
    }
    return (
      <span className="font-mono-code text-xs px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-500 border border-zinc-700">
        {text}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#09090e] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 border-b border-white/[0.08] pb-5 mb-6">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-title italic text-2xl sm:text-3xl text-white">
              Model Comparison · 战力直面交锋
            </h3>
            <p className="text-xs text-zinc-400 font-mono-code">
              双模型恶劣工况实测斩杀线与成本能效对比
            </p>
          </div>
        </div>

        {/* Model Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[modelA, modelB].map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <div className="text-[11px] font-mono-code text-zinc-500 mb-1">
                对照位 {idx === 0 ? "A" : "B"}:
              </div>
              <select
                value={m.id}
                onChange={(e) => {
                  const target = allModels.find((x) => x.id === e.target.value);
                  if (target) onSelectModelForSlot(idx, target);
                }}
                className="w-full bg-[#14141a] border border-white/10 text-white rounded-lg p-2.5 text-base font-medium focus:outline-none focus:border-amber-400"
              >
                {allModels.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    [{opt.tier}] {opt.model} ({opt.category})
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Comparison Matrix Table */}
        <div className="space-y-4">
          {/* Row 1: Tier & Score */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.05]">
            <div>
              <div className="text-xs font-mono-code text-zinc-500 mb-1">实战评级与综合分</div>
              <div className="flex items-center gap-3">
                <span className="font-serif-title text-3xl text-amber-400">{modelA.tier}</span>
                <span className="text-xs font-mono-code text-zinc-400">综合战力 {modelA.score}/100</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-mono-code text-zinc-500 mb-1">实战评级与综合分</div>
              <div className="flex items-center gap-3">
                <span className="font-serif-title text-3xl text-amber-400">{modelB.tier}</span>
                <span className="text-xs font-mono-code text-zinc-400">综合战力 {modelB.score}/100</span>
              </div>
            </div>
          </div>

          {/* Row 2: Gold Round */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.05]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-zinc-400">黄金线 (Gold):</span>
              {renderBadge(modelA.goldStatus, modelA.gold)}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-zinc-400">黄金线 (Gold):</span>
              {renderBadge(modelB.goldStatus, modelB.gold)}
            </div>
          </div>

          {/* Row 3: Diamond Round */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.05]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-zinc-400">钻石线 (Diamond):</span>
              {renderBadge(modelA.diamondStatus, modelA.diamond)}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-zinc-400">钻石线 (Diamond):</span>
              {renderBadge(modelB.diamondStatus, modelB.diamond)}
            </div>
          </div>

          {/* Row 4: King Round */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.05]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-zinc-400">王者线 (King):</span>
              {renderBadge(modelA.kingStatus, modelA.king)}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-zinc-400">王者线 (King):</span>
              {renderBadge(modelB.kingStatus, modelB.king)}
            </div>
          </div>

          {/* Row 5: Cost & Token footprint */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.05]">
            <div>
              <div className="text-xs font-mono-code text-zinc-500 mb-1">成本结算与消耗</div>
              <div className="text-sm text-white font-medium">{modelA.costEstimate}</div>
              <div className="text-xs text-zinc-400 font-mono-code">{modelA.tokensConsumed}</div>
            </div>
            <div>
              <div className="text-xs font-mono-code text-zinc-500 mb-1">成本结算与消耗</div>
              <div className="text-sm text-white font-medium">{modelB.costEstimate}</div>
              <div className="text-xs text-zinc-400 font-mono-code">{modelB.tokensConsumed}</div>
            </div>
          </div>

          {/* Row 6: Detailed Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.05]">
            <div>
              <div className="text-xs font-mono-code text-zinc-500 mb-1">实测剖析</div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">{modelA.analysis}</p>
            </div>
            <div>
              <div className="text-xs font-mono-code text-zinc-500 mb-1">实测剖析</div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">{modelB.analysis}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-white/[0.08] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white text-black font-medium text-xs font-mono-code hover:bg-zinc-200 transition-colors"
          >
            完成对比
          </button>
        </div>
      </div>
    </div>
  );
};
