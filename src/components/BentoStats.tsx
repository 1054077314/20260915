import React from "react";
import { Zap, Coins, ShieldCheck, Skull } from "lucide-react";

interface BentoStatsProps {
  onSelectHighlight: (type: "ASTRA" | "DS_FLASH" | "DIAMOND" | "KING") => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const BentoStats: React.FC<BentoStatsProps> = ({
  onSelectHighlight,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] border border-white/[0.08] rounded-xl overflow-hidden mb-16 sm:mb-20">
      {/* Card 1: GPT-6 Astra */}
      <div
        onClick={() => onSelectHighlight("ASTRA")}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="bg-[#050505] p-7 flex flex-col justify-between group hover:bg-[#0a0a10] transition-colors cursor-pointer"
      >
        <div>
          <div className="font-mono-code text-xs text-zinc-500 tracking-widest uppercase mb-4 flex items-center justify-between">
            <span className="text-rose-400/90 font-medium">ABSOLUTE T0</span>
            <Zap className="w-3.5 h-3.5 text-zinc-600 group-hover:text-rose-400 transition-colors" />
          </div>
          <div className="font-serif-title text-3xl sm:text-4xl text-white mb-2">
            GPT-6 Astra
          </div>
        </div>
        <div className="border-t border-white/[0.06] pt-4 mt-6">
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            黄金 / 钻石 / 王者三轮全<strong className="text-white font-medium">一轮秒杀</strong>，12 期断层第一成立。
          </p>
          <span className="inline-block mt-3 text-[11px] font-mono-code text-rose-400/80 group-hover:text-rose-300">
            点击定位模型详情 →
          </span>
        </div>
      </div>

      {/* Card 2: DS V4.1 Flash */}
      <div
        onClick={() => onSelectHighlight("DS_FLASH")}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="bg-[#050505] p-7 flex flex-col justify-between group hover:bg-[#0a0a10] transition-colors cursor-pointer"
      >
        <div>
          <div className="font-mono-code text-xs text-zinc-500 tracking-widest uppercase mb-4 flex items-center justify-between">
            <span className="text-emerald-400/90 font-medium">VALUE KING</span>
            <Coins className="w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
          </div>
          <div className="font-serif-title text-3xl sm:text-4xl text-emerald-400 mb-2">
            ¥6.10 实付
          </div>
        </div>
        <div className="border-t border-white/[0.06] pt-4 mt-6">
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            <strong className="text-white font-medium">DS V4.1 Flash</strong> 狂烧 1.17 亿词元，以极低总价一轮秒杀钻石线。
          </p>
          <span className="inline-block mt-3 text-[11px] font-mono-code text-emerald-400/80 group-hover:text-emerald-300">
            查看性价比实测账单 →
          </span>
        </div>
      </div>

      {/* Card 3: 钻石线 */}
      <div
        onClick={() => onSelectHighlight("DIAMOND")}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="bg-[#050505] p-7 flex flex-col justify-between group hover:bg-[#0a0a10] transition-colors cursor-pointer"
      >
        <div>
          <div className="font-mono-code text-xs text-zinc-500 tracking-widest uppercase mb-4 flex items-center justify-between">
            <span className="text-amber-400/90 font-medium">WATERSHED</span>
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-600 group-hover:text-amber-400 transition-colors" />
          </div>
          <div className="font-serif-title text-3xl sm:text-4xl text-white mb-2">
            钻石分水岭
          </div>
        </div>
        <div className="border-t border-white/[0.06] pt-4 mt-6">
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            仅 <strong className="text-amber-300 font-medium">36.4%</strong> 存活率；Flash 级大半卡死于此，Gemini 12 期从未做对。
          </p>
          <span className="inline-block mt-3 text-[11px] font-mono-code text-amber-400/80 group-hover:text-amber-300">
            按钻石线筛选模型 →
          </span>
        </div>
      </div>

      {/* Card 4: 王者级 */}
      <div
        onClick={() => onSelectHighlight("KING")}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="bg-[#050505] p-7 flex flex-col justify-between group hover:bg-[#0a0a10] transition-colors cursor-pointer"
      >
        <div>
          <div className="font-mono-code text-xs text-zinc-500 tracking-widest uppercase mb-4 flex items-center justify-between">
            <span className="text-rose-500/90 font-medium">FLAGSHIP GRAVE</span>
            <Skull className="w-3.5 h-3.5 text-zinc-600 group-hover:text-rose-500 transition-colors" />
          </div>
          <div className="font-serif-title text-3xl sm:text-4xl text-rose-400 mb-2">
            王者绝壁
          </div>
        </div>
        <div className="border-t border-white/[0.06] pt-4 mt-6">
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            Flash 级全灭；仅 Astra 一轮秒过，Grok 4.6 与 DS V4 Pro 曾两轮答对。
          </p>
          <span className="inline-block mt-3 text-[11px] font-mono-code text-rose-400/80 group-hover:text-rose-300">
            查看王者通关旗舰 →
          </span>
        </div>
      </div>
    </section>
  );
};
