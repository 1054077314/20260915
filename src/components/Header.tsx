import React from "react";
import {
  Share2,
  Check,
  Download,
  MousePointer,
  GitCompare,
  Search,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { KillLineRecord } from "../types";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cursorEnabled: boolean;
  onToggleCursor: () => void;
  selectedForCompare: KillLineRecord[];
  onOpenComparator: () => void;
  onExportData: (format: "json" | "csv") => void;
  copied: boolean;
  onCopyLink: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  cursorEnabled,
  onToggleCursor,
  selectedForCompare,
  onOpenComparator,
  onExportData,
  copied,
  onCopyLink,
}) => {
  return (
    <header className="pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-white/[0.08] mb-12 sm:mb-16">
      {/* Top Utility Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono-code text-xs text-zinc-500 mb-8 sm:mb-12">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            EPISODES 01–12 CONSOLIDATED
          </span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span className="text-zinc-400 hidden sm:inline">
            UP 主: <strong className="text-zinc-200">Token就是词元</strong> · 弹幕交叉验证
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Compare launcher button */}
          {selectedForCompare.length > 0 && (
            <button
              onClick={onOpenComparator}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs hover:bg-amber-500/30 transition-colors animate-pulse"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>对比选中 ({selectedForCompare.length}/2)</span>
            </button>
          )}

          {/* Export button */}
          <div className="relative group">
            <button
              title="导出评测数据"
              className="p-1.5 rounded-md border border-white/[0.1] hover:border-white/30 text-zinc-400 hover:text-white transition-colors bg-white/[0.02]"
            >
              <Download className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-1 hidden group-hover:flex flex-col bg-[#121216] border border-white/10 rounded shadow-xl p-1 z-30 min-w-[120px]">
              <button
                onClick={() => onExportData("json")}
                className="text-left px-3 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-white/[0.06] rounded"
              >
                导出 JSON 格式
              </button>
              <button
                onClick={() => onExportData("csv")}
                className="text-left px-3 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-white/[0.06] rounded"
              >
                导出 CSV 报表
              </button>
            </div>
          </div>

          {/* Cursor Toggle */}
          <button
            onClick={onToggleCursor}
            title={cursorEnabled ? "点击关闭自定义透镜光标" : "点击开启自定义透镜光标"}
            className={`p-1.5 rounded-md border transition-colors ${
              cursorEnabled
                ? "border-rose-500/40 text-rose-400 bg-rose-500/10"
                : "border-white/[0.1] text-zinc-500 hover:text-zinc-300 bg-white/[0.02]"
            }`}
          >
            <MousePointer className="w-4 h-4" />
          </button>

          {/* Share Link */}
          <button
            onClick={onCopyLink}
            title="复制本页链接"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/[0.1] hover:border-white/30 text-zinc-400 hover:text-white transition-colors bg-white/[0.02]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-xs">已复制</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="text-xs">分享</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8">
          <div className="inline-block font-mono-code text-xs text-rose-400/90 tracking-widest uppercase mb-3">
            EPISODES 01–12 COMPREHENSIVE LLM AUDIT
          </div>
          <h1 className="font-serif-title italic text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08] mb-4">
            屎山论剑全 12 期 · 斩杀线与实战账单
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-light leading-relaxed">
            全 12 期高压工程恶劣工况对照：黄金、钻石、王者三档斩杀线实测轮次，结合官方与实测结算花费账单，复原各家模型的工程实战防爆能力。
          </p>
        </div>

        {/* Global Search & Filter Widget */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索模型、评语关键词 (如 Astra, Flash)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/50 transition-colors font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300 font-mono-code"
              >
                清除
              </button>
            )}
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono-code text-zinc-500 px-1">
            <span>支持多维排序与双模型同屏对照</span>
            <span className="text-zinc-600">11 款主流基准模型</span>
          </div>
        </div>
      </div>
    </header>
  );
};
