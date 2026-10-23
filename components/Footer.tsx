"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, PhoneCall, ShieldCheck, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B0F17] border-t border-[#1E293B] text-[#94A3B8] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* KOLOM 1: LOGO FULL DARK & BRANDING */}
        <div className="md:col-span-1 flex flex-col gap-3">
          <img
            src="/images/revo-logo-full.png"
            alt="REVO.id All-in-One Selling Platform"
            className="h-10 md:h-12 w-auto object-contain self-start filter drop-shadow-md"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          <p className="text-xs leading-relaxed mt-1">
            Platform master top up game dan produk digital PPOB terpercaya di Indonesia. Transaksi otomatis 24/7 dengan garansi layanan instan.
          </p>
        </div>

        {/* KOLOM 2: NAVIGASI CEPAT */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            Navigasi Produk
          </h4>
          <ul className="flex flex-col gap-2 text-xs">
            <li>
              <Link href="/order/mlbb" className="hover:text-[#00A3FF] transition-colors">
                Mobile Legends
              </Link>
            </li>
            <li>
              <Link href="/order/ff" className="hover:text-[#00A3FF] transition-colors">
                Free Fire
              </Link>
            </li>
            <li>
              <Link href="/order/pln" className="hover:text-[#00A3FF] transition-colors">
                Token PLN & Listrik
              </Link>
            </li>
            <li>
              <Link href="/showcase" className="hover:text-[#00A3FF] transition-colors">
                Showcase Template
              </Link>
            </li>
          </ul>
        </div>

        {/* KOLOM 3: DUKUNGAN & BANTUAN */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            Pusat Bantuan
          </h4>
          <ul className="flex flex-col gap-2 text-xs">
            <li>
              <Link
                href="/support/faq"
                className="hover:text-[#00A3FF] transition-colors flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5" /> Pertanyaan FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/support/contact"
                className="hover:text-[#00A3FF] transition-colors flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Hubungi CS WhatsApp
              </Link>
            </li>
            <li>
              <Link
                href="/support/terms"
                className="hover:text-[#00A3FF] transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" /> Syarat & Ketentuan
              </Link>
            </li>
            <li>
              <Link
                href="/support/privacy"
                className="hover:text-[#00A3FF] transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Kebijakan Privasi
              </Link>
            </li>
          </ul>
        </div>

        {/* KOLOM 4: METODE PEMBAYARAN */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            Pembayaran Aman
          </h4>
          <p className="text-xs mb-3">
            Mendukung QRIS all payment, E-Wallet (DANA, GoPay, OVO), dan Transfer Bank.
          </p>
          <div className="flex flex-wrap gap-2 text-[10px] font-bold text-white">
            <span className="bg-[#1E293B] border border-[#334155] px-2.5 py-1 rounded-md">
              QRIS
            </span>
            <span className="bg-[#1E293B] border border-[#334155] px-2.5 py-1 rounded-md">
              DANA
            </span>
            <span className="bg-[#1E293B] border border-[#334155] px-2.5 py-1 rounded-md">
              GOPAY
            </span>
            <span className="bg-[#1E293B] border border-[#334155] px-2.5 py-1 rounded-md">
              OVO
            </span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>© 2026 REVO.id. All rights reserved.</p>
        <p className="text-[11px] text-[#94A3B8]">
          Developed with Next.js App Router & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}