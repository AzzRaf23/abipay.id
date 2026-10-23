"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LayoutGrid, Menu, X, Search } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#0B0F17]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">
                REVO<span className="text-blue-500">.id</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/cek-transaksi"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <Search className="w-4 h-4 text-emerald-400" /> Lacak Pesanan
            </Link>
            <Link
              href="/showcase"
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <LayoutGrid className="w-4 h-4 text-blue-400" /> Showcase
            </Link>
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/Register"
              className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
            >
              Daftar
            </Link>
          </div>

          {/* Mobile Right Action */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/cek-transaksi"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg"
            >
              <Search className="w-3.5 h-3.5" /> Lacak
            </Link>
            <Link
              href="/showcase"
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-lg"
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Showcase
            </Link>

            {/* Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0B0F17] px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/cek-transaksi"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <Search className="w-4 h-4 text-emerald-400" /> Lacak Pesanan
          </Link>
          <Link
            href="/showcase"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <LayoutGrid className="w-4 h-4 text-blue-400" /> Showcase Template
          </Link>
          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
          >
            Masuk
          </Link>
          <Link
            href="/Register"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-center w-full py-2.5 text-xs font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all shadow-lg"
          >
            Daftar
          </Link>
        </div>
      )}
    </nav>
  );
}