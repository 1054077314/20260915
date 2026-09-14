import React from "react";
import { AnimatePresence, motion } from "motion/react";
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
    <AnimatePresence>
      {isOpen && model && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Animated Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#0a0a0f] border border-white/12 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-6 sm:p-8 my-8 z-10"
            onClick={(e) => e.stopPropagation()}
          >
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
                <span className="text-[10px] text-zinc-500 font-mono-code uppercase block mb-1">
                  黄金线 (基础)
                </span>
                {renderBadge(model.goldStatus, model.gold)}
              </div>
              <div className="text-center border-x border-white/[0.06]">
                <span className="text-[10px] text-zinc-500 font-mono-code uppercase block mb-1">
                  钻石线 (分水岭)
                </span>
                {renderBadge(model.diamondStatus, model.diamond)}
              </div>
              <div className="text-center">
                <span className="text-[10px] text-zinc-500 font-mono-code uppercase block mb-1">
                  王者线 (终极)
                </span>
                {renderBadge(model.kingStatus, model.king)}
              </div>
            </div>

            {/* Cost & Tokens Breakdown */}
            <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center justify-between text-xs font-mono-code text-zinc-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span>实测资源消耗账单</span>
                </span>
                <span className="text-zinc-200 font-medium">总计: {model.actualCost}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-white/[0.04] text-xs font-mono-code">
                <div>
                  <span className="text-zinc-500 text-[10px] block">总吞吐词元</span>
                  <span className="text-white font-bold text-sm">{model.tokensConsumed}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">算力开销 / 轮次</span>
                  <span className="text-white font-bold text-sm">{model.actualCost}</span>
                </div>
              </div>
            </div>

            {/* Verbatim Log */}
            <div className="mb-8">
              <h4 className="text-xs font-mono-code uppercase text-zinc-500 tracking-wider mb-2">
                12 期排错真实日志评定
              </h4>
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.04] font-mono-code text-xs text-zinc-300 leading-relaxed max-h-48 overflow-y-auto">
                {model.log}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
              <button
                onClick={() => {
                  onAddToCompare(model);
                  onClose();
                }}
                className="px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono-code text-zinc-300 hover:text-white transition-colors"
              >
                加入对比矩阵
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-white text-black font-semibold text-xs font-mono-code hover:bg-zinc-200 transition-colors shadow-sm"
              >
                关闭
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
