import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { CATEGORIES, COLOR_SWATCHES, PRODUCTS, Color } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";

const WIDTHS = [12, 19, 25, 30, 38, 48, 50, 75];
const LENGTHS = [10, 25, 30, 50, 66, 100, 150, 200];
const GLUES = ["Hot-melt", "Акриловий", "Каучуковий"];
const BRANDS = ["Mustang", "UNIBOB", "3M Scotch", "Tesa"];

export default function Catalog() {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase() || "";
  const initialColor = searchParams.get("color") as Color | null;

  const cat = CATEGORIES.find(c => c.slug === categorySlug);
  const [brand, setBrand] = useState<string[]>([]);
  const [colors, setColors] = useState<Color[]>(initialColor ? [initialColor] : []);
  const [width, setWidth] = useState<number[]>([]);
  const [length, setLength] = useState<number[]>([]);
  const [glue, setGlue] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = <T,>(arr: T[], v: T, set: (x: T[]) => void) =>
    set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  const products = useMemo(() => {
    let list = PRODUCTS.slice();
    if (cat) list = list.filter(p => p.category === cat.slug);
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    if (brand.length) list = list.filter(p => brand.includes(p.brand));
    if (colors.length) list = list.filter(p => colors.includes(p.color));
    if (width.length) list = list.filter(p => width.includes(p.width));
    if (length.length) list = list.filter(p => length.includes(p.length));
    if (glue.length) list = list.filter(p => p.glue && glue.includes(p.glue));
    list = list.filter(p => p.price <= maxPrice);
    if (inStockOnly) list = list.filter(p => p.stock > 0);
    switch (sort) {
      case "cheap": list.sort((a, b) => a.price - b.price); break;
      case "expensive": list.sort((a, b) => b.price - a.price); break;
      case "new": list.sort((a, b) => Number(b.badges.includes("new")) - Number(a.badges.includes("new"))); break;
      case "opt": list.sort((a, b) => a.optPrice - b.optPrice); break;
      default: list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [cat, q, brand, colors, width, length, glue, maxPrice, inStockOnly, sort]);

  const title = cat?.name || (q ? `Пошук: «${q}»` : "Усі товари");
  const seo = cat
    ? `${cat.name} від виробника Mustang Tape. Прозорий, кольоровий, з логотипом, у різних розмірах. Опт від 100 рулонів — автоматична знижка 20%. Власне виробництво в Україні, відправка день-у-день Новою Поштою.`
    : "Каталог стрічок і пакувальних матеріалів Mustang Tape. Власне виробництво, опт і роздріб, white-label.";

  return (
    <div className="container-mt">
      <Breadcrumbs items={[{ label: "Головна", to: "/" }, { label: "Каталог", to: "/catalog" }, ...(cat ? [{ label: cat.name }] : [])]} />

      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">{title}</h1>
      <p className="text-sm text-muted-foreground max-w-3xl mb-6">{seo}</p>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className={`${filtersOpen ? "fixed inset-0 z-50 bg-background overflow-auto p-4" : "hidden"} md:static md:block md:w-[240px] shrink-0`}>
          <div className="md:hidden flex items-center justify-between mb-4">
            <h3 className="font-bold">Фільтри</h3>
            <button onClick={() => setFiltersOpen(false)} aria-label="Закрити"><X /></button>
          </div>
          <FilterGroup title="Бренд">
            {BRANDS.map(b => (
              <label key={b} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                <input type="checkbox" checked={brand.includes(b)} onChange={() => toggle(brand, b, setBrand)} className="accent-primary" />
                {b}
              </label>
            ))}
          </FilterGroup>
          <FilterGroup title="Колір">
            <div className="grid grid-cols-6 gap-1.5">
              {COLOR_SWATCHES.map(c => (
                <button key={c.value} onClick={() => toggle(colors, c.value, setColors)} title={c.name} className={`aspect-square rounded border-2 ${colors.includes(c.value) ? "border-primary" : "border-border"}`} style={{ backgroundColor: c.hex }} />
              ))}
            </div>
          </FilterGroup>
          <FilterGroup title="Ширина">
            <div className="flex flex-wrap gap-1.5">
              {WIDTHS.map(w => (
                <button key={w} onClick={() => toggle(width, w, setWidth)} className={`text-xs px-2.5 py-1 rounded border ${width.includes(w) ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"}`}>{w}мм</button>
              ))}
            </div>
          </FilterGroup>
          <FilterGroup title="Довжина">
            <div className="flex flex-wrap gap-1.5">
              {LENGTHS.map(l => (
                <button key={l} onClick={() => toggle(length, l, setLength)} className={`text-xs px-2.5 py-1 rounded border ${length.includes(l) ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"}`}>{l}м</button>
              ))}
            </div>
          </FilterGroup>
          <FilterGroup title="Тип клею">
            {GLUES.map(g => (
              <label key={g} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                <input type="checkbox" checked={glue.includes(g)} onChange={() => toggle(glue, g, setGlue)} className="accent-primary" />
                {g}
              </label>
            ))}
          </FilterGroup>
          <FilterGroup title="Ціна">
            <div className="text-xs text-muted-foreground mb-1">до ₴{maxPrice}</div>
            <input type="range" min={10} max={2000} step={10} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} className="w-full accent-primary" />
          </FilterGroup>
          <FilterGroup title="">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} className="accent-primary" />
              Тільки в наявності
            </label>
          </FilterGroup>
        </aside>

        {/* Right */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 bg-surface border border-border rounded-lg p-3 mb-4">
            <button onClick={() => setFiltersOpen(true)} className="md:hidden btn-outline px-3 py-2 text-sm"><SlidersHorizontal size={16} /> Фільтри</button>
            <div className="text-sm text-muted-foreground hidden md:block">Знайдено: <span className="font-semibold text-foreground">{products.length}</span></div>
            <div className="flex items-center gap-2 ml-auto">
              <select value={sort} onChange={e => setSort(e.target.value)} className="text-sm border border-border rounded-md px-3 py-2 bg-background">
                <option value="popular">За популярністю</option>
                <option value="cheap">Дешевші</option>
                <option value="expensive">Дорожчі</option>
                <option value="new">Новинки</option>
                <option value="opt">Опт-ціна</option>
              </select>
              <div className="hidden md:flex border border-border rounded-md overflow-hidden">
                <button onClick={() => setView("grid")} aria-label="Сітка" className={`p-2 ${view === "grid" ? "bg-primary text-primary-foreground" : "bg-background"}`}><LayoutGrid size={16} /></button>
                <button onClick={() => setView("list")} aria-label="Список" className={`p-2 ${view === "list" ? "bg-primary text-primary-foreground" : "bg-background"}`}><List size={16} /></button>
              </div>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="bg-surface border border-border rounded-lg p-10 text-center text-muted-foreground">Нічого не знайдено. Спробуйте змінити фільтри.</div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="space-y-3">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1 mt-8">
            {[1, 2, 3, "...", 12].map((n, i) => (
              <button key={i} className={`min-w-[36px] h-9 px-3 rounded-md border text-sm ${n === 1 ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:bg-surface"}`}>{n}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-4 border-b border-border last:border-b-0">
      {title && <h4 className="font-semibold text-sm mb-3">{title}</h4>}
      {children}
    </div>
  );
}
