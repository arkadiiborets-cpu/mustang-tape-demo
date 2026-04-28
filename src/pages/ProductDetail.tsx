import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PRODUCTS, REVIEWS } from "@/data/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TapeImage } from "@/components/TapeImage";
import { useShop } from "@/store/shop";
import { uah, plural } from "@/lib/format";
import { Heart, Star, Truck, Factory, Tag, Package, Minus, Plus, ShoppingCart, Phone } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { toast } from "sonner";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCTS.find(p => p.slug === slug);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"opys" | "char" | "rev" | "wl" | "del">("opys");
  const [thumb, setThumb] = useState(0);
  const { addToCart, toggleWishlist, wishlist } = useShop();

  const similar = useMemo(() => product ? PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4) : [], [product]);

  if (!product) return <div className="container-mt py-20 text-center">Товар не знайдено. <Link to="/" className="text-primary">На головну</Link></div>;

  const unit = qty >= product.optThreshold ? product.optPrice : product.price;
  const inWl = wishlist.includes(product.id);
  const savings = Math.round((1 - product.optPrice / product.price) * 100);

  return (
    <div className="container-mt">
      <Breadcrumbs items={[
        { label: "Головна", to: "/" },
        { label: "Каталог", to: "/catalog" },
        { label: product.categoryName, to: `/catalog/${product.category}` },
        { label: product.name },
      ]} />

      <div className="grid md:grid-cols-2 gap-8 mt-2">
        {/* Gallery */}
        <div>
          <div className="bg-surface border border-border rounded-lg flex items-center justify-center aspect-square">
            <TapeImage product={product} size={360} />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[0, 1, 2, 3].map(i => (
              <button key={i} onClick={() => setThumb(i)} className={`aspect-square rounded border-2 bg-surface flex items-center justify-center ${thumb === i ? "border-primary" : "border-border"}`}>
                <TapeImage product={product} size={70} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="text-xs text-muted-foreground mb-2">Артикул: <span className="font-mono">{product.sku}</span></div>
          <h1 className="text-2xl md:text-3xl font-bold text-navy leading-tight mb-3">{product.name}</h1>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} className={i <= Math.round(product.rating) ? "fill-accent text-accent" : "text-border"} />)}
            </div>
            <span className="font-semibold">{product.rating}</span>
            <span className="text-sm text-muted-foreground">{product.reviews} {plural(product.reviews, ["відгук", "відгуки", "відгуків"])}</span>
          </div>

          <div className="bg-surface border border-border rounded-lg p-4 mb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold">{uah(product.price)}</span>
              <span className="text-sm text-muted-foreground">/ шт у роздріб</span>
            </div>
            <div className="text-base font-bold text-primary">{uah(product.optPrice)} / шт від {product.optThreshold} шт</div>
            <div className="text-xs text-muted-foreground">Економія в опті <span className="text-primary font-semibold">{savings}%</span></div>
          </div>

          <div className="flex items-center gap-2 mb-5 text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-success" />
            <span className="text-muted-foreground">В наявності <span className="font-semibold text-foreground">{product.stock.toLocaleString("uk-UA")} шт</span> на складі в Броварах</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center border border-border rounded-md">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-11 flex items-center justify-center hover:bg-surface" aria-label="Менше"><Minus size={16} /></button>
              <input type="number" min={1} value={qty} onChange={e => setQty(Math.max(1, +e.target.value || 1))} className="w-16 h-11 text-center font-semibold outline-none" />
              <button onClick={() => setQty(qty + 1)} className="w-10 h-11 flex items-center justify-center hover:bg-surface" aria-label="Більше"><Plus size={16} /></button>
            </div>
            {[10, 50, 100].map(n => (
              <button key={n} onClick={() => setQty(qty + n)} className="text-xs px-2.5 py-1.5 border border-border rounded hover:bg-surface">+{n}</button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <button
              onClick={() => { addToCart(product.id, qty); toast.success(`Додано ${qty} шт`, { description: product.name }); }}
              className="btn-primary flex-1 h-12 text-base"
            >
              <ShoppingCart size={18} /> Додати в кошик
            </button>
            <button onClick={() => toggleWishlist(product.id)} aria-label="В обране" className="btn-outline w-12 h-12 p-0 shrink-0">
              <Heart size={18} className={inWl ? "fill-primary text-primary" : ""} />
            </button>
          </div>
          <button onClick={() => toast("Демо-режим: оформлення в реальному магазині")} className="btn-outline w-full h-11 mb-5">
            <Phone size={16} /> Замовити в один клік
          </button>

          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><Truck size={16} className="text-primary shrink-0" /> Відправка день-у-день</div>
            <div className="flex items-center gap-2"><Tag size={16} className="text-primary shrink-0" /> Опт від {product.optThreshold} шт</div>
            <div className="flex items-center gap-2"><Package size={16} className="text-primary shrink-0" /> White-label опція</div>
            <div className="flex items-center gap-2"><Factory size={16} className="text-primary shrink-0" /> Нова Пошта по Україні</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 border-b border-border flex flex-wrap gap-1">
        {([
          ["opys", "Опис"],
          ["char", "Характеристики"],
          ["rev", `Відгуки (${product.reviews})`],
          ["wl", "Опт і white-label"],
          ["del", "Доставка і оплата"],
        ] as const).map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`px-4 py-3 text-sm font-semibold border-b-2 -mb-px ${tab === k ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{l}</button>
        ))}
      </div>

      <div className="py-6 max-w-3xl">
        {tab === "opys" && <p className="text-sm leading-relaxed text-foreground">{product.description}</p>}
        {tab === "char" && (
          <table className="w-full text-sm">
            <tbody>
              {[
                ["Ширина", `${product.width} мм`],
                ["Довжина", product.length ? `${product.length} м` : "—"],
                ["Товщина основи", product.thickness ? `${product.thickness} мкм` : "—"],
                ["Тип клею", product.glue || "—"],
                ["Температура застосування", product.tempRange || "—"],
                ["Колір", product.colorName],
                ["Бренд", product.brand],
                ["Термін зберігання", "24 місяці у закритій упаковці"],
                ["Країна виробництва", "Україна"],
                ["ТУ/ДСТУ", "ТУ У 22.2-12345678-001:2022"],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-border">
                  <td className="py-2.5 text-muted-foreground w-1/2">{k}</td>
                  <td className="py-2.5 font-semibold">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "rev" && (
          <div className="space-y-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">{r.author}</div>
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className={i <= r.rating ? "fill-accent text-accent" : "text-border"} />)}
                </div>
                <p className="text-sm text-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        )}
        {tab === "wl" && (
          <div className="space-y-3 text-sm">
            <p>Цей товар доступний для оптових поставок та white-label друку. Мінімальна партія white-label — 1 000 рулонів. Термін виконання — 14 робочих днів.</p>
            <Link to="/opt-i-white-label" className="btn-primary inline-flex">Залишити заявку на опт</Link>
          </div>
        )}
        {tab === "del" && (
          <div className="space-y-2 text-sm">
            <p>Нова Пошта на відділення — від ₴70, доставка 1–2 дні.</p>
            <p>Самовивіз з виробництва Бровари — безкоштовно.</p>
            <p>Оплата: LiqPay, накладений платіж, безготівковий розрахунок з ПДВ.</p>
          </div>
        )}
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <div className="py-10">
          <h2 className="text-2xl font-bold text-navy mb-5">Схожі стрічки</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similar.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
