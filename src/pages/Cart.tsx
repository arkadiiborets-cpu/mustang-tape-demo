import { Link } from "react-router-dom";
import { useShop } from "@/store/shop";
import { uah } from "@/lib/format";
import { TapeImage } from "@/components/TapeImage";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Trash2, Minus, Plus, ChevronLeft, Tag } from "lucide-react";

export default function Cart() {
  const { itemsDetailed, setQty, removeFromCart, cartTotal } = useShop();

  return (
    <div className="container-mt">
      <Breadcrumbs items={[{ label: "Головна", to: "/" }, { label: "Кошик" }]} />
      <h1 className="text-3xl font-bold text-navy mb-6">Кошик</h1>

      {itemsDetailed.length === 0 ? (
        <div className="bg-surface border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground mb-4">Ваш кошик поки порожній.</p>
          <Link to="/" className="btn-primary inline-flex">Перейти до каталогу</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-3">
            {itemsDetailed.map(({ product, qty, unitPrice, lineTotal }) => {
              const belowOpt = qty < product.optThreshold;
              return (
                <div key={product.id} className="bg-card border border-border rounded-lg p-4 flex gap-4">
                  <Link to={`/product/${product.slug}`} className="w-24 h-24 bg-surface rounded shrink-0 flex items-center justify-center">
                    <TapeImage product={product} size={86} />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${product.slug}`} className="font-semibold text-sm hover:text-primary line-clamp-2">{product.name}</Link>
                    <div className="text-xs text-muted-foreground mt-1">Артикул: {product.sku}</div>
                    {belowOpt && (
                      <div className="text-xs text-primary mt-2 flex items-center gap-1.5"><Tag size={12} /> При замовленні від {product.optThreshold} шт ціна стане {uah(product.optPrice)}</div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center border border-border rounded-md">
                      <button onClick={() => setQty(product.id, qty - 1)} className="w-8 h-9 flex items-center justify-center hover:bg-surface" aria-label="Менше"><Minus size={14} /></button>
                      <input type="number" value={qty} onChange={e => setQty(product.id, Math.max(1, +e.target.value || 1))} className="w-12 h-9 text-center font-semibold outline-none" />
                      <button onClick={() => setQty(product.id, qty + 1)} className="w-8 h-9 flex items-center justify-center hover:bg-surface" aria-label="Більше"><Plus size={14} /></button>
                    </div>
                    <div className="text-xs text-muted-foreground">{uah(unitPrice)} × {qty}</div>
                    <div className="font-bold text-base">{uah(lineTotal)}</div>
                    <button onClick={() => removeFromCart(product.id)} aria-label="Видалити" className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                  </div>
                </div>
              );
            })}
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-primary mt-2 hover:underline"><ChevronLeft size={16} /> Продовжити покупки</Link>
          </div>

          <aside className="bg-surface border border-border rounded-lg p-5 h-fit lg:sticky lg:top-32">
            <h3 className="font-bold text-lg mb-4">Підсумок</h3>
            <div className="flex justify-between text-sm py-2"><span>Сума товарів</span><span className="font-semibold">{uah(cartTotal)}</span></div>
            <div className="flex justify-between text-sm py-2 border-b border-border"><span>Доставка</span><span className="text-muted-foreground">розрахується на оформленні</span></div>
            <div className="flex justify-between items-baseline py-4">
              <span className="text-base font-bold">Разом до сплати</span>
              <span className="text-2xl font-bold text-primary">{uah(cartTotal)}</span>
            </div>
            <div className="mb-4">
              <label className="text-xs text-muted-foreground">Промокод</label>
              <div className="flex gap-2 mt-1">
                <input type="text" placeholder="MUSTANG10" className="flex-1 h-10 px-3 border border-border rounded-md text-sm bg-background outline-none focus:border-primary" />
                <button className="btn-outline px-4 py-2 text-sm">Застосувати</button>
              </div>
            </div>
            <Link to="/checkout" className="btn-primary w-full h-12">Оформити замовлення</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
