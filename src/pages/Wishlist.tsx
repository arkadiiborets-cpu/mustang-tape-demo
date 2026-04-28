import { Link } from "react-router-dom";
import { useShop } from "@/store/shop";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function Wishlist() {
  const { wishlist } = useShop();
  const items = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="container-mt">
      <Breadcrumbs items={[{ label: "Головна", to: "/" }, { label: "Обране" }]} />
      <h1 className="text-3xl font-bold text-navy mb-6">Обране</h1>
      {items.length === 0 ? (
        <div className="bg-surface border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground mb-4">У вас поки немає товарів в обраному.</p>
          <Link to="/" className="btn-primary inline-flex">Перейти до каталогу</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
