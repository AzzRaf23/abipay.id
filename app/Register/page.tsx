"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { User, Lock, Phone, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !password) {
      alert("Harap lengkapi seluruh formulir pendaftaran!");
      return;
    }
    alert("Pendaftaran Berhasil! Silakan masuk ke akun kamu.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#1E293B] border border-[#334155] rounded-3xl p-6 md:p-8 shadow-2xl relative">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-white">Buat Akun REVO.id</h1>
            <p className="text-xs text-[#94A3B8] mt-1">
              Dapatkan cashback & harga top up member terjangkau
            </p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-[#94A3B8] block mb-1.5">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Contoh: Alexander"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-[#334155] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00A3FF] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#94A3B8] block mb-1.5">
                Nomor WhatsApp
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
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
                  placeholder="Minimal 6 Karakter"
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
              Daftar Sekarang <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-xs text-center text-[#94A3B8] mt-6">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-[#00A3FF] font-bold hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}