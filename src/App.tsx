import React, { useState, useEffect, useMemo } from "react";
import { KILL_LINE_DATA, COST_DATA } from "./data/shishanData";
import { KillLineRecord, StatusType } from "./types";
import { Header } from "./components/Header";
import { BentoStats } from "./components/BentoStats";
import { SurvivalFunnel } from "./components/SurvivalFunnel";
import { KillLineTable } from "./components/KillLineTable";
import { CostVisualizer } from "./components/CostVisualizer";
import { TierHierarchy } from "./components/TierHierarchy";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { ModelComparatorModal } from "./components/ModelComparatorModal";
import { ModelDetailModal } from "./components/ModelDetailModal";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTier, setFilterTier] = useState("ALL");
  const [sortBy, setSortBy] = useState<"score" | "name" | "diamond" | "king">("score");
  const [selectedModel, setSelectedModel] = useState<KillLineRecord>(KILL_LINE_DATA[0]);
  const [selectedForCompare, setSelectedForCompare] = useState<KillLineRecord[]>([]);
  const [isComparatorOpen, setIsComparatorOpen] = useState(false);
  const [detailModalModel, setDetailModalModel] = useState<KillLineRecord | null>(null);
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const [cursorMode, setCursorMode] = useState<"default" | "lens" | "button">("default");
  const [copied, setCopied] = useState(false);

  // Sync has-custom-cursor class to body
  useEffect(() => {
    if (cursorEnabled) {
      document.body.classList.add("has-custom-cursor");
    } else {
      document.body.classList.remove("has-custom-cursor");
    }
    return () => {
      document.body.classList.remove("has-custom-cursor");
    };
  }, [cursorEnabled]);

  // Cursor hover handlers
  const handleMouseEnterLens = () => setCursorMode("lens");
  const handleMouseEnterButton = () => setCursorMode("button");
  const handleMouseLeaveCursor = () => setCursorMode("default");

  // Toggle compare selection
  const handleToggleCompare = (model: KillLineRecord) => {
    setSelectedForCompare((prev) => {
      const exists = prev.some((m) => m.id === model.id);
      if (exists) {
        return prev.filter((m) => m.id !== model.id);
      }
      if (prev.length >= 2) {
        // Replace second model
        return [prev[0], model];
      }
      return [...prev, model];
    });
  };

  // Open comparator
  const handleOpenComparator = () => {
    if (selectedForCompare.length === 0) {
      // Default compare Astra vs DeepSeek V4.1 Flash
      const astra = KILL_LINE_DATA.find((m) => m.id === "gpt-6-astra") || KILL_LINE_DATA[0];
      const flash = KILL_LINE_DATA.find((m) => m.id === "deepseek-v41-flash") || KILL_LINE_DATA[1];
      setSelectedForCompare([astra, flash]);
    } else if (selectedForCompare.length === 1) {
      // Add another default
      const candidate = KILL_LINE_DATA.find((m) => m.id !== selectedForCompare[0].id) || KILL_LINE_DATA[0];
      setSelectedForCompare([selectedForCompare[0], candidate]);
    }
    setIsComparatorOpen(true);
  };

  // Select model slot in comparator
  const handleSelectModelForSlot = (slotIndex: number, model: KillLineRecord) => {
    setSelectedForCompare((prev) => {
      const updated = [...prev];
      updated[slotIndex] = model;
      return updated;
    });
  };

  // Copy link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Export Data as JSON or CSV
  const handleExportData = (format: "json" | "csv") => {
    if (format === "json") {
      const dataStr = JSON.stringify(
        {
          title: "屎山论剑全 12 期 · 难度斩杀线 × 花费全量对照",
          source: "B站: Token就是词元",
          exportedAt: new Date().toISOString(),
          killLines: KILL_LINE_DATA,
          costSettlements: COST_DATA,
        },
        null,
        2
      );
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "shishan-benchmark-data.json";
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const headers = [
        "模型名称",
        "天梯梯队",
        "分类",
        "黄金线",
        "钻石线",
        "王者线",
        "综合战力分",
        "成本估算",
        "词元消耗",
        "实测证言",
      ];
      const rows = KILL_LINE_DATA.map((d) => [
        `"${d.model}"`,
        `"${d.tier}"`,
        `"${d.category}"`,
        `"${d.gold}"`,
        `"${d.diamond}"`,
        `"${d.king}"`,
        d.score,
        `"${d.costEstimate}"`,
        `"${d.tokensConsumed}"`,
        `"${d.quote.replace(/"/g, '""')}"`,
      ]);
      const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "shishan-benchmark-data.csv";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Bento stat highlight handler
  const handleSelectHighlight = (type: "ASTRA" | "DS_FLASH" | "DIAMOND" | "KING") => {
    if (type === "ASTRA") {
      const astra = KILL_LINE_DATA.find((m) => m.id === "gpt-6-astra");
      if (astra) {
        setSelectedModel(astra);
        setDetailModalModel(astra);
      }
    } else if (type === "DS_FLASH") {
      const ds = KILL_LINE_DATA.find((m) => m.id === "deepseek-v41-flash");
      if (ds) {
        setSelectedModel(ds);
        setDetailModalModel(ds);
      }
    } else if (type === "DIAMOND") {
      setFilterTier("ALL");
      setSortBy("diamond");
    } else if (type === "KING") {
      setFilterTier("TOP");
      setSortBy("king");
    }
  };

  // Filter and Sort Data
  const filteredAndSortedData = useMemo(() => {
    return KILL_LINE_DATA.filter((item) => {
      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesModel = item.model.toLowerCase().includes(q);
        const matchesQuote = item.quote.toLowerCase().includes(q);
        const matchesAnalysis = item.analysis.toLowerCase().includes(q);
        const matchesTier = item.tier.toLowerCase().includes(q);
        if (!matchesModel && !matchesQuote && !matchesAnalysis && !matchesTier) {
          return false;
        }
      }

      // Tier/category filters
      if (filterTier === "TOP") {
        return (
          item.kingStatus === "pass" ||
          item.kingStatus === "warn" ||
          item.diamondStatus === "pass"
        );
      }
      if (filterTier === "FLASH") {
        return item.category === "Flash" || item.model.toLowerCase().includes("flash");
      }
      if (filterTier === "T0_T1") {
        return item.tier === "T0" || item.tier === "T1";
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "name") {
        return a.model.localeCompare(b.model);
      }
      if (sortBy === "diamond") {
        const weight: Record<StatusType, number> = { pass: 3, warn: 2, fail: 1, none: 0 };
        return weight[b.diamondStatus] - weight[a.diamondStatus] || b.score - a.score;
      }
      if (sortBy === "king") {
        const weight: Record<StatusType, number> = { pass: 3, warn: 2, fail: 1, none: 0 };
        return weight[b.kingStatus] - weight[a.kingStatus] || b.score - a.score;
      }
      // default: score
      return b.score - a.score;
    });
  }, [searchQuery, filterTier, sortBy]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] font-sans antialiased selection:bg-rose-500/20 selection:text-rose-200">
      {/* Grain texture overlay */}
      <div className="grain-overlay" />

      {/* Smooth lens follow cursor */}
      <CustomCursor
        mode={cursorMode}
        lensSize={150}
        enabled={cursorEnabled}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          cursorEnabled={cursorEnabled}
          onToggleCursor={() => setCursorEnabled((prev) => !prev)}
          selectedForCompare={selectedForCompare}
          onOpenComparator={handleOpenComparator}
          onExportData={handleExportData}
          copied={copied}
          onCopyLink={handleCopyLink}
        />

        {/* Bento Stats Highlights */}
        <BentoStats
          onSelectHighlight={handleSelectHighlight}
          onMouseEnter={handleMouseEnterLens}
          onMouseLeave={handleMouseLeaveCursor}
        />

        {/* Survival Funnel Chart */}
        <SurvivalFunnel />

        {/* Main Kill-Line Matrix Table */}
        <KillLineTable
          data={filteredAndSortedData}
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
          selectedForCompare={selectedForCompare}
          onToggleCompare={handleToggleCompare}
          onOpenDetailModal={setDetailModalModel}
          filterTier={filterTier}
          onFilterTierChange={setFilterTier}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onMouseEnter={handleMouseEnterLens}
          onMouseLeave={handleMouseLeaveCursor}
        />

        {/* Cost & Token Economics Section */}
        <CostVisualizer
          onMouseEnter={handleMouseEnterLens}
          onMouseLeave={handleMouseLeaveCursor}
        />

        {/* Verified Hierarchy Ladder */}
        <TierHierarchy
          onMouseEnter={handleMouseEnterLens}
          onMouseLeave={handleMouseLeaveCursor}
        />

        {/* Footer */}
        <Footer />
      </div>

      {/* Side-by-Side Model Comparator Modal */}
      <ModelComparatorModal
        isOpen={isComparatorOpen}
        onClose={() => setIsComparatorOpen(false)}
        models={selectedForCompare}
        allModels={KILL_LINE_DATA}
        onSelectModelForSlot={handleSelectModelForSlot}
      />

      {/* Deep Dossier Modal */}
      <ModelDetailModal
        model={detailModalModel}
        isOpen={!!detailModalModel}
        onClose={() => setDetailModalModel(null)}
        onAddToCompare={(model) => {
          handleToggleCompare(model);
          handleOpenComparator();
        }}
      />
    </div>
  );
}
