import { Link, NavLink as RRNavLink, useNavigate } from "react-router-dom";
import { Heart, GitCompare, ShoppingCart, Search, Menu, X, Phone } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useShop } from "@/store/shop";
import { uah } from "@/lib/format";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import logo from "@/assets/mustang-logo.png";

export function Header() {
  const { cartCount, cartTotal, wishlist } = useShop();
  const [megaOpen, setMegaOpen] = useState(false);
  const [hoveredCat, setHoveredCat] = useState(CATEGORIES[0].slug);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const navigate = useNavigate();
  const closeTimer = useRef<number | null>(null);

  const openMega = () => {
    if (closeTimer.current) { window.clearTimeout(closeTimer.current); closeTimer.current = null; }
    setMegaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 150);
  };

  const searchResults = searchQ.trim().length >= 2
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQ.toLowerCase()) || p.sku.toLowerCase().includes(searchQ.toLowerCase())).slice(0, 5)
    : [];

  useEffect(() => { setMobileOpen(false); }, []);

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      {/* Row 1 */}
      <div className="bg-navy text-navy-foreground text-[13px]">
        <div className="container-mt flex items-center justify-between h-9">
          <div className="flex items-center gap-4">
            <a href="tel:0800210303" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Phone size={13} /> <span className="font-semibold">0 800 21 03 03</span>
            </a>
            <span className="hidden md:inline opacity-80">Пн–Пт 09:00–18:00, Сб 10:00–14:00</span>
          </div>
          <nav className="hidden md:flex items-center gap-5">
            <Link to="/opt-i-white-label" className="hover:text-accent transition-colors">Опт і white-label</Link>
            <Link to="/dostavka" className="hover:text-accent transition-colors">Доставка і оплата</Link>
            <Link to="/pro-vyrobnyctvo" className="hover:text-accent transition-colors">Про виробництво</Link>
            <Link to="/kontakty" className="hover:text-accent transition-colors">Контакти</Link>
            <button className="hover:text-accent transition-colors">Увійти</button>
          </nav>
        </div>
      </div>

      {/* Row 2 */}
      <div className="container-mt h-20 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="bg-navy rounded-md p-1.5 shadow-sm">
            <img src={logo} alt="Mustang Tape" width={120} height={48} className="h-10 w-auto object-contain" />
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="text-[11px] text-muted-foreground">виробник стрічок з 2014</div>
            <div className="text-[11px] text-muted-foreground">Бровари, Україна</div>
          </div>
        </Link>

        <div className="flex-1 hidden md:block relative">
          <form
            onSubmit={(e) => { e.preventDefault(); if (searchQ.trim()) navigate(`/catalog?q=${encodeURIComponent(searchQ)}`); }}
            className="flex"
          >
            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setTimeout(() => setSearchFocus(false), 150)}
              type="text"
              placeholder="Пошук стрічки, артикулу, розміру..."
              className="flex-1 h-11 px-4 border border-border border-r-0 rounded-l-md outline-none focus:border-primary text-sm"
            />
            <button type="submit" className="h-11 px-6 bg-primary text-primary-foreground rounded-r-md font-semibold flex items-center gap-2 hover:brightness-95">
              <Search size={18} /> <span className="hidden lg:inline">Знайти</span>
            </button>
          </form>
          {searchFocus && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-20 bg-background border border-border rounded-md shadow-lg mt-1 z-50 overflow-hidden">
              {searchResults.map(p => (
                <Link key={p.id} to={`/product/${p.slug}`} className="flex items-center gap-3 p-2 hover:bg-surface" onClick={() => setSearchQ("")}>
                  <div className="w-10 h-10 bg-surface rounded shrink-0 flex items-center justify-center text-xs text-muted-foreground">{p.brand[0]}</div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{p.name}</div>
                    <div className="text-xs text-primary font-semibold">{uah(p.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 md:gap-3 ml-auto">
          <Link to="/wishlist" className="relative w-10 h-10 flex items-center justify-center rounded-md hover:bg-surface" aria-label="Обране">
            <Heart size={20} className="text-foreground" />
            {wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">{wishlist.length}</span>}
          </Link>
          <button className="hidden md:flex relative w-10 h-10 items-center justify-center rounded-md hover:bg-surface" aria-label="Порівняти">
            <GitCompare size={20} className="text-foreground" />
          </button>
          <Link to="/cart" className="flex items-center gap-2 px-3 h-10 rounded-md hover:bg-surface" aria-label="Кошик">
            <div className="relative">
              <ShoppingCart size={20} className="text-foreground" />
              {cartCount > 0 && <span className="absolute -top-1.5 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">{cartCount}</span>}
            </div>
            <span className="hidden sm:inline text-sm font-semibold">{uah(cartTotal)}</span>
          </Link>
          <button onClick={() => setMobileOpen(true)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-md hover:bg-surface" aria-label="Меню">
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Catalog button + nav */}
      <div className="container-mt pb-3 flex items-center gap-3">
        <div className="relative" onMouseEnter={openMega} onMouseLeave={closeMega}>
          <button className="btn-primary h-11 px-5 text-sm">
            <Menu size={18} /> Усі стрічки і пакування
          </button>
          {megaOpen && (
            <div className="absolute top-full left-0 mt-1 w-[860px] max-w-[92vw] bg-background border border-border rounded-lg shadow-lg flex z-50 animate-fade-in">
              <ul className="w-1/2 p-2 border-r border-border max-h-[460px] overflow-auto">
                {CATEGORIES.map(c => (
                  <li key={c.slug}>
                    <Link
                      to={`/catalog/${c.slug}`}
                      onMouseEnter={() => setHoveredCat(c.slug)}
                      className={`block px-3 py-2 rounded text-sm transition-colors ${hoveredCat === c.slug ? "bg-surface text-primary font-semibold" : "hover:bg-surface"}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="w-1/2 p-4">
                <h4 className="text-sm font-bold text-navy mb-3">{CATEGORIES.find(c => c.slug === hoveredCat)?.name}</h4>
                <ul className="space-y-1.5 text-sm">
                  {PRODUCTS.filter(p => p.category === hoveredCat).slice(0, 6).map(p => (
                    <li key={p.id}>
                      <Link to={`/product/${p.slug}`} className="text-muted-foreground hover:text-primary block truncate">{p.name}</Link>
                    </li>
                  ))}
                </ul>
                <Link to={`/catalog/${hoveredCat}`} className="inline-block mt-4 text-sm font-semibold text-primary">Перейти в розділ →</Link>
              </div>
            </div>
          )}
        </div>
        <nav className="hidden lg:flex items-center gap-5 text-sm">
          {(["bopp", "malyarna", "dvostoronniy", "armovanyi", "masking-roller"] as const).map(slug => {
            const cat = CATEGORIES.find(c => c.slug === slug);
            if (!cat) return null;
            return <RRNavLink key={slug} to={`/catalog/${slug}`} className={({isActive}) => `hover:text-primary transition-colors ${isActive ? "text-primary font-semibold" : "text-foreground"}`}>{cat.name}</RRNavLink>;
          })}
          <Link to="/opt-i-white-label" className="text-accent-foreground bg-accent px-2.5 py-1 rounded font-semibold text-xs">ОПТ −20%</Link>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background animate-fade-in md:hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="bg-navy rounded-md p-1.5">
              <img src={logo} alt="Mustang Tape" className="h-8 w-auto" />
            </div>
            <button onClick={() => setMobileOpen(false)} aria-label="Закрити"><X size={24} /></button>
          </div>
          <div className="p-4 space-y-1">
            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              type="text"
              placeholder="Пошук..."
              className="w-full h-11 px-4 border border-border rounded-md text-sm mb-3"
            />
            {CATEGORIES.map(c => (
              <Link key={c.slug} to={`/catalog/${c.slug}`} onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 border-b border-border text-sm">{c.name}</Link>
            ))}
            <div className="pt-4 space-y-1">
              <Link to="/opt-i-white-label" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-semibold text-primary">Опт і white-label</Link>
              <Link to="/pro-vyrobnyctvo" onClick={() => setMobileOpen(false)} className="block py-2 text-sm">Про виробництво</Link>
              <Link to="/dostavka" onClick={() => setMobileOpen(false)} className="block py-2 text-sm">Доставка і оплата</Link>
              <Link to="/kontakty" onClick={() => setMobileOpen(false)} className="block py-2 text-sm">Контакти</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
