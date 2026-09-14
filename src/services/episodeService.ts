import {
  BILIBILI_EPISODES,
  BILIBILI_UP_INFO,
  BilibiliVideoRecord,
} from "../data/bilibiliData";

export interface EpisodeFilterOptions {
  selectedModel?: string;
  sortOrder?: "asc" | "desc" | "play" | "danmaku";
}

/**
 * 官方 12 期实测视频服务
 * 封装视频元数据列表、播放量汇总、期数筛选与排序
 */
export class EpisodeService {
  /**
   * 获取 UP 主档案信息
   */
  static getUpInfo() {
    return BILIBILI_UP_INFO;
  }

  /**
   * 获取所有 12 期原始视频列表
   */
  static getAllEpisodes(): BilibiliVideoRecord[] {
    return BILIBILI_EPISODES;
  }

  /**
   * 依据模型名称与排序方式进行过滤
   */
  static filterAndSort(options: EpisodeFilterOptions = {}): BilibiliVideoRecord[] {
    const { selectedModel = "ALL", sortOrder = "asc" } = options;
    let list = [...BILIBILI_EPISODES];

    if (selectedModel !== "ALL") {
      list = list.filter(
        (ep) =>
          ep.keyModels.some((m) => m.toLowerCase().includes(selectedModel.toLowerCase())) ||
          ep.title.toLowerCase().includes(selectedModel.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      list.sort((a, b) => a.episodeIndex - b.episodeIndex);
    } else if (sortOrder === "desc") {
      list.sort((a, b) => b.episodeIndex - a.episodeIndex);
    } else if (sortOrder === "play") {
      const parsePlay = (p: string) => parseFloat(p.replace("万", "")) * 10000;
      list.sort((a, b) => parsePlay(b.playCount) - parsePlay(a.playCount));
    } else if (sortOrder === "danmaku") {
      const parseDan = (d: string) => parseInt(d.replace(/,/g, ""), 10) || 0;
      list.sort((a, b) => parseDan(b.danmakuCount) - parseDan(a.danmakuCount));
    }

    return list;
  }
}
