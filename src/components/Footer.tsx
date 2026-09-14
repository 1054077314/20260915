import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="pt-8 pb-12 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center font-mono-code text-[11px] text-zinc-600 gap-3">
      <div>EPISODES 01–12 AUDIT · TOKEN就是词元</div>
      <div>基于公开弹幕时间轴与官方视频实测数据</div>
    </footer>
  );
};
