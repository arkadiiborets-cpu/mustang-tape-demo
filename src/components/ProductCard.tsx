import { Link } from "react-router-dom";
import { Heart, GitCompare, Star, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { useShop } from "@/store/shop";
import { uah, plural } from "@/lib/format";
import { TapeImage } from "./TapeImage";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const inWl = wishlist.includes(product.id);

  return (
    <div className="group relative bg-card border border-border rounded-lg p-4 flex flex-col hover:shadow-md transition-shadow">
      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
        {product.badges.includes("hit") && <span className="badge-hit">ХІТ</span>}
        {product.badges.includes("new") && <span className="badge-new">НОВЕ</span>}
        {product.badges.includes("wl") && <span className="badge-wl">WHITE-LABEL</span>}
        <span className="badge-opt">−20% ОПТ</span>
      </div>

      {/* Hover icons */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          aria-label="В обране"
          className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:bg-surface"
        >
          <Heart size={16} className={inWl ? "fill-primary text-primary" : "text-muted-foreground"} />
        </button>
        <button aria-label="Порівняти" className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:bg-surface">
          <GitCompare size={16} className="text-muted-foreground" />
        </button>
      </div>

      <Link to={`/product/${product.slug}`} className="flex items-center justify-center h-[180px] mb-3">
        <TapeImage product={product} />
      </Link>

      <div className="text-xs text-muted-foreground mb-1">{product.brand}</div>
      <Link to={`/product/${product.slug}`} className="text-sm font-semibold leading-snug line-clamp-2 mb-2 min-h-[40px] hover:text-primary transition-colors">
        {product.name}
      </Link>

      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
        <Star size={12} className="fill-accent text-accent" />
        <span className="font-semibold text-foreground">{product.rating}</span>
        <span>· {product.reviews} {plural(product.reviews, ["відгук", "відгуки", "відгуків"])}</span>
      </div>

      <div className="mt-auto">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">{uah(product.price)}</span>
          <span className="text-xs text-muted-foreground">/ шт</span>
        </div>
        <div className="text-xs text-primary font-semibold mb-2">
          {uah(product.optPrice)} від {product.optThreshold} шт
        </div>

        <div className="flex items-center gap-1.5 text-xs mb-3">
          {product.stock > 0 ? (
            <>
              <span className="w-2 h-2 rounded-full bg-success" />
              <span className="text-muted-foreground">В наявності {product.stock.toLocaleString("uk-UA")} шт</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-muted-foreground" />
              <span className="text-muted-foreground">Під замовлення</span>
            </>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product.id, 1);
            toast.success("Додано в кошик", { description: product.name });
          }}
          className="btn-primary w-full text-sm py-2"
        >
          <ShoppingCart size={16} /> В кошик
        </button>
      </div>
    </div>
  );
}
