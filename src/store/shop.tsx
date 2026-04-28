import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { PRODUCTS, Product } from "@/data/products";

interface CartItem { id: number; qty: number; }
interface ShopState {
  cart: CartItem[];
  wishlist: number[];
  addToCart: (id: number, qty?: number) => void;
  setQty: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: number) => void;
  cartCount: number;
  cartTotal: number;
  itemsDetailed: { product: Product; qty: number; unitPrice: number; lineTotal: number; }[];
}

const Ctx = createContext<ShopState | null>(null);

const KEY_CART = "mt_cart_v1";
const KEY_WL = "mt_wl_v1";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY_CART) || "[]"); } catch { return []; }
  });
  const [wishlist, setWishlist] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY_WL) || "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem(KEY_CART, JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem(KEY_WL, JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = (id: number, qty = 1) =>
    setCart(c => {
      const ex = c.find(i => i.id === id);
      if (ex) return c.map(i => i.id === id ? { ...i, qty: i.qty + qty } : i);
      return [...c, { id, qty }];
    });
  const setQty = (id: number, qty: number) =>
    setCart(c => qty <= 0 ? c.filter(i => i.id !== id) : c.map(i => i.id === id ? { ...i, qty } : i));
  const removeFromCart = (id: number) => setCart(c => c.filter(i => i.id !== id));
  const clearCart = () => setCart([]);
  const toggleWishlist = (id: number) =>
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  const itemsDetailed = useMemo(() =>
    cart.map(ci => {
      const product = PRODUCTS.find(p => p.id === ci.id)!;
      const unitPrice = ci.qty >= product.optThreshold ? product.optPrice : product.price;
      return { product, qty: ci.qty, unitPrice, lineTotal: unitPrice * ci.qty };
    }).filter(x => x.product), [cart]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = itemsDetailed.reduce((s, i) => s + i.lineTotal, 0);

  return (
    <Ctx.Provider value={{ cart, wishlist, addToCart, setQty, removeFromCart, clearCart, toggleWishlist, cartCount, cartTotal, itemsDetailed }}>
      {children}
    </Ctx.Provider>
  );
}

export const useShop = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useShop must be used within ShopProvider");
  return c;
};
