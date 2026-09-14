import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="pt-12 pb-8 border-t border-white/[0.08] flex flex-col md:flex-row justify-between items-center font-mono-code text-xs text-zinc-500 gap-4">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
        <span>PROPRIETARY BENCHMARK AUDIT · EPISODES 01–12 CONSOLIDATED</span>
      </div>
      <div className="text-zinc-600 text-center md:text-right">
        数据源自 B 站「Token就是词元」公开视频实测、弹幕交叉时间轴及官方成本账单
      </div>
    </footer>
  );
};
