import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { MODEL_HISTORIES, EPISODES_META, ModelHistory } from "../data/historyData";
import { KillLineRecord } from "../types";
import { TrendingUp, Award, SlidersHorizontal, RotateCcw, Eye, Layers } from "lucide-react";

interface ScoreTrendChartProps {
  selectedModel?: KillLineRecord;
  onSelectModel?: (modelId: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ScoreTrendChart: React.FC<ScoreTrendChartProps> = ({
  selectedModel,
  onMouseEnter,
  onMouseLeave,
}) => {
  // Active focused model (null means showing all equally)
  const [activeModelId, setActiveModelId] = useState<string | null>(null);
  const [hoveredModelId, setHoveredModelId] = useState<string | null>(null);
  const [tierFilter, setTierFilter] = useState<"ALL" | "FLAGSHIP" | "FLASH">("ALL");
  const [showCutoffLines, setShowCutoffLines] = useState<boolean>(true);

  // Sync with selectedModel prop if passed from parent
  React.useEffect(() => {
    if (selectedModel?.id && MODEL_HISTORIES[selectedModel.id]) {
      setActiveModelId(selectedModel.id);
    }
  }, [selectedModel?.id]);

  // Models list filtered by Tier category
  const visibleModels = useMemo(() => {
    const all = Object.values(MODEL_HISTORIES);
    if (tierFilter === "FLAGSHIP") {
      return all.filter((m) => m.tier === "T0" || m.tier === "T1");
    }
    if (tierFilter === "FLASH") {
      return all.filter((m) => m.tier === "T2" || m.tier === "T3" || m.tier === "T4");
    }
    return all;
  }, [tierFilter]);

  // Combine data for all visible models across 12 episodes in a single chart dataset
  const chartData = useMemo(() => {
    return EPISODES_META.map((epMeta, idx) => {
      const row: Record<string, any> = {
        episode: epMeta.ep,
        title: epMeta.title,
        difficulty: epMeta.difficulty,
        epIndex: idx + 1,
      };

      Object.values(MODEL_HISTORIES).forEach((model) => {
        const point = model.history[idx];
        row[model.modelId] = point ? point.score : 0;
        row[`${model.modelId}_note`] = point?.note || "";
      });

      return row;
    });
  }, []);

  // Focused model statistics
  const currentHighlightId = hoveredModelId || activeModelId;
  const highlightModel = currentHighlightId ? MODEL_HISTORIES[currentHighlightId] : null;

  // Custom Tooltip showing all models ranked at the hovered episode
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      // Collect scores of all visible models at this episode and sort descending
      const episodeRankings = visibleModels
        .map((m) => ({
          model: m,
          score: data[m.modelId] as number,
          note: data[`${m.modelId}_note`] as string,
        }))
        .filter((item) => typeof item.score === "number")
        .sort((a, b) => b.score - a.score);

      const targetModel = highlightModel || episodeRankings[0]?.model;
      const targetNote = targetModel ? (data[`${targetModel.modelId}_note`] as string) : "";

      return (
        <div className="bg-[#0e0e16]/95 backdrop-blur-xl border border-white/20 p-3.5 rounded-xl shadow-[0_16px_50px_rgba(0,0,0,0.9)] font-mono-code text-xs max-w-sm z-50 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 gap-2">
            <div>
              <span className="font-semibold text-white text-[13px]">{data.title}</span>
              <span className="text-[10px] text-zinc-500 ml-1.5 font-sans">({data.difficulty})</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">
              全模型排名
            </span>
          </div>

          {/* Model Rankings List in this Episode */}
          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
            {episodeRankings.map((item, index) => {
              const isItemHighlighted = currentHighlightId === item.model.modelId;
              return (
                <div
                  key={item.model.modelId}
                  className={`flex justify-between items-center py-0.5 px-1.5 rounded transition-colors ${
                    isItemHighlighted
                      ? "bg-white/15 text-white font-semibold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-[10px] text-zinc-500 w-3">{index + 1}.</span>
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: item.model.color }}
                    />
                    <span className="text-zinc-200 truncate">{item.model.modelName}</span>
                    <span className="text-[9px] px-1 rounded bg-white/5 text-zinc-500">
                      {item.model.tier}
                    </span>
                  </div>
                  <span className="font-bold shrink-0 ml-2" style={{ color: item.model.color }}>
                    {item.score.toFixed(1)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Contextual Battle Note */}
          {targetNote && (
            <div className="pt-2 mt-2 border-t border-white/[0.08] text-[11px] leading-relaxed">
              <div className="text-[10px] text-zinc-500 mb-0.5 flex items-center gap-1">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: targetModel?.color }}
                />
                <span>{targetModel?.modelName} 战况实录:</span>
              </div>
              <p className="text-amber-200/95 font-sans pl-2.5 border-l border-amber-500/30">
                {targetNote}
              </p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <section
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="mb-20 sm:mb-28"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/[0.08] pb-4 mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 font-mono-code text-[11px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <TrendingUp className="w-3 h-3" />
              <span>EVOLUTION · 战力演变全景</span>
            </span>
          </div>
          <h2 className="font-serif-title italic text-3xl sm:text-4xl text-white font-normal leading-tight">
            Battlefield Trajectory
          </h2>
          <span className="font-mono-code text-[11px] text-zinc-500 tracking-wider uppercase block mt-1">
            过往 12 期全模型群雄逐鹿同屏走势 · 悬停探查各期断层斩杀
          </span>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-3 font-mono-code text-xs flex-wrap">
          {/* Tier Group Filters */}
          <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-0.5 rounded">
            {[
              { id: "ALL", label: "全部模型 (9款)" },
              { id: "FLAGSHIP", label: "突围旗舰 (T0/T1)" },
              { id: "FLASH", label: "Flash/基座 (T2-T4)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTierFilter(tab.id as any)}
                className={`px-2.5 py-1 rounded transition-colors text-xs ${
                  tierFilter === tab.id
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Reference Lines Toggle */}
          <label className="flex items-center gap-1.5 text-zinc-400 hover:text-white cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showCutoffLines}
              onChange={(e) => setShowCutoffLines(e.target.checked)}
              className="rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500/20"
            />
            <span>显示钻石/王者线</span>
          </label>

          {/* Reset Highlight */}
          {activeModelId && (
            <button
              onClick={() => setActiveModelId(null)}
              className="flex items-center gap-1 px-2 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/10 transition-colors"
              title="显示所有曲线，不聚焦单个模型"
            >
              <RotateCcw className="w-3 h-3 text-zinc-400" />
              <span>全览视图</span>
            </button>
          )}
        </div>
      </div>

      {/* Model Interactive Spotlight Switcher Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        <span className="font-mono-code text-xs text-zinc-500 shrink-0 mr-1 flex items-center gap-1">
          <SlidersHorizontal className="w-3 h-3" />
          <span>点击高亮:</span>
        </span>

        {Object.values(MODEL_HISTORIES).map((m) => {
          const isSelected = activeModelId === m.modelId;
          const isHovered = hoveredModelId === m.modelId;

          return (
            <button
              key={m.modelId}
              onClick={() => {
                setActiveModelId(isSelected ? null : m.modelId);
              }}
              onMouseEnter={() => setHoveredModelId(m.modelId)}
              onMouseLeave={() => setHoveredModelId(null)}
              className={`font-mono-code text-xs px-3 py-1.5 rounded-lg shrink-0 transition-all flex items-center gap-1.5 border select-none ${
                isSelected
                  ? "bg-white text-black font-semibold border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-[1.02]"
                  : isHovered
                  ? "bg-white/[0.08] text-white border-white/30"
                  : "bg-white/[0.03] hover:bg-white/[0.07] text-zinc-400 hover:text-zinc-200 border-white/[0.08]"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: isSelected ? "#000" : m.color }}
              />
              <span>{m.modelName}</span>
              <span
                className={`text-[10px] px-1 rounded ${
                  isSelected ? "bg-black/10 text-black font-bold" : "bg-white/5 text-zinc-500"
                }`}
              >
                {m.tier}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dashboard Card Container */}
      <div className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-white/[0.015] backdrop-blur-md relative overflow-hidden">
        {/* Subtle decorative glow reacting to highlighted model */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-500 opacity-10"
          style={{ backgroundColor: highlightModel ? highlightModel.color : "#60a5fa" }}
        />

        {/* Highlighted Model Summary Bar (if any model is selected or hovered) */}
        {highlightModel ? (
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06] font-mono-code flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]"
                style={{ backgroundColor: highlightModel.color }}
              />
              <span className="text-lg font-bold text-white tracking-tight">
                {highlightModel.modelName}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-zinc-300 font-semibold">
                {highlightModel.tier} 阶梯
              </span>
            </div>

            <div className="flex items-center gap-6 text-xs text-zinc-400">
              <div>
                <span className="text-zinc-500 text-[10px] uppercase mr-1.5">12期终榜:</span>
                <strong className="text-white text-sm font-bold">
                  {highlightModel.history[11]?.score.toFixed(1)} 分
                </strong>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] uppercase mr-1.5">峰值战力:</span>
                <strong className="text-emerald-400 text-sm font-bold">
                  {Math.max(...highlightModel.history.map((h) => h.score)).toFixed(1)} 分
                </strong>
              </div>
              <button
                onClick={() => setActiveModelId(null)}
                className="text-[11px] text-zinc-500 hover:text-white underline underline-offset-2"
              >
                返回全景
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06] font-mono-code text-xs text-zinc-400 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-zinc-300">
                当前同屏展示 <strong>{visibleModels.length}</strong> 款模型全部 12 期战力轨迹
              </span>
            </div>
            <span className="text-[11px] text-zinc-500">
              点击上方模型标签或下方折线即可单独高亮其轨迹
            </span>
          </div>
        )}

        {/* Recharts Chart Area */}
        <div className="w-full h-88 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="episode"
                stroke="#71717a"
                tick={{ fill: "#71717a", fontSize: 11, fontFamily: "monospace" }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
              />
              <YAxis
                domain={[35, 105]}
                stroke="#71717a"
                tick={{ fill: "#71717a", fontSize: 11, fontFamily: "monospace" }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Reference Lines for Cutoff boundaries */}
              {showCutoffLines && (
                <>
                  <ReferenceLine
                    y={90}
                    stroke="#f59e0b"
                    strokeDasharray="4 4"
                    strokeOpacity={0.4}
                    label={{
                      value: "王者绝壁线 (90分)",
                      fill: "#f59e0b",
                      fontSize: 10,
                      position: "insideTopRight",
                      opacity: 0.8,
                    }}
                  />
                  <ReferenceLine
                    y={80}
                    stroke="#38bdf8"
                    strokeDasharray="4 4"
                    strokeOpacity={0.35}
                    label={{
                      value: "钻石分水岭 (80分)",
                      fill: "#38bdf8",
                      fontSize: 10,
                      position: "insideTopRight",
                      opacity: 0.8,
                    }}
                  />
                </>
              )}

              {/* ---------------- ALL MODELS RENDERED TOGETHER ON THE SAME CHART ---------------- */}
              {visibleModels.map((model) => {
                const isSelected = activeModelId === model.modelId;
                const isHovered = hoveredModelId === model.modelId;
                const isHighlighted = isSelected || isHovered;

                // When one model is highlighted, others become subtle contextual lines
                let lineOpacity = 0.8;
                let strokeWidth = 2;

                if (currentHighlightId) {
                  if (isHighlighted) {
                    lineOpacity = 1.0;
                    strokeWidth = 3.5;
                  } else {
                    lineOpacity = 0.18; // Soft ghost line
                    strokeWidth = 1.2;
                  }
                }

                return (
                  <Line
                    key={model.modelId}
                    type="monotone"
                    dataKey={model.modelId}
                    name={model.modelName}
                    stroke={model.color}
                    strokeWidth={strokeWidth}
                    strokeOpacity={lineOpacity}
                    dot={
                      isHighlighted
                        ? {
                            r: 4.5,
                            fill: model.color,
                            stroke: "#0e0e14",
                            strokeWidth: 2,
                          }
                        : false
                    }
                    activeDot={{
                      r: 6.5,
                      fill: model.color,
                      stroke: "#ffffff",
                      strokeWidth: 2,
                    }}
                    isAnimationActive={false}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Footnote Legend with All Model Colors */}
        <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between flex-wrap gap-2 text-[11px] font-mono-code text-zinc-500">
          <div className="flex items-center gap-3 flex-wrap">
            {visibleModels.map((m) => {
              const isHighlighted = currentHighlightId === m.modelId;
              return (
                <button
                  key={m.modelId}
                  onClick={() => setActiveModelId(activeModelId === m.modelId ? null : m.modelId)}
                  onMouseEnter={() => setHoveredModelId(m.modelId)}
                  onMouseLeave={() => setHoveredModelId(null)}
                  className={`flex items-center gap-1.5 transition-opacity ${
                    currentHighlightId && !isHighlighted ? "opacity-35" : "opacity-100"
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: m.color }}
                  />
                  <span className={isHighlighted ? "text-white font-bold" : "text-zinc-400"}>
                    {m.modelName}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {showCutoffLines && (
              <span className="text-amber-500/70 hidden md:inline">
                -- 90/80 难关斩杀线
              </span>
            )}
            <span>悬停任意数据点查看各期战力榜</span>
          </div>
        </div>
      </div>
    </section>
  );
};
