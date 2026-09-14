import { KillLineRecord, StatusType, CostRecord } from "../types";
import { KILL_LINE_DATA, COST_DATA } from "../data/shishanData";

export interface ModelFilterOptions {
  searchQuery?: string;
  filterTier?: "ALL" | "TOP" | "FLASH" | string;
  sortBy?: "score" | "name" | "diamond" | "king";
}

/**
 * 模型数据与排行榜业务服务
 * 负责模型列表聚合、多维度检索过滤、排序以及数据导出
 */
export class ModelService {
  /**
   * 获取所有斩杀线评测模型
   */
  static getAllModels(): KillLineRecord[] {
    return KILL_LINE_DATA;
  }

  /**
   * 按 ID 查找指定模型
   */
  static getModelById(id: string): KillLineRecord | undefined {
    return KILL_LINE_DATA.find((m) => m.id === id);
  }

  /**
   * 获取花费结算对比数据
   */
  static getCostData(): CostRecord[] {
    return COST_DATA;
  }

  /**
   * 综合检索与排序
   */
  static filterAndSortModels(options: ModelFilterOptions = {}): KillLineRecord[] {
    const { searchQuery = "", filterTier = "ALL", sortBy = "score" } = options;

    return KILL_LINE_DATA.filter((item) => {
      // 1. 关键词搜索
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesModel = item.model.toLowerCase().includes(q);
        const matchesQuote = item.quote.toLowerCase().includes(q);
        const matchesTier = item.tier.toLowerCase().includes(q);
        if (!matchesModel && !matchesQuote && !matchesTier) {
          return false;
        }
      }

      // 2. 梯队筛选
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

      return true;
    }).sort((a, b) => {
      // 3. 多规则排序
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
      return b.score - a.score;
    });
  }

  /**
   * 导出数据为 JSON 或 CSV 并自动触发下载
   */
  static exportData(format: "json" | "csv"): void {
    const blob = format === "json" ? this.exportToJson() : this.exportToCsv();
    const filename = `shishan-benchmark-data.${format}`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * 导出数据为 JSON 格式 Blob
   */
  static exportToJson(): Blob {
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
    return new Blob([dataStr], { type: "application/json" });
  }

  /**
   * 导出数据为 CSV 格式 Blob（带 UTF-8 BOM 防止 Excel 乱码）
   */
  static exportToCsv(): Blob {
    const headers = [
      "模型名称",
      "天梯梯队",
      "黄金线",
      "钻石线",
      "王者线",
      "实测证言",
    ];
    const rows = KILL_LINE_DATA.map((d) => [
      `"${d.model}"`,
      `"${d.tier}"`,
      `"${d.gold}"`,
      `"${d.diamond}"`,
      `"${d.king}"`,
      `"${d.quote.replace(/"/g, '""')}"`,
    ]);
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    return new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  }
}
