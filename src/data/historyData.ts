export interface EpisodePoint {
  episode: string; // e.g. "E01", "E02", ...
  episodeNum: number;
  label: string; // e.g. "第01期·初探屎山"
  score: number; // 0 - 100
  note?: string; // Crucial battle milestone
}

export interface ModelHistory {
  modelId: string;
  modelName: string;
  tier: "T0" | "T1" | "T2" | "T3" | "T4";
  color: string;
  history: EpisodePoint[];
}

// Full 12-episode chronological battle progression data
export const EPISODES_META = [
  { ep: "E01", title: "第01期 荒原初探", difficulty: "黄金基础" },
  { ep: "E02", title: "第02期 递归陷阱", difficulty: "黄金进阶" },
  { ep: "E03", title: "第03期 内存泄漏", difficulty: "黄金死结" },
  { ep: "E04", title: "第04期 竞态震荡", difficulty: "钻石初现" },
  { ep: "E05", title: "第05期 宏展开地狱", difficulty: "钻石攻坚" },
  { ep: "E06", title: "第06期 异步迷宫", difficulty: "钻石分水岭" },
  { ep: "E07", title: "第07期 零拷贝崩溃", difficulty: "钻石死斗" },
  { ep: "E08", title: "第08期 架构重构", difficulty: "王者前哨" },
  { ep: "E09", title: "第09期 极限断层", difficulty: "王者绝壁" },
  { ep: "E10", title: "第10期 Flash大突围", difficulty: "钻石决战" },
  { ep: "E11", title: "第11期 诸神混战", difficulty: "王者终局" },
  { ep: "E12", title: "第12期 订正总决算", difficulty: "断层全通" },
];

export const MODEL_HISTORIES: Record<string, ModelHistory> = {
  "gpt-6-astra": {
    modelId: "gpt-6-astra",
    modelName: "GPT-6 Astra",
    tier: "T0",
    color: "#fb7185", // rose-400
    history: [
      { episode: "E01", episodeNum: 1, label: "第01期", score: 95.0, note: "初登场即秒杀黄金题" },
      { episode: "E02", episodeNum: 2, label: "第02期", score: 95.5, note: "零冗余收敛" },
      { episode: "E03", episodeNum: 3, label: "第03期", score: 96.0, note: "逻辑完全无震荡" },
      { episode: "E04", episodeNum: 4, label: "第04期", score: 96.8, note: "首次钻石题一轮过" },
      { episode: "E05", episodeNum: 5, label: "第05期", score: 97.2, note: "全场唯一无需纠错" },
      { episode: "E06", episodeNum: 6, label: "第06期", score: 97.5, note: "钻石分水岭断层领跑" },
      { episode: "E07", episodeNum: 7, label: "第07期", score: 98.0, note: "极速排查隐藏悬挂指针" },
      { episode: "E08", episodeNum: 8, label: "第08期", score: 98.5, note: "王者线前哨战稳过" },
      { episode: "E09", episodeNum: 9, label: "第09期", score: 99.0, note: "王者绝壁全场唯一一轮秒杀" },
      { episode: "E10", episodeNum: 10, label: "第10期", score: 99.2, note: "持续秒杀不翻车" },
      { episode: "E11", episodeNum: 11, label: "第11期", score: 99.4, note: "碾压级代码生成" },
      { episode: "E12", episodeNum: 12, label: "第12期", score: 99.5, note: "终极封神，全关卡唯一全通" },
    ],
  },
  "grok-46": {
    modelId: "grok-46",
    modelName: "Grok 4.6",
    tier: "T1",
    color: "#fbbf24", // amber-400
    history: [
      { episode: "E01", episodeNum: 1, label: "第01期", score: 81.0, note: "初始版本" },
      { episode: "E02", episodeNum: 2, label: "第02期", score: 83.0, note: "黄金题稳定通过" },
      { episode: "E03", episodeNum: 3, label: "第03期", score: 84.5, note: "稍有代码冗余" },
      { episode: "E04", episodeNum: 4, label: "第04期", score: 86.0, note: "长思考模式生效" },
      { episode: "E05", episodeNum: 5, label: "第05期", score: 87.5, note: "钻石题两轮纠正" },
      { episode: "E06", episodeNum: 6, label: "第06期", score: 89.0, note: "突破钻石分水岭" },
      { episode: "E07", episodeNum: 7, label: "第07期", score: 90.0, note: "长考抗压表现强" },
      { episode: "E08", episodeNum: 8, label: "第08期", score: 91.0, note: "冲击王者线" },
      { episode: "E09", episodeNum: 9, label: "第09期", score: 92.5, note: "王者当时仅两家做对之一" },
      { episode: "E10", episodeNum: 10, label: "第10期", score: 92.0, note: "维持旗舰高水准" },
      { episode: "E11", episodeNum: 11, label: "第11期", score: 92.8, note: "王者线两轮过" },
      { episode: "E12", episodeNum: 12, label: "第12期", score: 93.0, note: "T1突围旗舰顶峰" },
    ],
  },
  "claude-fable-51": {
    modelId: "claude-fable-51",
    modelName: "Claude Fable 5.1",
    tier: "T1",
    color: "#f59e0b", // amber-500
    history: [
      { episode: "E01", episodeNum: 1, label: "第01期", score: 88.0, note: "起步基底极高" },
      { episode: "E02", episodeNum: 2, label: "第02期", score: 88.5, note: "黄金题轻松过" },
      { episode: "E03", episodeNum: 3, label: "第03期", score: 89.0, note: "代码风格最工整" },
      { episode: "E04", episodeNum: 4, label: "第04期", score: 89.5, note: "钻石题一到两轮" },
      { episode: "E05", episodeNum: 5, label: "第05期", score: 90.0, note: "稳定收敛" },
      { episode: "E06", episodeNum: 6, label: "第06期", score: 90.5, note: "钻石分水岭平稳通过" },
      { episode: "E07", episodeNum: 7, label: "第07期", score: 91.0, note: "对线 Astra 丝毫不怵" },
      { episode: "E08", episodeNum: 8, label: "第08期", score: 91.5, note: "钻石一轮对过" },
      { episode: "E09", episodeNum: 9, label: "第09期", score: 91.8, note: "王者题需三轮才能纠正" },
      { episode: "E10", episodeNum: 10, label: "第10期", score: 92.0, note: "高抗压能力" },
      { episode: "E11", episodeNum: 11, label: "第11期", score: 92.0, note: "综合表现极稳" },
      { episode: "E12", episodeNum: 12, label: "第12期", score: 92.0, note: "T1 稳健旗舰" },
    ],
  },
  "deepseek-v4-pro": {
    modelId: "deepseek-v4-pro",
    modelName: "DeepSeek V4 Pro",
    tier: "T1",
    color: "#60a5fa", // blue-400
    history: [
      { episode: "E01", episodeNum: 1, label: "第01期", score: 78.0, note: "早期版本" },
      { episode: "E02", episodeNum: 2, label: "第02期", score: 80.0, note: "黄金过审" },
      { episode: "E03", episodeNum: 3, label: "第03期", score: 82.0, note: "深度思考初露锋芒" },
      { episode: "E04", episodeNum: 4, label: "第04期", score: 83.5, note: "钻石题偶有卡住" },
      { episode: "E05", episodeNum: 5, label: "第05期", score: 84.0, note: "长思考抵抗幻觉" },
      { episode: "E06", episodeNum: 6, label: "第06期", score: 85.0, note: "钻石分水岭挣扎后过" },
      { episode: "E07", episodeNum: 7, label: "第07期", score: 86.0, note: "推理深度极深" },
      { episode: "E08", episodeNum: 8, label: "第08期", score: 87.0, note: "王者前哨展现潜力" },
      { episode: "E09", episodeNum: 9, label: "第09期", score: 88.5, note: "王者曾两轮做对入选" },
      { episode: "E10", episodeNum: 10, label: "第10期", score: 87.0, note: "钻石常卡住不稳定" },
      { episode: "E11", episodeNum: 11, label: "第11期", score: 88.0, note: "波动但在高位" },
      { episode: "E12", episodeNum: 12, label: "第12期", score: 88.0, note: "T1 后段主力" },
    ],
  },
  "deepseek-v41-flash": {
    modelId: "deepseek-v41-flash",
    modelName: "DeepSeek V4.1 Flash",
    tier: "T2",
    color: "#38bdf8", // sky-400
    history: [
      { episode: "E01", episodeNum: 1, label: "第01期", score: 70.0, note: "未上线/早期基线" },
      { episode: "E02", episodeNum: 2, label: "第02期", score: 72.0, note: "基准测试" },
      { episode: "E03", episodeNum: 3, label: "第03期", score: 73.5, note: "轻量模型试验" },
      { episode: "E04", episodeNum: 4, label: "第04期", score: 75.0, note: "黄金题快速过" },
      { episode: "E05", episodeNum: 5, label: "第05期", score: 76.0, note: "吞吐量初见端倪" },
      { episode: "E06", episodeNum: 6, label: "第06期", score: 77.5, note: "钻石卡住" },
      { episode: "E07", episodeNum: 7, label: "第07期", score: 79.0, note: "算法微调" },
      { episode: "E08", episodeNum: 8, label: "第08期", score: 80.5, note: "长思考开启" },
      { episode: "E09", episodeNum: 9, label: "第09期", score: 82.0, note: "王者虽未过但成本极低" },
      { episode: "E10", episodeNum: 10, label: "第10期", score: 84.5, note: "1.17亿词元一轮秒杀钻石！" },
      { episode: "E11", episodeNum: 11, label: "第11期", score: 84.0, note: "¥6.10 战果震惊弹幕" },
      { episode: "E12", episodeNum: 12, label: "第12期", score: 84.0, note: "T2 性价比断层王" },
    ],
  },
  "glm-53-flash": {
    modelId: "glm-53-flash",
    modelName: "GLM 5.3 Flash",
    tier: "T3",
    color: "#34d399", // emerald-400
    history: [
      { episode: "E01", episodeNum: 1, label: "第01期", score: 62.0, note: "黄金过" },
      { episode: "E02", episodeNum: 2, label: "第02期", score: 63.5, note: "低消耗初露锋芒" },
      { episode: "E03", episodeNum: 3, label: "第03期", score: 64.0, note: "黄金两轮过" },
      { episode: "E04", episodeNum: 4, label: "第04期", score: 65.5, note: "极度省流" },
      { episode: "E05", episodeNum: 5, label: "第05期", score: 66.0, note: "钻石折戟" },
      { episode: "E06", episodeNum: 6, label: "第06期", score: 67.0, note: "钻石题卡死" },
      { episode: "E07", episodeNum: 7, label: "第07期", score: 68.0, note: "单期仅消耗约¥2" },
      { episode: "E08", episodeNum: 8, label: "第08期", score: 68.5, note: "能效顶级但上限受限" },
      { episode: "E09", episodeNum: 9, label: "第09期", score: 68.0, note: "王者全灭" },
      { episode: "E10", episodeNum: 10, label: "第10期", score: 69.0, note: "3365万词元极限省流" },
      { episode: "E11", episodeNum: 11, label: "第11期", score: 68.5, note: "维持T3水平" },
      { episode: "E12", episodeNum: 12, label: "第12期", score: 69.0, note: "T3 实用省流榜样" },
    ],
  },
  "qwen-38-flash": {
    modelId: "qwen-38-flash",
    modelName: "Qwen 3.8 Flash",
    tier: "T3",
    color: "#10b981", // emerald-500
    history: [
      { episode: "E01", episodeNum: 1, label: "第01期", score: 60.0, note: "黄金稳过" },
      { episode: "E02", episodeNum: 2, label: "第02期", score: 61.5, note: "代码风格标准" },
      { episode: "E03", episodeNum: 3, label: "第03期", score: 63.0, note: "长考开始" },
      { episode: "E04", episodeNum: 4, label: "第04期", score: 64.0, note: "钻石题长考卡死" },
      { episode: "E05", episodeNum: 5, label: "第05期", score: 65.0, note: "长考消耗增加" },
      { episode: "E06", episodeNum: 6, label: "第06期", score: 65.5, note: "钻石分水岭未破" },
      { episode: "E07", episodeNum: 7, label: "第07期", score: 66.0, note: "长考近2小时" },
      { episode: "E08", episodeNum: 8, label: "第08期", score: 66.5, note: "思考充分但结果仍错" },
      { episode: "E09", episodeNum: 9, label: "第09期", score: 67.0, note: "未能突破王者线" },
      { episode: "E10", episodeNum: 10, label: "第10期", score: 67.0, note: "高算力但上限被卡" },
      { episode: "E11", episodeNum: 11, label: "第11期", score: 67.0, note: "保持稳定" },
      { episode: "E12", episodeNum: 12, label: "第12期", score: 67.0, note: "T3 沉浸长考平替" },
    ],
  },
  "gemini-38": {
    modelId: "gemini-38",
    modelName: "Gemini 3.8",
    tier: "T4",
    color: "#a1a1aa", // zinc-400
    history: [
      { episode: "E01", episodeNum: 1, label: "第01期", score: 48.0, note: "黄金题通过" },
      { episode: "E02", episodeNum: 2, label: "第02期", score: 47.0, note: "多模态强但代码排错弱" },
      { episode: "E03", episodeNum: 3, label: "第03期", score: 46.5, note: "恶劣工况下逻辑震荡" },
      { episode: "E04", episodeNum: 4, label: "第04期", score: 45.0, note: "钻石题翻车" },
      { episode: "E05", episodeNum: 5, label: "第05期", score: 46.0, note: "耗尽周额度" },
      { episode: "E06", episodeNum: 6, label: "第06期", score: 45.5, note: "钻石分水岭未收敛" },
      { episode: "E07", episodeNum: 7, label: "第07期", score: 45.0, note: "扣减37% Pro周配额" },
      { episode: "E08", episodeNum: 8, label: "第08期", score: 46.0, note: "王者绝壁全灭" },
      { episode: "E09", episodeNum: 9, label: "第09期", score: 46.0, note: "跨12期钻石王者从未对" },
      { episode: "E10", episodeNum: 10, label: "第10期", score: 45.0, note: "高额成本但产出受挫" },
      { episode: "E11", episodeNum: 11, label: "第11期", score: 46.0, note: "维持T4基座" },
      { episode: "E12", episodeNum: 12, label: "第12期", score: 46.0, note: "T4 恶劣工程代码折损" },
    ],
  },
  "opus-48": {
    modelId: "opus-48",
    modelName: "Opus 4.8",
    tier: "T4",
    color: "#71717a", // zinc-500
    history: [
      { episode: "E01", episodeNum: 1, label: "第01期", score: 47.0, note: "早期表现" },
      { episode: "E02", episodeNum: 2, label: "第02期", score: 46.0, note: "排错收敛慢" },
      { episode: "E03", episodeNum: 3, label: "第03期", score: 45.0, note: "出现死循环" },
      { episode: "E04", episodeNum: 4, label: "第04期", score: 44.0, note: "钻石卡住" },
      { episode: "E05", episodeNum: 5, label: "第05期", score: 44.5, note: "花费高昂" },
      { episode: "E06", episodeNum: 6, label: "第06期", score: 44.0, note: "钻石无法突破" },
      { episode: "E07", episodeNum: 7, label: "第07期", score: 43.5, note: "逻辑震荡未收敛" },
      { episode: "E08", episodeNum: 8, label: "第08期", score: 44.0, note: "王者题全灭" },
      { episode: "E09", episodeNum: 9, label: "第09期", score: 43.0, note: "严重翻车" },
      { episode: "E10", episodeNum: 10, label: "第10期", score: 44.0, note: "未见突破" },
      { episode: "E11", episodeNum: 11, label: "第11期", score: 44.0, note: "低效高成本" },
      { episode: "E12", episodeNum: 12, label: "第12期", score: 44.0, note: "T4 恶劣工况折损" },
    ],
  },
};
