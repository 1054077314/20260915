import {
  REAL_EPISODES_META,
  REAL_MODEL_HISTORIES,
  EpisodeMeta,
  ModelHistoryData,
} from "../data/realBattlefieldData";

export interface TrajectoryRow {
  episode: string;
  title: string;
  topic: string;
  difficulty: string;
  bvid: string;
  epNum: number;
  [key: string]: any;
}

/**
 * 战场轨迹与演化数据服务
 * 负责构建严格的真实参测断点图表数据或全关卡能力推导数据
 */
export class TrajectoryService {
  /**
   * 获取所有 12 期实测元数据
   */
  static getEpisodesMeta(): EpisodeMeta[] {
    return REAL_EPISODES_META;
  }

  /**
   * 获取所有模型的参测历史档案字典
   */
  static getModelHistories(): Record<string, ModelHistoryData> {
    return REAL_MODEL_HISTORIES;
  }

  /**
   * 按分类筛选模型（全部 / 旗舰 / Flash）
   */
  static getFilteredModels(tierFilter: "ALL" | "FLAGSHIP" | "FLASH"): ModelHistoryData[] {
    const all = Object.values(REAL_MODEL_HISTORIES);
    if (tierFilter === "FLAGSHIP") {
      return all.filter((m) => m.tier === "T0" || m.tier === "T1");
    }
    if (tierFilter === "FLASH") {
      return all.filter((m) => m.tier === "T2" || m.tier === "T3" || m.tier === "T4");
    }
    return all;
  }

  /**
   * 构建图表渲染数据集
   * @param mode "REAL_ONLY" 未参测为 null，断点严格不连线；"FULL_EXTRAPOLATED" 显示全关卡战力推导
   */
  static generateChartData(mode: "REAL_ONLY" | "FULL_EXTRAPOLATED"): TrajectoryRow[] {
    return REAL_EPISODES_META.map((epMeta) => {
      const row: TrajectoryRow = {
        episode: epMeta.ep,
        title: epMeta.title,
        topic: epMeta.topic,
        difficulty: epMeta.difficulty,
        bvid: epMeta.bvid,
        epNum: epMeta.epNum,
      };

      Object.values(REAL_MODEL_HISTORIES).forEach((model) => {
        const record = model.records[epMeta.ep];
        if (!record) return;

        if (mode === "REAL_ONLY") {
          row[model.modelId] = record.tested ? record.score : null;
        } else {
          row[model.modelId] = record.score;
        }

        row[`${model.modelId}_tested`] = record.tested;
        row[`${model.modelId}_result`] = record.roundResult;
        row[`${model.modelId}_note`] = record.note;
        row[`${model.modelId}_bvid`] = record.bvid || epMeta.bvid;
      });

      return row;
    });
  }
}
