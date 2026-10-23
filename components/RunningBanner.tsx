"use client";

import React from "react";
import { Megaphone } from "lucide-react";

export default function RunningBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-b border-blue-500/30 text-white text-xs py-2 px-4 flex items-center overflow-hidden">
      <div className="flex items-center gap-2 bg-blue-600 px-2.5 py-0.5 rounded-md font-bold text-[10px] shrink-0 mr-3 shadow-sm">
        <Megaphone className="w-3 h-3" /> INFO
      </div>
      <marquee className="font-medium text-slate-200">
        🔥 PROMO TOP UP MLBB & FREE FIRE DEPOSIT QRIS BEBAS BIAYA ADMIN! PROSES INSTAN 24 JAM NON-STOP DENGAN ABIPAY.ID! 🔥
      </marquee>
    </div>
  );
}