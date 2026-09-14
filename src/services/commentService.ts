import {
  REAL_BILIBILI_COMMENTS,
  RealBilibiliComment,
} from "../data/realBilibiliComments";

export interface CommentFilterOptions {
  searchQuery?: string;
  categoryFilter?: "all" | "hot" | "up" | "tech";
  selectedEpisode?: number | "ALL";
  sortBy?: "like" | "episode" | "recent";
}

export interface CommentStats {
  total: number;
  totalLikes: number;
  maxLike: number;
  upInteractCount: number;
}

const TECH_KEYWORDS = [
  "agent",
  "prompt",
  "todo",
  "提示词",
  "sub agent",
  "bug",
  "v4f",
  "deepseek",
  "glm",
  "qwen",
  "claude",
  "gpt",
  "grok",
  "kimi",
  "codex",
  "workbuddy",
  "skills",
  "git",
  "测试用例",
  "死锁",
  "并发",
  "重构",
];

/**
 * 评论领域服务
 * 封装 404 条真实评论的检索、筛选、排序与聚合统计
 */
export class CommentService {
  /**
   * 判断单条评论是否属于技术实操/干货类
   */
  static isTechComment(msg: string): boolean {
    const lower = msg.toLowerCase();
    return TECH_KEYWORDS.some((k) => lower.includes(k));
  }

  /**
   * 获取所有原始评论
   */
  static getAllComments(): RealBilibiliComment[] {
    return REAL_BILIBILI_COMMENTS;
  }

  /**
   * 根据条件过滤并排序评论
   */
  static filterAndSort(options: CommentFilterOptions = {}): RealBilibiliComment[] {
    const {
      searchQuery = "",
      selectedEpisode = "ALL",
      categoryFilter = "all",
      sortBy = "like",
    } = options;

    return REAL_BILIBILI_COMMENTS.filter((c) => {
      // 1. Episode 过滤
      if (selectedEpisode !== "ALL" && c.episode !== selectedEpisode) {
        return false;
      }

      // 2. Category 过滤
      if (categoryFilter === "hot" && c.likeCount < 50) {
        return false;
      }
      if (categoryFilter === "up" && !c.isUpTop && !c.isUpLike && !c.isUpAuthor) {
        return false;
      }
      if (categoryFilter === "tech" && !this.isTechComment(c.message)) {
        return false;
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesUser = c.userName.toLowerCase().includes(q);
        const matchesMsg = c.message.toLowerCase().includes(q);
        const matchesTitle = c.episodeTitle.toLowerCase().includes(q);
        if (!matchesUser && !matchesMsg && !matchesTitle) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "like") {
        return b.likeCount - a.likeCount;
      }
      if (sortBy === "episode") {
        if (b.episode !== a.episode) return b.episode - a.episode;
        return b.likeCount - a.likeCount;
      }
      return b.id.localeCompare(a.id);
    });
  }

  /**
   * 计算评论全库统计指标
   */
  static getStats(): CommentStats {
    const totalLikes = REAL_BILIBILI_COMMENTS.reduce((sum, c) => sum + c.likeCount, 0);
    const maxLikeComment = [...REAL_BILIBILI_COMMENTS].sort((a, b) => b.likeCount - a.likeCount)[0];
    const upInteractCount = REAL_BILIBILI_COMMENTS.filter(
      (c) => c.isUpTop || c.isUpLike || c.isUpAuthor
    ).length;

    return {
      total: REAL_BILIBILI_COMMENTS.length,
      totalLikes,
      maxLike: maxLikeComment?.likeCount || 0,
      upInteractCount,
    };
  }
}
