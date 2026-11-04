import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, Bell, HelpCircle, ChevronDown, ChevronRight, Calendar, CircleDollarSign, Box, Filter,
  Download, BarChart3, Boxes, TrendingUp, ArrowUpDown, Lightbulb, FileText, Info, ArrowDown,
  ArrowUp, Coins, Percent, AlertTriangle, Minus, Package, Target, ArrowRight, Calculator,
  BrickWall, Layers, Square, Package2,
} from "lucide-react";
import cimento from "@/assets/p-cimento.png";
import bims from "@/assets/p-bims.png";
import alci from "@/assets/p-alci.png";
import demir from "@/assets/p-demir.png";
import tugla from "@/assets/p-tugla.png";
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maliyet Analizleri | İnşaatÇevrem ERP" },
      { name: "description", content: "Ürün maliyetleri, kârlılık ve maliyet değişimlerini analiz edin." },
      { property: "og:title", content: "Maliyet Analizleri | İnşaatÇevrem ERP" },
      { property: "og:description", content: "Ürün maliyetleri, kârlılık ve maliyet değişimlerini analiz edin." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const chartData = [
  { m: "May", s: 290, c: 215, k: 75 },
  { m: "Haz", s: 335, c: 255, k: 80 },
  { m: "Tem", s: 335, c: 255, k: 80 },
  { m: "Ağu", s: 425, c: 310, k: 115 },
  { m: "Eyl", s: 470, c: 360, k: 140 },
  { m: "Eki", s: 500, c: 380, k: null as any },
];

const tl = (n: number) => "₺ " + n.toLocaleString("tr-TR");

const tabs = [
  { l: "Genel Bakış", i: BarChart3 }, { l: "Ürün Maliyetleri", i: Boxes },
  { l: "Kârlılık Analizi", i: TrendingUp }, { l: "Maliyet Değişimleri", i: ArrowUpDown },
  { l: "Akıllı Analizler", i: Lightbulb }, { l: "Hazır Raporlar", i: FileText },
];

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-xl border bg-card shadow-sm ${className}`}>{children}</div>;
}

function Dropdown({ icon: I, label }: { icon: any; label: string }) {
  return (
    <button className="flex h-10 items-center gap-2 whitespace-nowrap rounded-lg border bg-card px-4 text-sm font-medium text-ink hover:bg-muted">
      <I className="h-4 w-4" /> <span className="mr-3">{label}</span> <ChevronDown className="h-4 w-4" />
    </button>
  );
}

function ChartTip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const row = (c: string, l: string, v: string) => (
    <div className="flex items-center justify-between gap-6 py-0.5">
      <span className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${c}`} />{l}</span>
      <b className="font-semibold">{v}</b>
    </div>
  );
  return (
    <div className="w-52 rounded-lg border bg-card p-3 text-xs shadow-lg">
      <div className="mb-1 font-semibold">{d.m === "Eyl" ? "Eki" : d.m}</div>
      {row("bg-brand", "Net Satış:", tl(d.s * 1000))}
      {row("bg-warn", "Satış Maliyeti:", tl(d.c * 1000))}
      {row("bg-ok rounded-sm", "Brüt Kâr:", tl((d.s - d.c) * 1000))}
      <div className="flex justify-between py-0.5 pl-4"><span>Marj:</span><b>%{(((d.s - d.c) / d.s) * 100).toFixed(1).replace(".", ",")}</b></div>
    </div>
  );
}

function Index() {
  const [tab, setTab] = useState(0);
  const [cost, setCost] = useState("185,00");
  const [margin, setMargin] = useState("20");
  const [price, setPrice] = useState(231.25);
  const calc = () => {
    const c = parseFloat(cost.replace(",", ".")) || 0;
    const m = parseFloat(margin.replace(",", ".")) || 0;
    setPrice(m >= 100 ? 0 : c / (1 - m / 100));
  };

  return (
    <div className="min-h-screen bg-page">
      {/* Top bar */}
      <header className="flex h-[52px] items-center justify-between border-b bg-card px-10">
        <div className="flex h-10 w-[435px] items-center gap-3 bg-card rounded-lg border px-4 text-sm text-muted-foreground">
          <Search className="h-4 w-4 text-ink" />
          <input className="w-[200px] bg-transparent outline-none placeholder:text-muted-foreground" placeholder="Ürün, cari, fatura, sipariş ara..." />
          <span>(Ctrl + K)</span>
        </div>
        <div className="flex items-center gap-8">
          <div className="relative"><Bell className="h-5 w-5" /><span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-bad" /></div>
          <HelpCircle className="h-5 w-5" />
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-primary-foreground">MK</div>
            <div className="leading-tight"><div className="text-sm font-semibold">Mehmet Kartal</div><div className="text-xs text-muted-foreground">Yönetici</div></div>
            <ChevronDown className="ml-4 h-4 w-4" />
          </div>
        </div>
      </header>

      <main className="px-6 pb-4 pt-3">
        <div className="flex items-center gap-4 text-sm">
          <a className="font-medium text-brand">Raporlar</a><ChevronRight className="h-4 w-4 text-muted-foreground" /><span className="text-muted-foreground">Maliyet Analizleri</span>
        </div>
        <div className="mt-2 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[32px] font-bold leading-tight tracking-tight">Maliyet Analizleri</h1>
            <p className="whitespace-nowrap text-[15px] text-muted-foreground">Ürün maliyetleri, kârlılık ve maliyet değişimlerini analiz edin, hızlı karar verin.</p>
          </div>
          <div className="mt-2 flex shrink-0 gap-3">
            <Dropdown icon={Calendar} label="Son 30 Gün" />
            <Dropdown icon={CircleDollarSign} label="TRY" />
            <Dropdown icon={Box} label="Tüm Depolar" />
            <button className="flex h-10 items-center gap-2 rounded-lg border border-brand bg-card whitespace-nowrap px-7 text-sm font-semibold text-brand hover:bg-brand-soft"><Filter className="h-4 w-4" />Filtreler</button>
            <button className="flex h-10 items-center gap-2 whitespace-nowrap rounded-lg bg-brand px-5 text-sm font-semibold text-primary-foreground hover:opacity-90"><Download className="h-4 w-4" />Dışa Aktar<ChevronDown className="h-4 w-4" /></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 grid grid-cols-6 gap-1.5">
          {tabs.map((t, i) => (
            <button key={t.l} onClick={() => setTab(i)}
              className={`flex h-11 items-center justify-center gap-3 rounded-lg border text-[15px] font-semibold transition ${tab === i ? "border-brand bg-brand text-primary-foreground" : "bg-card text-ink hover:bg-muted"}`}>
              <t.i className="h-5 w-5" />{t.l}
            </button>
          ))}
        </div>

        {/* KPI cards */}
        <div className="mt-5 grid grid-cols-4 gap-4">
          {[
            { bg: "bg-brand-soft", ic: Boxes, icc: "text-brand", t: "Stok Maliyet Değeri", v: "₺ 2.480.000", s: "Önceki döneme göre", b: "-%1,8", bi: ArrowDown },
            { bg: "bg-ok-soft", ic: Coins, icc: "text-ok", t: "Satış Brüt Kârı", v: "₺ 386.000", s: "Önceki döneme göre", b: "+%8,4", bi: ArrowUp },
            { bg: "bg-violet-soft", ic: Percent, icc: "text-violet", t: "Brüt Kâr Marjı", v: "% 23,4", s: "Önceki dönem: %21,6", b: "+1,8 puan", bi: ArrowUp },
          ].map((k) => (
            <div key={k.t} className={`flex h-[122px] gap-4 rounded-xl border p-4 ${k.bg}`}>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-card/70"><k.ic className={`h-8 w-8 ${k.icc}`} /></div>
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 text-sm font-semibold">{k.t}<Info className="h-4 w-4" /></div>
                <div className="mt-1 text-[26px] font-bold">{k.v}</div>
                <div className="mt-1 flex items-center justify-between gap-2 whitespace-nowrap text-sm text-muted-foreground">{k.s}
                  <span className="flex items-center gap-1 shrink-0 whitespace-nowrap rounded-md bg-ok-soft px-2 py-0.5 text-sm font-semibold text-ok brightness-95"><k.bi className="h-4 w-4" />{k.b}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="flex h-[122px] cursor-pointer gap-4 rounded-xl border bg-warn-soft p-4 hover:brightness-[0.98]">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-card/70"><AlertTriangle className="h-8 w-8 text-warn" /></div>
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2 text-sm font-semibold">Maliyeti Artan Ürün<Info className="h-4 w-4" /></div>
              <div className="mt-1 text-[26px] font-bold">18</div>
              <div className="mt-1 text-sm text-muted-foreground">İncelenmesi gereken</div>
            </div>
            <ChevronRight className="mt-10 h-5 w-5 text-warn" />
          </div>
        </div>

        {/* Chart + Attention */}
        <div className="mt-4 grid grid-cols-[1fr_490px] gap-4">
          <Card className="p-5 pb-2">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold">Satış ve Maliyet Eğilimi <Info className="h-4 w-4" /></h2>
              <div className="flex gap-6 text-sm font-medium">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-brand" />Net Satış</span>
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-warn" />Satış Maliyeti</span>
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-ok" />Brüt Kâr</span>
              </div>
            </div>
            <div className="mt-2 h-[200px]">
              <ResponsiveContainer>
                <ComposedChart data={chartData} margin={{ left: -10, right: 50, top: 10 }}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "var(--ink)" }} />
                  <YAxis ticks={[0, 100, 200, 300, 400, 500, 600]} domain={[0, 600]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--ink)" }} tickFormatter={(v) => (v ? `${v} B` : "0")} />
                  <Tooltip content={<ChartTip />} cursor={{ stroke: "var(--muted-foreground)", strokeDasharray: "4 4" }} defaultIndex={4} position={{ y: 0 }} offset={20} allowEscapeViewBox={{ x: true }} />
                  <Bar dataKey="k" fill="var(--ok)" fillOpacity={0.35} barSize={58} radius={[3, 3, 0, 0]} />
                  <Line dataKey="c" stroke="var(--warn)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--warn)" }} activeDot={{ r: 5 }} />
                  <Line dataKey="s" stroke="var(--brand)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--brand)" }} activeDot={{ r: 6 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold">Dikkat Gerektiren Başlıklar <Info className="h-4 w-4" /></h2>
            <div className="mt-3 space-y-2">
              {[
                { bg: "bg-bad-soft border-bad/20", ic: <ArrowUp className="h-7 w-7 text-bad" />, t: "Maliyeti Yükselen Ürünler", d: "Son 30 günde maliyeti artan 18 ürün var.", cc: "text-bad" },
                { bg: "bg-amber-soft border-amber/30", ic: <Minus className="h-8 w-8 text-amber" />, t: "Düşük Marjlı Satışlar", d: "Brüt kâr marjı %10'un altında olan 12 ürün.", cc: "text-warn" },
                { bg: "bg-brand-soft border-brand/20", ic: <Package className="h-7 w-7 text-brand" />, t: "Maliyet Verisi Eksik Ürünler", d: "Analize dâhil edilemeyen 7 ürün.", cc: "text-brand" },
              ].map((a) => (
                <button key={a.t} className={`flex h-[56px] w-full items-center gap-4 rounded-lg border px-4 text-left hover:brightness-[0.98] ${a.bg}`}>
                  <span className="w-8">{a.ic}</span>
                  <span className="flex-1"><span className="block text-[15px] font-semibold">{a.t}</span><span className="block text-xs">{a.d}</span></span>
                  <ChevronRight className={`h-5 w-5 ${a.cc}`} />
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Tables */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold">En Çok Kazandıran Ürünler (Brüt Kâr) <Info className="h-4 w-4" /></h2>
              <a className="cursor-pointer text-sm font-medium text-brand">Tümünü Gör</a>
            </div>
            <table className="mt-3 w-full text-sm">
              <thead><tr className="border-b text-xs font-medium"><th className="pb-2 text-left font-medium">Ürün</th><th className="text-right font-medium">Net Satış (₺)</th><th className="text-right font-medium">Satış Maliyeti (₺)</th><th className="text-right font-medium">Brüt Kâr (₺)</th><th className="pr-6 text-right font-medium">Marj</th></tr></thead>
              <tbody>
                {[
                  [cimento, "Çimento 50 kg", 420000, 315000, 105000, "%25,0"],
                  [bims, "Bims 20'lik", 180000, 129000, 51000, "%28,3"],
                  [alci, "Alçı Plaka 12,5 mm", 96000, 68000, 28000, "%29,2"],
                ].map(([I, n, a, b, c, m]: any) => (
                  <tr key={n} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-2"><span className="flex items-center gap-3"><img src={I} alt={n} className="h-8 w-10 object-contain" />{n}</span></td>
                    <td className="text-right">{tl(a)}</td><td className="text-right">{tl(b)}</td><td className="text-right">{tl(c)}</td>
                    <td className="text-right"><span className="inline-block rounded-md bg-ok-soft px-4 py-1 font-semibold text-ok">{m}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold">En Çok Maliyeti Artan Ürünler <Info className="h-4 w-4" /></h2>
              <a className="cursor-pointer text-sm font-medium text-brand">Tümünü Gör</a>
            </div>
            <table className="mt-3 w-full text-sm">
              <thead><tr className="border-b text-xs"><th className="pb-2 text-left font-medium">Ürün</th><th className="text-right font-medium">Önceki Maliyet</th><th className="text-right font-medium">Güncel Maliyet</th><th className="text-center font-medium">Değişim</th><th className="font-medium">Etki</th></tr></thead>
              <tbody>
                {[
                  [cimento, "Çimento 50 kg", "₺ 165,00", "₺ 185,00", "+%12,1"],
                  [demir, "Demir Ø12", "₺ 22,50", "₺ 24,70", "+%9,8"],
                  [tugla, "Tuğla 19'luk", "₺ 8,90", "₺ 9,60", "+%7,9"],
                ].map(([I, n, a, b, c]: any) => (
                  <tr key={n} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-2"><span className="flex items-center gap-3"><img src={I} alt={n} className="h-8 w-10 object-contain" />{n}</span></td>
                    <td className="text-right">{a}</td><td className="text-right">{b}</td>
                    <td className="text-center"><span className="inline-block rounded-md bg-bad-soft px-4 py-1 font-semibold text-bad">{c}</span></td>
                    <td><BarChart3 className="mx-auto h-5 w-5 text-brand" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Quick calc */}
        <Card className="mt-4 flex items-center gap-6 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft"><Target className="h-7 w-7 text-brand" /></div>
          <div className="w-[400px]"><div className="text-[17px] font-bold">Hızlı Hesaplama: Hedef Satış Fiyatı</div><div className="text-xs">Bir ürün için hedef kâr marjına göre önerilen satış fiyatını hesaplayın.</div></div>
          <label className="text-xs">Ürün Seçin
            <select className="mt-1 block h-10 w-[188px] rounded-lg border bg-card px-3 text-sm"><option>Çimento 50 kg</option><option>Bims 20'lik</option><option>Demir Ø12</option></select>
          </label>
          <label className="text-xs">Birim Maliyet (₺)
            <input value={cost} onChange={(e) => setCost(e.target.value)} className="mt-1 block h-10 w-[142px] rounded-lg border bg-card px-3 text-sm" />
          </label>
          <label className="text-xs">Hedef Marj (%)
            <span className="mt-1 flex h-10 w-[128px] items-center rounded-lg border bg-card px-3 text-sm">%&nbsp;<input value={margin} onChange={(e) => setMargin(e.target.value)} className="w-full outline-none" /></span>
          </label>
          <ArrowRight className="mt-4 h-5 w-5 text-brand" />
          <div className="text-sm font-semibold text-ok">Önerilen Satış Fiyatı
            <div className="mt-1 flex h-10 w-[160px] items-center rounded-lg bg-ok-soft px-3 text-2xl font-bold">₺ {price.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <button onClick={calc} className="ml-auto flex h-10 w-[146px] items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold text-primary-foreground hover:opacity-90"><Calculator className="h-4 w-4" />Hesapla</button>
        </Card>
      </main>
    </div>
  );
}
