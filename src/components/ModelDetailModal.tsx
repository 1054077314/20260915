import React from "react";
import { KillLineRecord, StatusType } from "../types";
import {
  X,
  Clock,
  Coins,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  ShieldAlert,
  Award,
} from "lucide-react";

interface ModelDetailModalProps {
  model: KillLineRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCompare: (model: KillLineRecord) => void;
}

export const ModelDetailModal: React.FC<ModelDetailModalProps> = ({
  model,
  isOpen,
  onClose,
  onAddToCompare,
}) => {
  if (!isOpen || !model) return null;

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
      <div className="relative w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/[0.08] pb-6 mb-6 pr-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono-code text-xs px-2.5 py-0.5 rounded border border-rose-500/40 text-rose-400 bg-rose-500/10 font-semibold">
                {model.tier} 梯队
              </span>
              <span className="text-xs font-mono-code text-zinc-500">
                测试期数: {model.episodesTested}
              </span>
            </div>
            <h3 className="font-serif-title italic text-3xl sm:text-4xl text-white">
              {model.model}
            </h3>
            <div className="text-xs text-zinc-400 font-mono-code mt-1 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>弹幕交叉实录标记: {model.timestamp}</span>
            </div>
          </div>
        </div>

        {/* High-impact quote */}
        <div className="p-4 rounded-xl bg-white/[0.03] border-l-2 border-rose-400 mb-6">
          <p className="text-sm sm:text-base text-zinc-200 font-light italic">
            "{model.quote}"
          </p>
        </div>

        {/* 3-Stage Kill-Line Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <div className="text-center">
            <div className="text-[11px] font-mono-code text-zinc-500 mb-1">
              黄金线 (Gold)
            </div>
            {renderBadge(model.goldStatus, model.gold)}
          </div>
          <div className="text-center border-x border-white/[0.06]">
            <div className="text-[11px] font-mono-code text-zinc-500 mb-1">
              钻石线 (Diamond)
            </div>
            {renderBadge(model.diamondStatus, model.diamond)}
          </div>
          <div className="text-center">
            <div className="text-[11px] font-mono-code text-zinc-500 mb-1">
              王者线 (King)
            </div>
            {renderBadge(model.kingStatus, model.king)}
          </div>
        </div>

        {/* Cost & Token Profile */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono-code text-zinc-500 mb-1 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>成本结算评估</span>
            </div>
            <div className="text-sm font-semibold text-white">{model.costEstimate}</div>
          </div>
          <div>
            <div className="text-xs font-mono-code text-zinc-500 mb-1">吞吐与词元画像</div>
            <div className="text-xs text-zinc-300 font-mono-code">{model.tokensConsumed}</div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-2">
              实战恶劣工况综合剖析
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              {model.analysis}
            </p>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/20">
              <div className="text-xs font-mono-code text-emerald-400 flex items-center gap-1.5 mb-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>实战强项 (Strengths)</span>
              </div>
              <ul className="space-y-1 text-xs text-zinc-300 font-light list-disc list-inside">
                {model.strengths.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-lg bg-rose-500/[0.04] border border-rose-500/20">
              <div className="text-xs font-mono-code text-rose-400 flex items-center gap-1.5 mb-2 font-medium">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>实战陷阱 (Weaknesses)</span>
              </div>
              <ul className="space-y-1 text-xs text-zinc-300 font-light list-disc list-inside">
                {model.weaknesses.map((w, idx) => (
                  <li key={idx}>{w}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Best for */}
          <div className="p-3.5 rounded-lg bg-blue-500/[0.04] border border-blue-500/20">
            <div className="text-xs font-mono-code text-blue-400 flex items-center gap-1.5 mb-1 font-medium">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>工程适用场景建议</span>
            </div>
            <p className="text-xs text-zinc-300 font-light">{model.bestFor}</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <button
            onClick={() => {
              onAddToCompare(model);
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 hover:text-white border border-white/[0.1] text-xs font-mono-code transition-colors"
          >
            加入同屏对比
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white text-black font-medium text-xs font-mono-code hover:bg-zinc-200 transition-colors"
          >
            关闭详情
          </button>
        </div>
      </div>
    </div>
  );
};
