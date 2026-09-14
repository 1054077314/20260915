import React from "react";
import { KillLineRecord, StatusType } from "../types";
import {
  ArrowUpDown,
  Check,
  CheckCircle2,
  ChevronRight,
  GitCompare,
  Info,
  SlidersHorizontal,
  X,
} from "lucide-react";

interface KillLineTableProps {
  data: KillLineRecord[];
  selectedModel: KillLineRecord;
  onSelectModel: (model: KillLineRecord) => void;
  selectedForCompare: KillLineRecord[];
  onToggleCompare: (model: KillLineRecord) => void;
  onOpenDetailModal: (model: KillLineRecord) => void;
  filterTier: string;
  onFilterTierChange: (t: string) => void;
  sortBy: "score" | "name" | "diamond" | "king";
  onSortByChange: (s: "score" | "name" | "diamond" | "king") => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const KillLineTable: React.FC<KillLineTableProps> = ({
  data,
  selectedModel,
  onSelectModel,
  selectedForCompare,
  onToggleCompare,
  onOpenDetailModal,
  filterTier,
  onFilterTierChange,
  sortBy,
  onSortByChange,
  onMouseEnter,
  onMouseLeave,
}) => {
  const getStatusBadge = (status: StatusType, text: string) => {
    if (status === "pass") {
      return (
        <span className="font-mono-code text-[11px] px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
          {text}
        </span>
      );
    }
    if (status === "warn") {
      return (
        <span className="font-mono-code text-[11px] px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 whitespace-nowrap">
          {text}
        </span>
      );
    }
    if (status === "fail") {
      return (
        <span className="font-mono-code text-[11px] px-2.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 whitespace-nowrap">
          {text}
        </span>
      );
    }
    return (
      <span className="font-mono-code text-[11px] px-2.5 py-0.5 rounded bg-zinc-800/40 text-zinc-500 border border-zinc-700/30 whitespace-nowrap">
        {text}
      </span>
    );
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "T0":
        return "text-rose-400 border-rose-500/30 bg-rose-500/10";
      case "T1":
        return "text-amber-400 border-amber-500/30 bg-amber-500/10";
      case "T2":
        return "text-blue-400 border-blue-500/30 bg-blue-500/10";
      case "T3":
        return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
      default:
        return "text-zinc-400 border-zinc-700 bg-zinc-800/50";
    }
  };

  return (
    <section className="mb-20 sm:mb-28">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/[0.08] pb-6 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif-title italic text-3xl sm:text-5xl text-white font-normal">
              The Kill-Line Matrix
            </h2>
            <span className="font-mono-code text-xs px-2 py-0.5 rounded bg-white/[0.06] text-zinc-400 border border-white/[0.08]">
              {data.length} 条记录
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-mono-code mt-1.5">
            难度体系与实战过审轮次全量对照（支持勾选双模型同屏对比、点击查看复现详情）
          </p>
        </div>

        {/* Filter Tabs & Sorters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick Filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.08] rounded-lg">
            {[
              { id: "ALL", label: "全部" },
              { id: "TOP", label: "突围旗舰" },
              { id: "FLASH", label: "Flash 梯队" },
              { id: "T0_T1", label: "T0/T1 高阶" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => onFilterTierChange(tab.id)}
                className={`font-mono-code text-xs px-3 py-1.5 rounded-md transition-colors ${
                  filterTier === tab.id
                    ? "bg-white text-black font-semibold shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 text-xs font-mono-code bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-lg text-zinc-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-zinc-500 hidden sm:inline">排序:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as any)}
              className="bg-transparent border-none text-white focus:outline-none cursor-pointer"
            >
              <option value="score" className="bg-[#121216] text-white">
                战力评分 (从高到低)
              </option>
              <option value="diamond" className="bg-[#121216] text-white">
                钻石通关表现
              </option>
              <option value="king" className="bg-[#121216] text-white">
                王者突围表现
              </option>
              <option value="name" className="bg-[#121216] text-white">
                模型名称 (A-Z)
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Selected for compare notice banner */}
      {selectedForCompare.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs font-mono-code text-amber-300">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4" />
            <span>
              已选择待对比模型 ({selectedForCompare.length}/2):{" "}
              <strong className="text-white">
                {selectedForCompare.map((m) => m.model).join(" vs ")}
              </strong>
            </span>
          </div>
          <button
            onClick={() => onToggleCompare(selectedForCompare[0])}
            className="text-amber-400 hover:text-white underline text-[11px]"
          >
            清空对比
          </button>
        </div>
      )}

      {/* Table Header (Desktop) */}
      <div className="hidden lg:grid grid-cols-12 px-6 py-3 font-mono-code text-xs text-zinc-500 border-b border-white/[0.06] uppercase tracking-wider bg-white/[0.01]">
        <div className="col-span-1 text-center">对比/评级</div>
        <div className="col-span-3">MODEL / CONFIG</div>
        <div className="col-span-2 text-center">GOLD (黄金门槛)</div>
        <div className="col-span-2 text-center">DIAMOND (钻石分水岭)</div>
        <div className="col-span-2 text-center">KING (王者试炼)</div>
        <div className="col-span-2 text-right">EVIDENCE & ACTIONS</div>
      </div>

      {/* Table Body */}
      {data.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/10 rounded-xl">
          <p className="text-zinc-500 font-mono-code text-sm">
            未找到符合条件的模型记录，请尝试调整搜索或重置筛选
          </p>
          <button
            onClick={() => {
              onFilterTierChange("ALL");
            }}
            className="mt-3 px-3 py-1 text-xs font-mono-code rounded bg-white/[0.06] text-zinc-300 hover:text-white"
          >
            重置筛选
          </button>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
          {data.map((row) => {
            const isSelected = selectedModel.id === row.id;
            const isCompared = selectedForCompare.some((m) => m.id === row.id);

            return (
              <div
                key={row.id}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onOpenDetailModal(row);
                }}
                onClick={() => onSelectModel(row)}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={`grid grid-cols-1 lg:grid-cols-12 items-center p-5 lg:px-6 lg:py-4 transition-all duration-200 outline-none select-none ${
                  isSelected
                    ? "bg-white/[0.05] lg:translate-x-1 border-l-2 border-rose-400"
                    : "hover:bg-white/[0.02]"
                }`}
              >
                {/* Column 1: Compare checkbox & Tier badge */}
                <div className="lg:col-span-1 flex items-center gap-2.5 mb-2 lg:mb-0">
                  <button
                    title={
                      isCompared
                        ? "取消对比"
                        : selectedForCompare.length >= 2
                        ? "最多对比 2 款模型"
                        : "加入对比"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleCompare(row);
                    }}
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                      isCompared
                        ? "bg-amber-400 border-amber-400 text-black"
                        : "border-white/20 hover:border-white/50 text-transparent"
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </button>

                  <span
                    className={`font-mono-code text-[11px] px-2 py-0.5 rounded border font-semibold ${getTierColor(
                      row.tier
                    )}`}
                  >
                    {row.tier}
                  </span>
                </div>

                {/* Column 2: Model Name & Category */}
                <div className="lg:col-span-3 flex items-center justify-between lg:justify-start gap-2 mb-3 lg:mb-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-medium text-white tracking-tight">
                      {row.model}
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block animate-ping" />
                    )}
                  </div>
                  <span className="lg:hidden text-xs text-zinc-500 font-mono-code">
                    {row.timestamp}
                  </span>
                </div>

                {/* Column 3: Gold */}
                <div className="lg:col-span-2 flex items-center justify-between lg:justify-center py-1.5 lg:py-0 border-t border-white/[0.03] lg:border-none">
                  <span className="text-xs text-zinc-500 lg:hidden font-mono-code">
                    黄金门槛:
                  </span>
                  {getStatusBadge(row.goldStatus, row.gold)}
                </div>

                {/* Column 4: Diamond */}
                <div className="lg:col-span-2 flex items-center justify-between lg:justify-center py-1.5 lg:py-0 border-t border-white/[0.03] lg:border-none">
                  <span className="text-xs text-zinc-500 lg:hidden font-mono-code">
                    钻石分水岭:
                  </span>
                  {getStatusBadge(row.diamondStatus, row.diamond)}
                </div>

                {/* Column 5: King */}
                <div className="lg:col-span-2 flex items-center justify-between lg:justify-center py-1.5 lg:py-0 border-t border-white/[0.03] lg:border-none">
                  <span className="text-xs text-zinc-500 lg:hidden font-mono-code">
                    王者试炼:
                  </span>
                  {getStatusBadge(row.kingStatus, row.king)}
                </div>

                {/* Column 6: Evidence & Detail trigger */}
                <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-3 mt-3 lg:mt-0 pt-2 lg:pt-0 border-t border-white/[0.05] lg:border-none">
                  <span className="font-mono-code text-[11px] text-zinc-500 truncate max-w-[120px] hidden xl:inline">
                    {row.quote}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDetailModal(row);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/[0.08] text-xs font-mono-code transition-colors"
                  >
                    <span>详情档案</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
