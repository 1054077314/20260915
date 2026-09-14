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
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] border border-white/[0.08] rounded-xl overflow-hidden mb-12 sm:mb-16">
      {/* Card 1: GPT-6 Astra */}
      <div
        onClick={() => onSelectHighlight("ASTRA")}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="bg-[#050505] p-5 sm:p-6 flex flex-col justify-between group hover:bg-[#0c0c12] transition-colors cursor-pointer"
      >
        <div>
          <div className="font-mono-code text-[11px] text-zinc-500 tracking-wider uppercase mb-3 flex items-center justify-between">
            <span className="text-rose-400 font-medium">ABSOLUTE T0</span>
            <Zap className="w-3.5 h-3.5 text-zinc-600 group-hover:text-rose-400 transition-colors" />
          </div>
          <div className="font-serif-title text-2xl sm:text-3xl text-white mb-1">
            GPT-6 Astra
          </div>
        </div>
        <p className="text-xs text-zinc-400 font-light border-t border-white/[0.06] pt-3 mt-4">
          黄金 / 钻石 / 王者全<strong className="text-white">一轮秒杀</strong>，全场唯一断层第一。
        </p>
      </div>

      {/* Card 2: DS V4.1 Flash */}
      <div
        onClick={() => onSelectHighlight("DS_FLASH")}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="bg-[#050505] p-5 sm:p-6 flex flex-col justify-between group hover:bg-[#0c0c12] transition-colors cursor-pointer"
      >
        <div>
          <div className="font-mono-code text-[11px] text-zinc-500 tracking-wider uppercase mb-3 flex items-center justify-between">
            <span className="text-emerald-400 font-medium">VALUE KING</span>
            <Coins className="w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
          </div>
          <div className="font-serif-title text-2xl sm:text-3xl text-emerald-400 mb-1">
            ¥6.10
          </div>
        </div>
        <p className="text-xs text-zinc-400 font-light border-t border-white/[0.06] pt-3 mt-4">
          狂烧 1.17 亿词元，极低总价<strong className="text-white">一轮秒杀钻石</strong>。
        </p>
      </div>

      {/* Card 3: 钻石分水岭 */}
      <div
        onClick={() => onSelectHighlight("DIAMOND")}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="bg-[#050505] p-5 sm:p-6 flex flex-col justify-between group hover:bg-[#0c0c12] transition-colors cursor-pointer"
      >
        <div>
          <div className="font-mono-code text-[11px] text-zinc-500 tracking-wider uppercase mb-3 flex items-center justify-between">
            <span className="text-amber-400 font-medium">WATERSHED</span>
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-600 group-hover:text-amber-400 transition-colors" />
          </div>
          <div className="font-serif-title text-2xl sm:text-3xl text-white mb-1">
            钻石分水岭
          </div>
        </div>
        <p className="text-xs text-zinc-400 font-light border-t border-white/[0.06] pt-3 mt-4">
          仅 <strong className="text-amber-300">36%</strong> 存活率；Flash 大半卡死，Gemini 12 期未做对。
        </p>
      </div>

      {/* Card 4: 王者级 */}
      <div
        onClick={() => onSelectHighlight("KING")}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="bg-[#050505] p-5 sm:p-6 flex flex-col justify-between group hover:bg-[#0c0c12] transition-colors cursor-pointer"
      >
        <div>
          <div className="font-mono-code text-[11px] text-zinc-500 tracking-wider uppercase mb-3 flex items-center justify-between">
            <span className="text-rose-500 font-medium">FLAGSHIP GRAVE</span>
            <Skull className="w-3.5 h-3.5 text-zinc-600 group-hover:text-rose-500 transition-colors" />
          </div>
          <div className="font-serif-title text-2xl sm:text-3xl text-rose-400 mb-1">
            王者绝壁
          </div>
        </div>
        <p className="text-xs text-zinc-400 font-light border-t border-white/[0.06] pt-3 mt-4">
          Flash 级全灭；仅 Astra 一轮秒过，Grok / V4 Pro 曾两轮解出。
        </p>
      </div>
    </section>
  );
};
