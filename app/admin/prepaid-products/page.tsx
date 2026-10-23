"use client";

import { useState, useEffect } from "react";

interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  brand: string;
  buyPrice: number;
  markupPrice: number;
  sellPrice: number;
  serverStatus: string;
}

export default function AdminPrepaidProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("SEMUA");
  const [loading, setLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const [markupValue, setMarkupValue] = useState(500);

  // Filter pilihan Brand persis sesuai Homepage Abipay.id
  const homepageBrands = [
    "SEMUA",
    "Mobile Legends",
    "Free Fire",
    "Valorant",
    "PUBG Mobile",
    "Genshin Impact",
    "Honkai: Star Rail",
    "EA SPORTS FC Mobile",
    "Honor of Kings",
    "Roblox",
    "Telkomsel",
    "XL Axiata",
    "Tri",
    "Smartfren",
    "PLN",
    "DANA",
    "OVO",
    "GoPay",
    "ShopeePay",
    "Steam Wallet",
    "Google Play",
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.data || []);
      }
    } catch (err) {
      console.error("Gagal load produk Abipay:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSync = async () => {
    setSyncLoading(true);
    try {
      const res = await fetch("/api/admin/products/sync", { method: "POST" });
      const data = await res.json();
      alert(data.message || "Sync produk Abipay.id berhasil!");
      fetchProducts();
    } catch (err: any) {
      alert("Gagal sync: " + err.message);
    } finally {
      setSyncLoading(false);
    }
  };

  const handleBulkMarkup = async () => {
    if (!confirm(`Yakin ingin mengubah markup untuk brand ${selectedBrand} menjadi Rp ${markupValue}?`)) return;

    try {
      const res = await fetch("/api/admin/products/bulk-markup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: selectedBrand === "SEMUA" ? null : selectedBrand,
          markupPrice: Number(markupValue),
        }),
      });
      const data = await res.json();
      alert(data.message || "Bulk markup berhasil diperbarui!");
      fetchProducts();
    } catch (err: any) {
      alert("Gagal update markup: " + err.message);
    }
  };

  const filteredProducts = products.filter((item) => {
    const matchBrand = selectedBrand === "SEMUA" || item.brand === selectedBrand;
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase());
    return matchBrand && matchSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 text-white p-6 rounded-xl shadow-md border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Abipay.id — Kelola Produk PPOB</h1>
          <p className="text-slate-400 text-sm mt-1">
            Atur harga jual & sinkronkan produk Tripay dengan 20 Brand Homepage
          </p>
        </div>
        <button
          onClick={handleSync}
          disabled={syncLoading}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition disabled:opacity-50"
        >
          {syncLoading ? "Mapping Data..." : "Force Update & Mapping"}
        </button>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm text-white">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">CARI PRODUK</label>
          <input
            type="text"
            placeholder="Cari kode atau nama..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2 flex flex-col md:flex-row items-end gap-3">
          <div className="w-full md:w-1/2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">BULK MARKUP (RP)</label>
            <input
              type="number"
              value={markupValue}
              onChange={(e) => setMarkupValue(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleBulkMarkup}
            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Terapkan Markup ({selectedBrand})
          </button>
        </div>
      </div>

      {/* Brand Pills Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {homepageBrands.map((b) => (
          <button
            key={b}
            onClick={() => setSelectedBrand(b)}
            className={`px-4 py-2 text-xs font-bold rounded-full whitespace-nowrap transition ${
              selectedBrand === b
                ? "bg-blue-600 text-white shadow"
                : "bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Table Products */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-sm overflow-hidden text-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-950 text-slate-400 uppercase text-xs font-bold border-b border-slate-800">
              <tr>
                <th className="p-4">Kode</th>
                <th className="p-4">Nama Produk</th>
                <th className="p-4">Brand (Homepage)</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Harga Modal</th>
                <th className="p-4">Markup</th>
                <th className="p-4">Harga Jual</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center p-8 text-slate-500">
                    Memuat data...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center p-8 text-slate-500">
                    Tidak ada produk. Klik &quot;Force Update & Mapping&quot; untuk mengelompokkan data.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((item) => (
                  <tr key={item.code} className="hover:bg-slate-800/50 transition">
                    <td className="p-4 font-mono font-bold text-white">{item.code}</td>
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4 text-xs font-bold text-blue-400">{item.brand}</td>
                    <td className="p-4 text-xs text-slate-400">{item.category}</td>
                    <td className="p-4">Rp {item.buyPrice.toLocaleString("id-ID")}</td>
                    <td className="p-4 text-emerald-400 font-semibold">+Rp {item.markupPrice.toLocaleString("id-ID")}</td>
                    <td className="p-4 font-bold text-white">Rp {item.sellPrice.toLocaleString("id-ID")}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                          item.serverStatus === "Tersedia"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : "bg-rose-950 text-rose-400 border border-rose-800"
                        }`}
                      >
                        {item.serverStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}