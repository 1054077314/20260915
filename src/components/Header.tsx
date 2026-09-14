import React from "react";
import { Share2, Check, Download, MousePointer, GitCompare, Search, Tv, ExternalLink } from "lucide-react";
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
    <header className="pt-8 pb-10 sm:pt-12 sm:pb-14 border-b border-white/[0.08] mb-10 sm:mb-14">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono-code text-xs text-zinc-500 mb-8">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            EPISODES 01–12
          </span>
          <span className="text-zinc-600">/</span>
          <a
            href="https://space.bilibili.com/3546747185924773"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-zinc-300 hover:text-[#00aeec] transition-colors"
            title="访问UP主 B站空间 (UID: 3546747185924773)"
          >
            <Tv className="w-3 h-3 text-[#00aeec]" />
            <span>UP: <strong className="text-zinc-100 underline decoration-[#00aeec]/40 underline-offset-2">Token就是词元</strong></span>
            <ExternalLink className="w-2.5 h-2.5 text-zinc-500" />
          </a>
        </div>

        <div className="flex items-center gap-2">
          {selectedForCompare.length > 0 && (
            <button
              onClick={onOpenComparator}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs hover:bg-amber-500/30 transition-colors"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>对比 ({selectedForCompare.length}/2)</span>
            </button>
          )}

          <div className="relative group">
            <button
              title="导出数据"
              className="p-1.5 rounded border border-white/[0.1] hover:border-white/30 text-zinc-400 hover:text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <div className="absolute right-0 mt-1 hidden group-hover:flex flex-col bg-[#121216] border border-white/10 rounded shadow-xl p-1 z-30 min-w-[100px]">
              <button
                onClick={() => onExportData("json")}
                className="text-left px-2.5 py-1 text-xs text-zinc-300 hover:text-white hover:bg-white/[0.06] rounded"
              >
                JSON
              </button>
              <button
                onClick={() => onExportData("csv")}
                className="text-left px-2.5 py-1 text-xs text-zinc-300 hover:text-white hover:bg-white/[0.06] rounded"
              >
                CSV
              </button>
            </div>
          </div>

          <button
            onClick={onToggleCursor}
            title={cursorEnabled ? "关闭透镜光标" : "开启透镜光标"}
            className={`p-1.5 rounded border transition-colors ${
              cursorEnabled
                ? "border-rose-500/40 text-rose-400 bg-rose-500/10"
                : "border-white/[0.1] text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <MousePointer className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onCopyLink}
            title="复制链接"
            className="flex items-center gap-1 px-2.5 py-1 rounded border border-white/[0.1] hover:border-white/30 text-zinc-400 hover:text-white transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
            <span className="text-xs">{copied ? "已复制" : "分享"}</span>
          </button>
        </div>
      </div>

      {/* Main Title & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-[11px] font-mono-code text-rose-400 tracking-widest uppercase mb-2">
            BENCHMARK AUDIT
          </div>
          <h1 className="font-serif-title italic text-4xl sm:text-6xl lg:text-7xl font-normal text-white leading-none tracking-tight">
            屎山论剑全 12 期
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-3 font-light font-mono-code">
            难度斩杀线 × 花费全量对照 · 实战避坑总账单
          </p>
        </div>

        {/* Compact Search */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="搜索模型..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded bg-white/[0.04] border border-white/[0.1] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/50 transition-colors font-mono-code"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500 hover:text-zinc-300 font-mono-code"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
