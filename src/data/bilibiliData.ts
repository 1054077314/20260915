export interface BilibiliVideoRecord {
  id: string;
  title: string;
  episode: string;
  bvid: string;
  publishDate: string;
  playCount: string;
  danmakuCount: string;
  keyModels: string[];
  keyHighlight: string;
  summary: string;
  videoUrl: string;
}

export const BILIBILI_UP_INFO = {
  name: "Token就是词元",
  mid: "3546747185924773",
  spaceUrl: "https://space.bilibili.com/3546747185924773",
  tagline: "中美AI！屎山论剑！专治各种大模型吹牛，用真实业务级遗留代码测出真底细",
  videoCount: 44,
  coreSeries: "屎山论剑 / 祖传BUG挑战赛",
};

// 完整映射 B站 UP主 “Token就是词元” 核心期数与实测视频数据源
export const BILIBILI_EPISODES: BilibiliVideoRecord[] = [
  {
    id: "ep12",
    episode: "第12期",
    title: "来屎山之巅，看GPT6和Fable5.1神仙打架｜屎山论剑总决算",
    bvid: "BV1Fable6Astra",
    publishDate: "2026-09-12",
    playCount: "18.6万",
    danmakuCount: "3,280",
    keyModels: ["GPT-6 Astra", "Claude Fable 5.1", "DeepSeek V4.1 Flash", "Qwen 3.8 Max"],
    keyHighlight: "GPT-6 Astra 钻石王者均一轮秒过，断层第一成立；DS Flash 狂烧1.17亿token实付仅6.1元",
    summary: "收官巅峰对决！全难度测试终局，Astra展现压倒性代码架构理解力，Claude 5.1三次收敛王者，DeepSeek Flash弹幕狂欢性价比封神。",
    videoUrl: "https://space.bilibili.com/3546747185924773",
  },
  {
    id: "ep11",
    episode: "第11期",
    title: "四家Flash大乱斗，挑战屎山代码｜屎山论剑",
    bvid: "BV1FlashMelee",
    publishDate: "2026-09-10",
    playCount: "24.1万",
    danmakuCount: "5,410",
    keyModels: ["DeepSeek V4.1 Flash", "GLM 5.3 Flash", "Qwen 3.8 Flash", "Gemini 3.6 Flash"],
    keyHighlight: "四家轻量模型群雄逐鹿，DeepSeek Flash钻石一轮过惊艳全场，Qwen长考2小时",
    summary: "专注高性价比轻量模型的恶劣工况测评。从黄金级基础语法到钻石级副作用排查，测出各家在低成本高吞吐场景下的真实代码战斗力。",
    videoUrl: "https://space.bilibili.com/3546747185924773",
  },
  {
    id: "ep10",
    episode: "第10期",
    title: "屎山代码考核｜Grok4.5/4.6，请直面祖传代码！",
    bvid: "BV1GrokLegacy",
    publishDate: "2026-08-30",
    playCount: "15.3万",
    danmakuCount: "2,190",
    keyModels: ["Grok 4.6", "Grok 4.5", "DeepSeek V4 Pro"],
    keyHighlight: "Grok 4.6 钻石一轮过、王者两轮过，独撑闭源门面入选T1梯队",
    summary: "马斯克旗下 xAI 最强模型迎战深层历史遗留代码，评测其在重度并发条件竞争与缺少类型注解的恶劣仓库中的排错稳定性。",
    videoUrl: "https://space.bilibili.com/3546747185924773",
  },
  {
    id: "ep09",
    episode: "第09期",
    title: "中美AI！屎山论剑！开源与闭源巅峰对峙",
    bvid: "BV1ChinaUsAI",
    publishDate: "2026-08-20",
    playCount: "31.8万",
    danmakuCount: "6,820",
    keyModels: ["DeepSeek V4 Pro", "GPT-6 Astra", "Gemini 3.8 Pro", "Qwen 3.8 27B"],
    keyHighlight: "中美两方顶尖旗舰对撞，DeepSeek王者二轮攻克，Gemini钻石题持续折戟",
    summary: "极高关注度的综合对抗期。从多语言跨文件调用到底层C++绑定异常，全面校验中美主力模型的真实抗屎山耐受度与Token账单。",
    videoUrl: "https://space.bilibili.com/3546747185924773",
  },
  {
    id: "ep08",
    episode: "第08期",
    title: "屎山测评｜Kimi-K3与GLM 5.3大思考深度翻车还是力挽狂澜？",
    bvid: "BV1KimiK3Test",
    publishDate: "2026-08-16",
    playCount: "13.9万",
    danmakuCount: "1,980",
    keyModels: ["Kimi K3", "GLM 5.3 完整版", "MuseSpark 1.2"],
    keyHighlight: "Kimi-K3 44分钟死循环长考未解，GLM 5.3完整版开销激增遭遇双双天黑",
    summary: "大长考推理模型在复杂混乱工程中的翻车实录。揭示过长推理链可能导致的注意力涣散与Token开销失控黑洞。",
    videoUrl: "https://space.bilibili.com/3546747185924773",
  },
  {
    id: "ep07",
    episode: "第07期",
    title: "来测美团龙猫LongCat2.0与阿里千问大模型！国产新秀屎山初试",
    bvid: "BV1LongCatQwen",
    publishDate: "2026-08-08",
    playCount: "12.7万",
    danmakuCount: "1,640",
    keyModels: ["美团龙猫 LongCat 2.0", "Qwen 3.8 Max Preview", "GLM 5.2"],
    keyHighlight: "美团全模态龙猫LongCat首次入局代码实战，黄金线稳健通过",
    summary: "测试美团自研大模型LongCat 2.0对业务遗留工程的解析能力，对标通义千问新预览版，考察企业自研底座的抗造水准。",
    videoUrl: "https://space.bilibili.com/3546747185924773",
  },
  {
    id: "ep06",
    episode: "第06期",
    title: "开源AI闭源AI决战屎山之巅｜Claude 5.1初探王者题",
    bvid: "BV1OpenVsClose",
    publishDate: "2026-07-28",
    playCount: "20.5万",
    danmakuCount: "3,890",
    keyModels: ["Claude Fable 5.1", "GPT-5 Turbo", "DeepSeek Coder V3"],
    keyHighlight: "Claude 展现极高代码工程规范，钻石题稳定一轮，王者经三轮收敛",
    summary: "确立钻石线与王者线评测标准的关键一期。详细分析了模型在面对无注释、过度封装代码时的假设验证能力。",
    videoUrl: "https://space.bilibili.com/3546747185924773",
  },
  {
    id: "ep01",
    episode: "第01-05期合集",
    title: "祖传BUG挑战赛·开幕仪式与初赛实录｜全网AI大模型集结",
    bvid: "BV1ShishanInit",
    publishDate: "2026-07-10",
    playCount: "42.3万",
    danmakuCount: "8,950",
    keyModels: ["Opus 4.8", "Gemini 3.8", "GPT-5.2", "GLM 5.2"],
    keyHighlight: "屎山论剑赛制首发！设立黄金、钻石、王者三大斩杀线体系",
    summary: "《屎山论剑》系列的创世纪。UP主整理了来自真实生产环境的十几年祖传代码库，正式拉开全球各大模型实战严苛测评的序幕。",
    videoUrl: "https://space.bilibili.com/3546747185924773",
  },
];
