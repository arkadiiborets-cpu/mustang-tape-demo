export type Color =
  | "transparent" | "brown" | "red" | "blue" | "green" | "yellow"
  | "black" | "white" | "orange" | "pink" | "purple" | "grey" | "silver" | "mixed";

export type ProductCategory =
  | "bopp" | "malyarna" | "dvostoronniy" | "armovanyi"
  | "izolyaciyna" | "syhnalna" | "alyuminieva" | "kolorovyi-bopp"
  | "stretch" | "bulbashkova" | "dyspensery" | "korobky";

export interface Product {
  id: number;
  sku: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  categoryName: string;
  width: number;       // mm
  length: number;      // m
  thickness?: number;  // mkm
  glue?: string;
  tempRange?: string;
  color: Color;
  colorName: string;
  price: number;
  optPrice: number;
  optThreshold: number;
  stock: number;
  rating: number;
  reviews: number;
  badges: ("hit" | "new" | "wl" | "opt")[];
  description: string;
  imageHue: number; // for placeholder bg
}

const make = (p: Omit<Product, "slug" | "categoryName" | "colorName">): Product => {
  const catMap: Record<ProductCategory, string> = {
    "bopp": "Пакувальний скотч (BOPP)",
    "malyarna": "Малярна стрічка",
    "dvostoronniy": "Двосторонній скотч",
    "armovanyi": "Армований скотч (Duct Tape)",
    "izolyaciyna": "Електроізоляційна стрічка (ПВХ)",
    "syhnalna": "Сигнальна стрічка",
    "alyuminieva": "Алюмінієва і термостійка",
    "kolorovyi-bopp": "Кольоровий BOPP",
    "stretch": "Стретч-плівка",
    "bulbashkova": "Бульбашкова плівка",
    "dyspensery": "Диспенсери і аксесуари",
    "korobky": "Картонні коробки",
  };
  const colorMap: Record<Color, string> = {
    transparent: "Прозорий", brown: "Коричневий", red: "Червоний",
    blue: "Синій", green: "Зелений", yellow: "Жовтий", black: "Чорний",
    white: "Білий", orange: "Помаранчевий", pink: "Рожевий",
    purple: "Фіолетовий", grey: "Сірий", silver: "Сріблястий", mixed: "Мікс кольорів",
  };
  return {
    ...p,
    slug: p.sku.toLowerCase().replace(/_/g, "-"),
    categoryName: catMap[p.category],
    colorName: colorMap[p.color],
  };
};

export const PRODUCTS: Product[] = [
  make({ id: 1, sku: "MST-BOPP-48-66-CLR", name: "Скотч пакувальний прозорий Mustang 48мм × 66м", brand: "Mustang", category: "bopp", width: 48, length: 66, thickness: 45, glue: "Hot-melt", tempRange: "−5…+50°C", color: "transparent", price: 32, optPrice: 26, optThreshold: 100, stock: 8400, rating: 4.8, reviews: 342, badges: ["hit"], description: "Прозорий пакувальний скотч на BOPP-основі від виробника Mustang Tape. Стандартний розмір 48мм × 66м, ідеальний для заклеювання картонних коробок на складі та у роздробі. Hot-melt клей тримає шов навіть при низьких температурах транспортування. У нас на складі завжди в наявності.", imageHue: 0 }),
  make({ id: 2, sku: "MST-BOPP-48-66-BRN", name: "Скотч пакувальний коричневий Mustang 48мм × 66м", brand: "Mustang", category: "bopp", width: 48, length: 66, thickness: 45, glue: "Hot-melt", tempRange: "−5…+50°C", color: "brown", price: 34, optPrice: 27, optThreshold: 100, stock: 6200, rating: 4.8, reviews: 289, badges: ["hit"], description: "Коричневий BOPP-скотч 48мм × 66м для пакування коробок з крафт-картону. Менш помітний на коричневій тарі, виглядає охайно у відправленнях клієнтам.", imageHue: 25 }),
  make({ id: 3, sku: "MST-BOPP-48-66-LOGO", name: "Скотч пакувальний з логотипом 'Крихке' 48мм × 66м", brand: "Mustang", category: "bopp", width: 48, length: 66, thickness: 50, glue: "Hot-melt", tempRange: "−5…+50°C", color: "red", price: 48, optPrice: 38, optThreshold: 100, stock: 3100, rating: 4.7, reviews: 124, badges: ["wl"], description: "Сигнальний скотч з друком 'КРИХКЕ' червоним по білому. Привертає увагу служб доставки і знижує ризик пошкодження вмісту. Можемо надрукувати ваш логотип або текст — від 1000 рулонів.", imageHue: 0 }),
  make({ id: 4, sku: "MST-MAL-30-30", name: "Скотч малярний Mustang 30мм × 30м", brand: "Mustang", category: "malyarna", width: 30, length: 30, thickness: 120, glue: "Каучуковий", tempRange: "до +60°C", color: "yellow", price: 28, optPrice: 22, optThreshold: 100, stock: 4500, rating: 4.7, reviews: 198, badges: ["hit"], description: "Малярна стрічка на креп-папері 30мм × 30м. Не залишає слідів клею при знятті протягом 24 годин. Витримує до +60°C, підходить для фарбування авто, ремонтних робіт, фіксації трафаретів.", imageHue: 45 }),
  make({ id: 5, sku: "MST-MAL-50-30", name: "Скотч малярний Mustang 50мм × 30м", brand: "Mustang", category: "malyarna", width: 50, length: 30, thickness: 120, glue: "Каучуковий", tempRange: "до +60°C", color: "yellow", price: 42, optPrice: 34, optThreshold: 100, stock: 3200, rating: 4.6, reviews: 156, badges: [], description: "Широкий малярний скотч 50мм × 30м для великих площ. Гнеться по криволінійних поверхнях.", imageHue: 45 }),
  make({ id: 6, sku: "MST-MAL-30-25-T80", name: "Скотч малярний термостійкий до 80°C 30мм × 25м", brand: "Mustang", category: "malyarna", width: 30, length: 25, thickness: 130, glue: "Акриловий", tempRange: "до +80°C", color: "yellow", price: 65, optPrice: 52, optThreshold: 100, stock: 1800, rating: 4.8, reviews: 67, badges: ["new"], description: "Термостійка малярна стрічка для порошкового фарбування і робіт з нагрівом до +80°C. Акриловий клей не плавиться.", imageHue: 35 }),
  make({ id: 7, sku: "MST-2S-TKAN-48-10", name: "Двосторонній скотч на тканинній основі Mustang 48мм × 10м", brand: "Mustang", category: "dvostoronniy", width: 48, length: 10, thickness: 200, glue: "Каучуковий", tempRange: "−10…+70°C", color: "white", price: 85, optPrice: 68, optThreshold: 100, stock: 2400, rating: 4.7, reviews: 142, badges: [], description: "Потужний двосторонній скотч на тканинній основі. Кріплення килимів, виставкових стендів, дзеркал. Витримує навантаження до 5 кг/м².", imageHue: 0 }),
  make({ id: 8, sku: "MST-2S-FOAM-19-5", name: "Двосторонній скотч на спіненій основі 19мм × 5м", brand: "Mustang", category: "dvostoronniy", width: 19, length: 5, thickness: 1000, glue: "Акриловий", tempRange: "−20…+80°C", color: "white", price: 52, optPrice: 42, optThreshold: 100, stock: 5800, rating: 4.6, reviews: 215, badges: [], description: "Спінений двосторонній скотч 1мм для нерівних поверхонь. Монтаж декору, молдингів, кріплення на пластик і метал.", imageHue: 0 }),
  make({ id: 9, sku: "MST-2S-VHB-19-5", name: "Двосторонній монтажний скотч 3M VHB-аналог 19мм × 5м", brand: "Mustang", category: "dvostoronniy", width: 19, length: 5, thickness: 1100, glue: "Акриловий VHB", tempRange: "−40…+150°C", color: "grey", price: 180, optPrice: 145, optThreshold: 50, stock: 950, rating: 4.9, reviews: 88, badges: [], description: "Преміум-аналог 3M VHB. Кріплення без свердлення на скло, метал, пофарбовані поверхні. Зчеплення до 12 кг/м.", imageHue: 220 }),
  make({ id: 10, sku: "MST-DUCT-SLV-48-10", name: "Армований скотч сріблястий Duct Tape Mustang 48мм × 10м", brand: "Mustang", category: "armovanyi", width: 48, length: 10, thickness: 230, glue: "Каучуковий", tempRange: "−20…+80°C", color: "silver", price: 95, optPrice: 76, optThreshold: 100, stock: 4100, rating: 4.8, reviews: 312, badges: ["hit"], description: "Класичний срібний Duct Tape для аварійних ремонтів, кріплення повітропроводів, ущільнення. Розривається руками без ножиць.", imageHue: 0 }),
  make({ id: 11, sku: "MST-DUCT-BLK-48-25", name: "Армований скотч чорний Duct Tape Mustang 48мм × 25м", brand: "Mustang", category: "armovanyi", width: 48, length: 25, thickness: 230, glue: "Каучуковий", tempRange: "−20…+80°C", color: "black", price: 185, optPrice: 148, optThreshold: 100, stock: 1900, rating: 4.7, reviews: 178, badges: [], description: "Чорний армований скотч 25м. Сценічна техніка, фіксація кабелів, темні поверхні.", imageHue: 0 }),
  make({ id: 12, sku: "MST-DUCT-MIX-48-10", name: "Армований скотч у 6 кольорах (мікс) 48мм × 10м", brand: "Mustang", category: "armovanyi", width: 48, length: 10, thickness: 230, glue: "Каучуковий", tempRange: "−20…+80°C", color: "mixed", price: 540, optPrice: 432, optThreshold: 20, stock: 480, rating: 4.8, reviews: 54, badges: ["new"], description: "Набір з 6 рулонів Duct Tape різних кольорів. Маркування інвентаря, декор, креативні проєкти.", imageHue: 200 }),
  make({ id: 13, sku: "UNI-PVC-19-20-BLK", name: "Ізоляційна ПВХ-стрічка чорна 19мм × 20м", brand: "UNIBOB", category: "izolyaciyna", width: 19, length: 20, thickness: 130, glue: "Каучуковий", tempRange: "−10…+80°C", color: "black", price: 18, optPrice: 14, optThreshold: 100, stock: 14500, rating: 4.6, reviews: 487, badges: [], description: "Ізоляційна ПВХ-стрічка чорна для електромонтажних робіт. Витримує напругу до 5000В.", imageHue: 0 }),
  make({ id: 14, sku: "MST-PVC-19-20-MIX10", name: "Ізоляційна ПВХ-стрічка набір 10 кольорів 19мм × 20м", brand: "Mustang", category: "izolyaciyna", width: 19, length: 20, thickness: 130, glue: "Каучуковий", tempRange: "−10…+80°C", color: "mixed", price: 165, optPrice: 132, optThreshold: 50, stock: 2100, rating: 4.8, reviews: 234, badges: ["hit"], description: "Набір з 10 кольорів ізоляційної стрічки для маркування фаз і ліній.", imageHue: 200 }),
  make({ id: 15, sku: "MST-HB-18-10", name: "Ізоляційна термостійка ХБ 18мм × 10м", brand: "Mustang", category: "izolyaciyna", width: 18, length: 10, thickness: 200, glue: "Каучуковий", tempRange: "до +130°C", color: "black", price: 24, optPrice: 19, optThreshold: 100, stock: 7200, rating: 4.5, reviews: 142, badges: [], description: "Бавовняна ізоляційна стрічка для високотемпературних з'єднань.", imageHue: 0 }),
  make({ id: 16, sku: "MST-SIG-OB-50-100", name: "Сигнальна стрічка 'Обережно' жовто-чорна 50мм × 100м", brand: "Mustang", category: "syhnalna", width: 50, length: 100, thickness: 50, color: "yellow", price: 285, optPrice: 228, optThreshold: 50, stock: 870, rating: 4.7, reviews: 96, badges: [], description: "Огороджувальна сигнальна стрічка для будівельних майданчиків. Жовто-чорна діагональ.", imageHue: 50 }),
  make({ id: 17, sku: "MST-SIG-ST-50-200", name: "Сигнальна стрічка 'Стоп' червоно-біла 50мм × 200м", brand: "Mustang", category: "syhnalna", width: 50, length: 200, thickness: 50, color: "red", price: 420, optPrice: 336, optThreshold: 50, stock: 540, rating: 4.7, reviews: 73, badges: [], description: "Червоно-біла стрічка 'СТОП' для огорожі небезпечних зон. Матеріал PE, не рветься.", imageHue: 0 }),
  make({ id: 18, sku: "MST-FLR-YEL-50-33", name: "Стрічка для розмітки підлоги жовта 50мм × 33м", brand: "Mustang", category: "syhnalna", width: 50, length: 33, thickness: 150, glue: "Акриловий", tempRange: "−10…+60°C", color: "yellow", price: 195, optPrice: 156, optThreshold: 50, stock: 1240, rating: 4.8, reviews: 58, badges: ["new"], description: "Зносостійка ПВХ-стрічка для розмітки складської підлоги. Витримує проїзд штабелерів.", imageHue: 50 }),
  make({ id: 19, sku: "MST-AL-50-50", name: "Алюмінієва стрічка термостійка 50мм × 50м", brand: "Mustang", category: "alyuminieva", width: 50, length: 50, thickness: 60, glue: "Акриловий", tempRange: "−40…+150°C", color: "silver", price: 380, optPrice: 304, optThreshold: 50, stock: 720, rating: 4.7, reviews: 89, badges: [], description: "Алюмінієва фольгована стрічка для теплоізоляції, ущільнення повітропроводів, відображення тепла.", imageHue: 0 }),
  make({ id: 20, sku: "MST-FOIL-GLASS-50-25", name: "Стрічка фольгована армована скловолокном 50мм × 25м", brand: "Mustang", category: "alyuminieva", width: 50, length: 25, thickness: 150, glue: "Акриловий", tempRange: "−40…+200°C", color: "silver", price: 520, optPrice: 416, optThreshold: 50, stock: 410, rating: 4.8, reviews: 47, badges: [], description: "Армована скловолокном алюмінієва стрічка. Високотемпературне ущільнення котлів і димоходів.", imageHue: 0 }),
  make({ id: 21, sku: "MST-CBOPP-MIX6-48-66", name: "Кольоровий BOPP-скотч набір 6 кольорів 48мм × 66м", brand: "Mustang", category: "kolorovyi-bopp", width: 48, length: 66, thickness: 45, glue: "Hot-melt", tempRange: "−5…+50°C", color: "mixed", price: 298, optPrice: 238, optThreshold: 50, stock: 980, rating: 4.8, reviews: 145, badges: ["hit"], description: "Набір з 6 кольорів BOPP-скотчу для логістики і декору. Маркування партій, святкове пакування.", imageHue: 200 }),
  make({ id: 22, sku: "MST-STR-500-1500", name: "Стретч-плівка ручна прозора 500мм × 1.5кг", brand: "Mustang", category: "stretch", width: 500, length: 250, thickness: 17, color: "transparent", price: 195, optPrice: 156, optThreshold: 50, stock: 2100, rating: 4.7, reviews: 312, badges: [], description: "Ручна стретч-плівка 17 мкм, 1.5 кг нетто. Палетне пакування, фіксація вантажів.", imageHue: 0 }),
  make({ id: 23, sku: "MST-BUB-1200-50", name: "Бульбашкова плівка двошарова 1.2м × 50м", brand: "Mustang", category: "bulbashkova", width: 1200, length: 50, thickness: 60, color: "transparent", price: 340, optPrice: 272, optThreshold: 20, stock: 380, rating: 4.6, reviews: 187, badges: [], description: "Двошарова бульбашкова плівка. Ширина рулону 1.2м, довжина 50м. Захист крихкого товару.", imageHue: 0 }),
  make({ id: 24, sku: "MST-DSP-48-MET", name: "Диспенсер для пакувального скотча 48мм металевий", brand: "Mustang", category: "dyspensery", width: 48, length: 0, color: "blue", price: 185, optPrice: 148, optThreshold: 20, stock: 640, rating: 4.7, reviews: 156, badges: [], description: "Металевий диспенсер для скотчу 48мм з регулюванням натягу. Прискорює пакування у 3 рази.", imageHue: 210 }),
];

export const CATEGORIES: { slug: ProductCategory; name: string; icon: string }[] = [
  { slug: "bopp", name: "Пакувальний скотч (BOPP)", icon: "Package" },
  { slug: "malyarna", name: "Малярна стрічка", icon: "PaintRoller" },
  { slug: "dvostoronniy", name: "Двосторонній скотч", icon: "Layers" },
  { slug: "armovanyi", name: "Армований скотч (Duct Tape)", icon: "Wrench" },
  { slug: "izolyaciyna", name: "Електроізоляційна стрічка (ПВХ)", icon: "Zap" },
  { slug: "syhnalna", name: "Сигнальна стрічка", icon: "TriangleAlert" },
  { slug: "alyuminieva", name: "Алюмінієва і термостійка", icon: "Flame" },
  { slug: "kolorovyi-bopp", name: "Кольоровий BOPP", icon: "Palette" },
  { slug: "stretch", name: "Стретч-плівка", icon: "Box" },
  { slug: "bulbashkova", name: "Бульбашкова плівка", icon: "Circle" },
  { slug: "dyspensery", name: "Диспенсери і аксесуари", icon: "Scissors" },
  { slug: "korobky", name: "Картонні коробки", icon: "PackageOpen" },
];

export const COLOR_SWATCHES: { value: Color; name: string; hex: string }[] = [
  { value: "red", name: "Червоний", hex: "#DC2626" },
  { value: "blue", name: "Синій", hex: "#2563EB" },
  { value: "green", name: "Зелений", hex: "#16A34A" },
  { value: "yellow", name: "Жовтий", hex: "#FACC15" },
  { value: "black", name: "Чорний", hex: "#111827" },
  { value: "white", name: "Білий", hex: "#FFFFFF" },
  { value: "orange", name: "Помаранчевий", hex: "#FF6B00" },
  { value: "pink", name: "Рожевий", hex: "#EC4899" },
  { value: "purple", name: "Фіолетовий", hex: "#8B5CF6" },
  { value: "brown", name: "Коричневий", hex: "#92400E" },
  { value: "grey", name: "Сірий", hex: "#6B7280" },
  { value: "transparent", name: "Прозорий", hex: "#E5E7EB" },
];

export const REVIEWS = [
  { author: "Олександр П.", date: "12.04.2026", rating: 5, text: "Замовляли 200 рулонів на склад, тримає добре, шов не розходиться. Відправили день-у-день, прийшло на наступний день у Львів." },
  { author: "Марина К.", date: "03.04.2026", rating: 5, text: "Брали під логотип нашого інтернет-магазину — все в строк, 12 днів, якість друку як обіцяли. Будемо замовляти ще." },
  { author: "Дмитро С.", date: "27.03.2026", rating: 4, text: "Дешевше ніж в Епіцентрі, рулон щільний. Скло мнеться менше при пакуванні. Один рулон з партії був з нерівним краєм, замінили без питань." },
  { author: "Юлія В.", date: "18.03.2026", rating: 5, text: "Працюємо з Mustang вже рік, постачання стабільне, рахунок з ПДВ виставляють швидко. Менеджер Андрій — окрема подяка." },
  { author: "Сергій Б.", date: "09.03.2026", rating: 5, text: "Замовляв роздріб, 5 рулонів — все одно прийшло швидко і у фірмовій упаковці. Приємно, що до маленького клієнта таке ж ставлення." },
];

export const BRANDS = ["Mustang", "UNIBOB", "3M Scotch", "Tesa", "FIT", "Klebebander", "Eurocel", "Folsen"];
