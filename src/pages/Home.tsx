import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Truck, Factory, Tag, Palette } from "lucide-react";
import { CATEGORIES, PRODUCTS, COLOR_SWATCHES, BRANDS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import * as Icons from "lucide-react";
import heroProduction from "@/assets/hero/hero-production.png";
import heroWhitelabel from "@/assets/hero/hero-whitelabel.png";
import heroDavinci from "@/assets/hero/hero-davinci.png";

interface HeroSlide {
  kicker: string;
  title: string;
  sub: string;
  cta: string;
  href: string;
  image: string;
  /** how to position the image when it's narrower than the viewport (object-position) */
  imagePosition?: string;
}

const SLIDES: HeroSlide[] = [
  {
    kicker: "З виробництва в Броварах",
    title: "Пакувальний скотч від виробника",
    sub: "Від ₴18 / шт у роздріб, від ₴14 / шт в опті від 100 рулонів. Відправка день-у-день по всій Україні.",
    cta: "До каталогу",
    href: "/catalog/bopp",
    image: heroProduction,
    imagePosition: "right center",
  },
  {
    kicker: "Власний цех друку",
    title: "White-label під ваш бренд",
    sub: "Ваш дизайн, ваш логотип, наша гума. Мінімальна партія від 1 000 рулонів. Готово за 14 днів.",
    cta: "Залишити заявку",
    href: "/opt-i-white-label",
    image: heroWhitelabel,
    imagePosition: "right center",
  },
  {
    kicker: "Італійська рисова стрічка",
    title: "Da Vinci Line — професійна малярна",
    sub: "Чітка лінія наче лезом, не підриває лакофарбові, тримає на сонці до 14 днів. Da Vinci Red, Green і Delicate Line — у наявності.",
    cta: "Перейти до малярних",
    href: "/catalog/malyarna",
    image: heroDavinci,
    imagePosition: "center",
  },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const hits = PRODUCTS.filter(p => p.badges.includes("hit"));
  const news = PRODUCTS.filter(p => p.badges.includes("new"));
  const newsExtended = [...news, ...PRODUCTS.filter(p => !p.badges.includes("new")).slice(0, 8 - news.length)];

  return (
    <div>
      {/* Hero */}
      <section className="container-mt pt-6">
        <div className="relative overflow-hidden rounded-xl bg-black text-white min-h-[320px] md:min-h-[440px] transition-all">
          {/* Background photo */}
          <img
            src={SLIDES[slide].image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: SLIDES[slide].imagePosition ?? "center" }}
          />
          {/* Left-side gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 md:via-black/85 to-black/30 md:to-black/10" />
          {/* Text content */}
          <div className="relative p-8 md:p-14 max-w-2xl animate-fade-in">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3 drop-shadow">
              {SLIDES[slide].kicker}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-white drop-shadow-lg">
              {SLIDES[slide].title}
            </h1>
            <p className="text-base md:text-lg text-white/95 mb-6 max-w-xl drop-shadow">
              {SLIDES[slide].sub}
            </p>
            <Link
              to={SLIDES[slide].href}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold rounded-md px-6 py-3 hover:bg-primary/90 transition-colors"
            >
              {SLIDES[slide].cta} <ChevronRight size={18} />
            </Link>
          </div>
          <button
            onClick={() => setSlide((slide - 1 + SLIDES.length) % SLIDES.length)}
            aria-label="Попередній слайд"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => setSlide((slide + 1) % SLIDES.length)}
            aria-label="Наступний слайд"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center"
          >
            <ChevronRight />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Слайд ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === slide ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-mt py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy">Каталог за категоріями</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES.map(c => {
            const Icon = (Icons as Record<string, React.ComponentType<{ size?: number }>>)[c.icon] || Icons.Package;
            return (
              <Link key={c.slug} to={`/catalog/${c.slug}`} className="bg-surface border border-border rounded-lg p-3 md:p-4 flex flex-col items-center text-center hover:border-primary hover:bg-background transition group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-background border border-border flex items-center justify-center mb-2 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-colors">
                  <Icon size={24} />
                </div>
                <span className="text-xs md:text-sm font-semibold leading-tight">{c.name}</span>
                <span className="text-[11px] text-muted-foreground mt-1">товарів: {c.count > 0 ? c.count.toString().padStart(2, "0") : "—"}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Hits carousel */}
      <section className="container-mt py-6">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-2xl md:text-3xl font-bold text-navy">Хіти продажів</h2>
          <Link to="/catalog" className="text-sm font-semibold text-primary hover:underline">Усі хіти →</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 snap-x">
          {hits.map(p => (
            <div key={p.id} className="w-[240px] shrink-0 snap-start">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Promo strip */}
      <section className="bg-accent text-accent-foreground py-5 my-10">
        <div className="container-mt flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-3">
            <Tag size={28} />
            <p className="text-base md:text-lg font-bold">Опт від 100 рулонів — мінус 20% автоматично. White-label за 14 днів.</p>
          </div>
          <Link to="/opt-i-white-label" className="bg-navy text-navy-foreground font-semibold rounded-md px-5 py-2.5 hover:opacity-90">Залишити заявку</Link>
        </div>
      </section>

      {/* News grid */}
      <section className="container-mt py-6">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-2xl md:text-3xl font-bold text-navy">Новинки виробництва</h2>
          <Link to="/catalog" className="text-sm font-semibold text-primary hover:underline">Усі новинки →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newsExtended.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Color picker */}
      <section className="container-mt py-10">
        <div className="flex items-center gap-3 mb-5">
          <Palette className="text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold text-navy">Обираємо за кольором</h2>
        </div>
        <p className="text-muted-foreground text-sm mb-5">Кожен колір — окрема лінійка з реального асортименту: малярна Da Vinci, ПВХ-ізоляція, Duct Tape, фасадна стрічка.</p>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {COLOR_SWATCHES.map(c => (
            <Link key={c.value} to={`/catalog?color=${c.value}`} className="group">
              <div className="aspect-square rounded-md border border-border group-hover:scale-105 group-hover:shadow-md transition-all" style={{ backgroundColor: c.hex }} title={c.name} />
              <div className="text-[11px] text-center mt-1 text-muted-foreground group-hover:text-foreground leading-tight">{c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="container-mt py-6">
        <h2 className="text-xl font-bold mb-5 text-navy text-center">Бренди в наявності</h2>
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6">
          {BRANDS.map((b, i) => (
            <div key={b} className={`px-5 py-3 border border-border rounded-lg bg-surface font-bold ${i === 0 ? "text-primary text-2xl border-primary/40" : "text-muted-foreground text-sm"}`}>{b}</div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="container-mt py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-navy text-center">Чому виробник вигідніше</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {[
            { icon: Factory, title: "Власне виробництво в Україні", text: "Стрічка, що відвантажена з нашого складу в Київській області. Без посередників і черг." },
            { icon: Tag, title: "Опт від 100 рулонів", text: "Автоматична знижка 20%, договір на постійні поставки, фіксована ціна на квартал." },
            { icon: Palette, title: "White-label за 14 днів", text: "Ваш бренд, ваш дизайн, наша гума. Друк до 4 кольорів, мінімум 1 000 рулонів." },
            { icon: Truck, title: "Нова Пошта по всій Україні", text: "Відправляємо день-у-день при замовленні до 16:00. Власна доставка по Києву від 5 000 грн." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-surface border border-border rounded-lg p-5">
              <div className="w-12 h-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-3"><Icon size={24} /></div>
              <h3 className="font-bold mb-2 text-base">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
