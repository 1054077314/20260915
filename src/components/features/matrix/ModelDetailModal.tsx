import React from "react";
import { KillLineRecord, StatusType } from "../../../types";
import { Modal } from "../../ui/Modal";
import { Badge } from "../../ui/Badge";
import {
  Clock,
  Coins,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  ShieldAlert,
  Award,
  Tv,
  ExternalLink,
} from "lucide-react";

export interface ModelDetailModalProps {
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
  if (!model) return null;

  const renderBadge = (status: StatusType, text: string) => {
    if (status === "pass") return <Badge variant="emerald">{text}</Badge>;
    if (status === "warn") return <Badge variant="amber">{text}</Badge>;
    if (status === "fail") return <Badge variant="rose">{text}</Badge>;
    return <Badge variant="zinc">{text}</Badge>;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="2xl"
      title={
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg text-white">{model.model}</span>
          <Badge
            variant={
              model.tier === "T0"
                ? "rose"
                : model.tier === "T1"
                ? "amber"
                : model.tier === "T2"
                ? "blue"
                : "emerald"
            }
          >
            {model.tier} 阶梯
          </Badge>
        </div>
      }
      subtitle={
        <div className="flex items-center gap-3">
          <span>
            战力指数: <strong className="text-white">{model.score}</strong> / 100
          </span>
          {model.sourceEpisode && (
            <span className="text-[#00aeec]">出镜实测: {model.sourceEpisode}</span>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        {/* Core Kill-Line Performance */}
        <div>
          <h4 className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-rose-400" />
            <span>三大天梯考核线表现</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
              <div className="text-[10px] font-mono-code text-zinc-500 uppercase">
                黄金线 (基础语法/单文件)
              </div>
              <div>{renderBadge(model.goldStatus, model.gold)}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
              <div className="text-[10px] font-mono-code text-zinc-500 uppercase">
                钻石线 (并发死锁/多模块)
              </div>
              <div>{renderBadge(model.diamondStatus, model.diamond)}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
              <div className="text-[10px] font-mono-code text-zinc-500 uppercase">
                王者线 (绝壁攻坚/一票否决)
              </div>
              <div>{renderBadge(model.kingStatus, model.king)}</div>
            </div>
          </div>
        </div>

        {/* Authentic Quote */}
        {model.quote && (
          <div className="p-4 rounded-xl bg-amber-500/[0.05] border border-amber-500/20">
            <div className="text-[11px] font-mono-code text-amber-400 font-semibold mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>UP 主实测原话证言:</span>
            </div>
            <p className="text-xs font-serif italic text-amber-200/90 leading-relaxed">
              “{model.quote}”
            </p>
          </div>
        )}

        {/* Detailed Assessment */}
        {model.detailNote && (
          <div className="space-y-2">
            <h4 className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-zinc-400" />
              <span>硬核工况与诊断记录</span>
            </h4>
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] text-xs font-mono-code text-zinc-300 leading-relaxed space-y-2">
              <p>{model.detailNote}</p>
            </div>
          </div>
        )}

        {/* Cost & Tokens if available */}
        {(model.totalCostCNY !== undefined || model.tokensUsed) && (
          <div>
            <h4 className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-emerald-400" />
              <span>实测成本与吞吐量</span>
            </h4>
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono-code text-xs">
              <div>
                <span className="text-zinc-500 text-[11px]">实测官方账单:</span>
                <div className="text-base font-bold text-white mt-0.5">
                  ¥{model.totalCostCNY?.toFixed(2) ?? "--"}
                </div>
              </div>
              <div>
                <span className="text-zinc-500 text-[11px]">消耗 Token 总量:</span>
                <div className="text-base font-bold text-zinc-200 mt-0.5">
                  {model.tokensUsed ?? "--"}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Footer */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-3">
          {model.sourceEpisodeTitle && (
            <a
              href={
                model.bilibiliBvid
                  ? `https://www.bilibili.com/video/${model.bilibiliBvid}`
                  : "https://space.bilibili.com/3546747185924773"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#00aeec]/10 hover:bg-[#00aeec]/20 text-[#00aeec] border border-[#00aeec]/30 font-mono-code text-xs flex items-center gap-1.5 transition-colors"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>前往观看: {model.sourceEpisodeTitle}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => {
                onAddToCompare(model);
                onClose();
              }}
              className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200 hover:text-white border border-white/[0.1] font-mono-code text-xs transition-colors cursor-pointer"
            >
              加入双雄对照
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-white text-black font-semibold font-mono-code text-xs hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              完成阅读
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
