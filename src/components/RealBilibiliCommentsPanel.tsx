import React, { useState, useMemo } from "react";
import { REAL_BILIBILI_COMMENTS, RealBilibiliComment } from "../data/realBilibiliComments";
import {
  MessageSquare,
  ThumbsUp,
  ExternalLink,
  Search,
  Filter,
  Flame,
  Crown,
  Code2,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
  Tv,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RealBilibiliCommentsPanelProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const RealBilibiliCommentsPanel: React.FC<RealBilibiliCommentsPanelProps> = ({
  onMouseEnter,
  onMouseLeave,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState<number | "ALL">("ALL");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "hot" | "up" | "tech">("all");
  const [sortBy, setSortBy] = useState<"like" | "episode" | "recent">("like");
  const [visibleCount, setVisibleCount] = useState(15);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Copy comment text
  const handleCopy = (comment: RealBilibiliComment, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(
      `【B站 @${comment.userName} 在《${comment.episodeTitle}》的评论】：\n${comment.message}`
    );
    setCopiedId(comment.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Keyword detection for tech comments
  const isTechComment = (msg: string) => {
    const techKeywords = [
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
    const lower = msg.toLowerCase();
    return techKeywords.some((k) => lower.includes(k));
  };

  // Filter & sort comments
  const filteredComments = useMemo(() => {
    return REAL_BILIBILI_COMMENTS.filter((c) => {
      // Episode filter
      if (selectedEpisode !== "ALL" && c.episode !== selectedEpisode) {
        return false;
      }

      // Category filter
      if (categoryFilter === "hot" && c.likeCount < 50) {
        return false;
      }
      if (categoryFilter === "up" && !c.isUpTop && !c.isUpLike && !c.isUpAuthor) {
        return false;
      }
      if (categoryFilter === "tech" && !isTechComment(c.message)) {
        return false;
      }

      // Search query
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
      // recent fallback by id
      return b.id.localeCompare(a.id);
    });
  }, [selectedEpisode, categoryFilter, sortBy, searchQuery]);

  const displayedComments = filteredComments.slice(0, visibleCount);

  // Statistics
  const stats = useMemo(() => {
    const totalLikes = REAL_BILIBILI_COMMENTS.reduce((sum, c) => sum + c.likeCount, 0);
    const maxLikeComment = [...REAL_BILIBILI_COMMENTS].sort((a, b) => b.likeCount - a.likeCount)[0];
    const upInteractCount = REAL_BILIBILI_COMMENTS.filter((c) => c.isUpTop || c.isUpLike || c.isUpAuthor).length;
    return {
      total: REAL_BILIBILI_COMMENTS.length,
      totalLikes,
      maxLike: maxLikeComment?.likeCount || 0,
      upInteractCount,
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner with Stats & Up-to-date Badges */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#00aeec]/10 via-[#00aeec]/5 to-transparent border border-[#00aeec]/20 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-[#00aeec]/10 blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-[#00aeec] text-white text-xs font-mono-code font-bold tracking-tight inline-flex items-center gap-1 shadow-sm shadow-[#00aeec]/30">
                <Tv className="w-3 h-3" />
                <span>B 站原生数据源</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono-code">
                ✓ 真实全量抓取 404 条原评
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono-code">
                🔥 最高 1,775 赞神评
              </span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>《屎山论剑》B 站原生评论区与开发者实战讨论</span>
            </h3>
            <p className="text-xs text-zinc-400 font-mono-code leading-relaxed max-w-3xl">
              真实收录全 12 期视频评论区中高赞热评、楼中楼争鸣与 UP 主「Token就是词元」亲自回复。
              在这里可直接阅读国内一线工程师针对 Agent 提示词工程、子代理编排、死锁排查与各家模型实战特性的最真实反馈。
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://space.bilibili.com/3546747185924773"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#00aeec] hover:bg-[#00aeec]/90 text-white text-xs font-mono-code font-medium transition-all shadow-lg shadow-[#00aeec]/20 hover:shadow-[#00aeec]/40 flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>前往 UP 主 B 站空间</span>
            </a>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/[0.08]">
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.05]">
            <div className="text-[11px] text-zinc-400 font-mono-code">真实抓取总数</div>
            <div className="text-lg font-bold font-mono-code text-white mt-0.5">
              {stats.total}{" "}
              <span className="text-xs font-normal text-zinc-500">条</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.05]">
            <div className="text-[11px] text-zinc-400 font-mono-code">覆盖实测视频</div>
            <div className="text-lg font-bold font-mono-code text-[#00aeec] mt-0.5">
              12 / 12{" "}
              <span className="text-xs font-normal text-zinc-500">期</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.05]">
            <div className="text-[11px] text-zinc-400 font-mono-code">最高点赞神评</div>
            <div className="text-lg font-bold font-mono-code text-amber-400 mt-0.5">
              {stats.maxLike.toLocaleString()}{" "}
              <span className="text-xs font-normal text-zinc-500">赞</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.05]">
            <div className="text-[11px] text-zinc-400 font-mono-code">UP 主亲临互动</div>
            <div className="text-lg font-bold font-mono-code text-pink-400 mt-0.5">
              {stats.upInteractCount}{" "}
              <span className="text-xs font-normal text-zinc-500">处</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3.5">
        {/* Row 1: Search & Category Pills */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索评论内容、关键词（如 todo, prompt, deepseek, 梁神, agent）或用户名..."
              className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/[0.1] rounded-xl text-xs font-mono-code text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#00aeec]/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300 font-mono-code"
              >
                清除
              </button>
            )}
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none shrink-0">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-colors cursor-pointer whitespace-nowrap ${
                categoryFilter === "all"
                  ? "bg-[#00aeec] text-white font-medium"
                  : "bg-white/[0.05] text-zinc-400 hover:bg-white/[0.1] hover:text-zinc-200"
              }`}
            >
              全部原评 ({REAL_BILIBILI_COMMENTS.length})
            </button>
            <button
              onClick={() => setCategoryFilter("hot")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                categoryFilter === "hot"
                  ? "bg-amber-500 text-white font-medium"
                  : "bg-white/[0.05] text-zinc-400 hover:bg-white/[0.1] hover:text-zinc-200"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>高赞 (&gt;50赞)</span>
            </button>
            <button
              onClick={() => setCategoryFilter("up")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                categoryFilter === "up"
                  ? "bg-pink-500 text-white font-medium"
                  : "bg-white/[0.05] text-zinc-400 hover:bg-white/[0.1] hover:text-zinc-200"
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>UP主互动</span>
            </button>
            <button
              onClick={() => setCategoryFilter("tech")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                categoryFilter === "tech"
                  ? "bg-emerald-500 text-white font-medium"
                  : "bg-white/[0.05] text-zinc-400 hover:bg-white/[0.1] hover:text-zinc-200"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>技术干货</span>
            </button>
          </div>
        </div>

        {/* Row 2: Episode Selector & Sort By */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-white/[0.05]">
          {/* Episode Select Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none text-xs font-mono-code">
            <span className="text-zinc-500 shrink-0 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" />
              <span>期数:</span>
            </span>
            <button
              onClick={() => setSelectedEpisode("ALL")}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer shrink-0 ${
                selectedEpisode === "ALL"
                  ? "bg-white/[0.15] text-white font-bold border border-white/20"
                  : "text-zinc-400 hover:bg-white/[0.05]"
              }`}
            >
              全12期
            </button>
            {Array.from({ length: 12 }).map((_, idx) => {
              const epNum = idx + 1;
              const isSelected = selectedEpisode === epNum;
              return (
                <button
                  key={epNum}
                  onClick={() => setSelectedEpisode(epNum)}
                  className={`px-2 py-1 rounded-md text-[11px] transition-colors cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-[#00aeec] text-white font-bold"
                      : "text-zinc-400 hover:bg-white/[0.05]"
                  }`}
                >
                  第{epNum}期
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto text-xs font-mono-code">
            <span className="text-zinc-500">排序:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-black/60 border border-white/[0.1] rounded-lg px-2.5 py-1 text-xs text-zinc-300 focus:outline-none focus:border-[#00aeec]/50"
            >
              <option value="like">按点赞数最高</option>
              <option value="episode">按期数倒序</option>
              <option value="recent">最新评论</option>
            </select>
          </div>
        </div>
      </div>

      {/* Result Count and Status */}
      <div className="flex items-center justify-between text-xs font-mono-code text-zinc-400 px-1">
        <div>
          共匹配到{" "}
          <span className="text-white font-bold">{filteredComments.length}</span> 条评论
          {selectedEpisode !== "ALL" && ` (第 ${selectedEpisode} 期)`}
          {categoryFilter !== "all" && ` [已筛选]`}
        </div>
        <div>
          显示前 {Math.min(visibleCount, filteredComments.length)} 条
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {displayedComments.length === 0 ? (
          <div className="py-16 text-center text-zinc-500 font-mono-code text-xs border border-dashed border-white/[0.08] rounded-2xl">
            未检索到匹配的评论，请尝试更换关键词或清除筛选条件。
          </div>
        ) : (
          displayedComments.map((c) => {
            const isTopLiked = c.likeCount >= 200;
            const isUpRelated = c.isUpTop || c.isUpLike || c.isUpAuthor;

            return (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={`p-4 rounded-2xl transition-all border relative group ${
                  c.isUpTop
                    ? "bg-gradient-to-r from-amber-500/[0.08] via-amber-500/[0.03] to-transparent border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.05)]"
                    : isTopLiked
                    ? "bg-white/[0.025] hover:bg-white/[0.04] border-white/[0.09]"
                    : "bg-white/[0.015] hover:bg-white/[0.03] border-white/[0.06]"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* User Avatar */}
                  <div className="shrink-0 relative">
                    <img
                      src={c.userAvatar}
                      alt={c.userName}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        // Fallback to placeholder if B站 avatar fails to load
                        (e.target as HTMLElement).style.display = "none";
                      }}
                      className="w-10 h-10 rounded-full border border-white/10 object-cover bg-zinc-800"
                    />
                    <div
                      className="w-10 h-10 rounded-full border border-white/10 bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-xs font-bold text-zinc-300 -mt-10"
                      style={{ display: "none" }}
                    >
                      {c.userName.slice(0, 1)}
                    </div>

                    {/* Lv Badge */}
                    <div
                      className={`absolute -bottom-1 -right-1 text-[9px] font-mono-code font-bold px-1 rounded-sm shadow-sm ${
                        c.userLevel >= 6
                          ? "bg-gradient-to-r from-red-600 to-rose-600 text-white"
                          : c.userLevel === 5
                          ? "bg-orange-500 text-white"
                          : "bg-zinc-700 text-zinc-300"
                      }`}
                    >
                      Lv{c.userLevel}
                    </div>
                  </div>

                  {/* Comment Body */}
                  <div className="flex-1 min-w-0 space-y-2">
                    {/* User Info & Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs font-bold font-mono-code ${
                            c.isUpAuthor ? "text-[#00aeec]" : "text-zinc-200"
                          }`}
                        >
                          {c.userName}
                        </span>

                        {/* Special Badges */}
                        {c.isUpAuthor && (
                          <span className="px-1.5 py-0.5 rounded bg-[#00aeec] text-white text-[10px] font-bold font-mono-code">
                            UP主
                          </span>
                        )}

                        {c.isUpTop && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono-code font-bold inline-flex items-center gap-1">
                            <Crown className="w-2.5 h-2.5" />
                            <span>UP主置顶</span>
                          </span>
                        )}

                        {c.isUpLike && (
                          <span className="px-1.5 py-0.5 rounded bg-pink-500/15 border border-pink-500/30 text-pink-300 text-[10px] font-mono-code">
                            UP主觉得很赞
                          </span>
                        )}

                        {c.isSubReply && (
                          <span className="px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-400 text-[10px] font-mono-code">
                            楼中楼回复
                          </span>
                        )}

                        <span className="text-[11px] font-mono-code text-zinc-500">
                          {c.timeDesc}
                        </span>
                      </div>

                      {/* Episode Tag */}
                      <a
                        href={`https://www.bilibili.com/video/${c.bvid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono-code text-zinc-400 hover:text-[#00aeec] transition-colors group-hover:text-zinc-300"
                        title={c.episodeTitle}
                      >
                        <Tv className="w-3 h-3 text-[#00aeec]" />
                        <span>第{c.episode}期实测</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </a>
                    </div>

                    {/* Message Content */}
                    <div className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap break-words font-sans">
                      {c.message}
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-1 text-xs font-mono-code text-zinc-500">
                      <div className="flex items-center gap-4">
                        <span
                          className={`inline-flex items-center gap-1 ${
                            c.likeCount > 0 ? "text-zinc-300 font-medium" : "text-zinc-500"
                          }`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${c.likeCount >= 100 ? "text-amber-400 fill-amber-400/20" : ""}`} />
                          <span>{c.likeCount.toLocaleString()}</span>
                        </span>

                        {c.replyCount > 0 && (
                          <span className="inline-flex items-center gap-1 text-zinc-400">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{c.replyCount} 条跟评</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleCopy(c, e)}
                          className="px-2 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-zinc-200 transition-colors text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedId === c.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">已复制</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>复制内容</span>
                            </>
                          )}
                        </button>

                        <a
                          href={`https://www.bilibili.com/video/${c.bvid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 rounded bg-[#00aeec]/10 hover:bg-[#00aeec]/20 text-[#00aeec] transition-colors text-[11px] flex items-center gap-1"
                        >
                          <span>查看视频</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredComments.length && (
        <div className="text-center pt-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 20)}
            className="px-6 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/[0.08] font-mono-code text-xs transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>加载更多评论 (剩余 {filteredComments.length - visibleCount} 条)</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
