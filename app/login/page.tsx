"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { User, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) {
      alert("Harap isi Nomor WhatsApp dan Password!");
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#1E293B] border border-[#334155] rounded-3xl p-6 md:p-8 shadow-2xl relative">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00A3FF] to-cyan-400 mx-auto flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-[#00A3FF]/20 mb-3">
              R
            </div>
            <h1 className="text-2xl font-black text-white">Selamat Datang!</h1>
            <p className="text-xs text-[#94A3B8] mt-1">
              Masuk ke akun REVO.id untuk menikmati kemudahan transaksi
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-[#94A3B8] block mb-1.5">
                Nomor WhatsApp / HP
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Contoh: 08123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-[#334155] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00A3FF] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#94A3B8] block mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-[#334155] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00A3FF] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#00A3FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-[#00A3FF]/25 flex items-center justify-center gap-2 mt-2"
            >
              Masuk Sekarang <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-xs text-center text-[#94A3B8] mt-6">
            Belum punya akun?{" "}
            <Link href="/register" className="text-[#00A3FF] font-bold hover:underline">
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}