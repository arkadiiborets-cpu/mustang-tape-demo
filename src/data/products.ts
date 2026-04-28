export type Color =
  | "transparent" | "brown" | "red" | "blue" | "green" | "yellow"
  | "black" | "white" | "orange" | "pink" | "purple" | "grey" | "silver" | "mixed";

export type ProductCategory =
  | "bopp"
  | "malyarna"
  | "dvostoronniy"
  | "armovanyi"
  | "izolyaciyna"
  | "alyuminieva"
  | "masking-roller"
  | "spec";

export type Badge = "hit" | "new" | "wl" | "opt" | "premium";

export interface Product {
  id: number;
  sku: string;
  slug: string;
  name: string;
  brand: string;
  subBrand?: string;
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
  badges: Badge[];
  description: string;
  /** filename in src/assets/products/ — resolved by Vite glob in TapeImage */
  image?: string;
  /** original Rozetka product page (for reference, not shown in UI) */
  rozetkaUrl?: string;
}

const CATEGORY_NAMES: Record<ProductCategory, string> = {
  "bopp": "Пакувальний скотч (BOPP)",
  "malyarna": "Малярна стрічка",
  "dvostoronniy": "Двосторонній скотч",
  "armovanyi": "Армований скотч (Duct Tape)",
  "izolyaciyna": "Електроізоляційна стрічка (ПВХ)",
  "alyuminieva": "Алюмінієва і термостійка",
  "masking-roller": "Захисна плівка Masking Roller",
  "spec": "Спецстрічки і сервіс",
};

const COLOR_NAMES: Record<Color, string> = {
  transparent: "Прозорий",
  brown: "Коричневий",
  red: "Червоний",
  blue: "Синій",
  green: "Зелений",
  yellow: "Жовтий",
  black: "Чорний",
  white: "Білий",
  orange: "Помаранчевий",
  pink: "Рожевий",
  purple: "Фіолетовий",
  grey: "Сірий",
  silver: "Сріблястий",
  mixed: "Мікс кольорів",
};

type ProductSeed = Omit<Product, "slug" | "categoryName" | "colorName">;

const make = (seed: ProductSeed): Product => ({
  ...seed,
  slug: seed.sku.toLowerCase().replace(/_/g, "-"),
  categoryName: CATEGORY_NAMES[seed.category],
  colorName: COLOR_NAMES[seed.color],
});

export const PRODUCTS: Product[] = [
  // ─── Пакувальний скотч (BOPP) ───────────────────────────────────────
  make({
    id: 1, sku: "MST-BOPP-AT600-300",
    name: "Скотч пакувальний Mustang AT600 300м × 45мм × 40мкм",
    brand: "Mustang", category: "bopp", width: 45, length: 300, thickness: 40,
    glue: "Hot-melt", tempRange: "−5…+50°C", color: "transparent",
    price: 117, optPrice: 93, optThreshold: 100, stock: 4200, rating: 4.8, reviews: 156,
    badges: ["hit"],
    description: "Прозорий BOPP-скотч 45мм × 300м від виробника Mustang. Економічна намотка для активних складів — менше замін рулона на касі. Hot-melt клей тримає шов при перевезенні в холод.",
    image: "mst-bopp-at600-300m.jpg",
    rozetkaUrl: "https://rozetka.com.ua/ua/kleykie-lenty-i-skotchi/c2560867/producer=mustang/",
  }),
  make({
    id: 2, sku: "MST-BOPP-AT200-100",
    name: "Скотч пакувальний Mustang AT200 100м × 45мм × 40мкм",
    brand: "Mustang", category: "bopp", width: 45, length: 100, thickness: 40,
    glue: "Hot-melt", tempRange: "−5…+50°C", color: "transparent",
    price: 51, optPrice: 41, optThreshold: 100, stock: 8400, rating: 4.7, reviews: 244,
    badges: [],
    description: "Класичний прозорий BOPP 45мм × 100м. Універсальний для роздрібного пакування і малих складів.",
    image: "mst-bopp-at200-100m.jpg",
  }),
  make({
    id: 3, sku: "MST-BOPP-AT30-15",
    name: "Скотч пакувальний Mustang AT30 15м × 45мм × 40мкм",
    brand: "Mustang", category: "bopp", width: 45, length: 15, thickness: 40,
    glue: "Hot-melt", tempRange: "−5…+50°C", color: "transparent",
    price: 15, optPrice: 12, optThreshold: 100, stock: 12500, rating: 4.6, reviews: 412,
    badges: [],
    description: "Малий рулон 15м для дрібного пакування. Підходить для офісу, домашнього використання, дрібних відправлень.",
    image: "mst-bopp-at30-15m.jpg",
  }),
  make({
    id: 4, sku: "MST-BOPP-MAGNUM-50",
    name: "Скотч пакувальний Magnum Mustang 45мм × 50м",
    brand: "Mustang", subBrand: "Magnum", category: "bopp", width: 45, length: 50, thickness: 40,
    glue: "Hot-melt", tempRange: "−5…+50°C", color: "transparent",
    price: 18, optPrice: 14, optThreshold: 100, stock: 9800, rating: 4.6, reviews: 287,
    badges: ["opt"],
    description: "Бюджетна лінійка Magnum — той самий BOPP, тонша намотка для оптових клієнтів які везуть контейнерами.",
    image: "mst-bopp-magnum-50m.jpg",
  }),
  make({
    id: 5, sku: "MST-BOPP-MAGNUM-100",
    name: "Скотч пакувальний Magnum Mustang 45мм × 100м",
    brand: "Mustang", subBrand: "Magnum", category: "bopp", width: 45, length: 100, thickness: 40,
    glue: "Hot-melt", tempRange: "−5…+50°C", color: "transparent",
    price: 31, optPrice: 25, optThreshold: 100, stock: 7600, rating: 4.6, reviews: 198,
    badges: ["opt"],
    description: "Magnum 100м — найходовіший SKU для дистрибуторів. Палет 96 рулонів, мінімальна оптова партія 1 коробка (36 шт).",
    image: "mst-bopp-magnum-100m.jpg",
  }),

  // ─── Малярна стрічка ────────────────────────────────────────────────
  make({
    id: 6, sku: "MST-MAL-DAVINCI-RED-25-50",
    name: "Малярна стрічка Mustang Da Vinci Red 25мм × 50м",
    brand: "Mustang", subBrand: "Da Vinci Line", category: "malyarna",
    width: 25, length: 50, thickness: 130, glue: "Каучуковий", tempRange: "до +80°C",
    color: "red",
    price: 135, optPrice: 108, optThreshold: 50, stock: 1800, rating: 4.8, reviews: 134,
    badges: ["new"],
    description: "Da Vinci Red — професійна стрічка для нерівних поверхонь. Чітка лінія краю, не залишає клею до 7 днів. Для авто, сатинових і шовковисті фарб.",
    image: "mst-mal-davinci-red-25-50.jpg",
  }),
  make({
    id: 7, sku: "MST-MAL-DAVINCI-RED-19-50",
    name: "Малярна стрічка Mustang Da Vinci Red 19мм × 50м",
    brand: "Mustang", subBrand: "Da Vinci Line", category: "malyarna",
    width: 19, length: 50, thickness: 130, glue: "Каучуковий", tempRange: "до +80°C",
    color: "red",
    price: 101, optPrice: 81, optThreshold: 50, stock: 2100, rating: 4.8, reviews: 118,
    badges: [],
    description: "Та сама Da Vinci Red, тонший рулон 19мм для тонких ліній і дрібного декору.",
    image: "mst-mal-davinci-red-25.jpg",
  }),
  make({
    id: 8, sku: "MST-MAL-DAVINCI-GREEN-48",
    name: "Малярна стрічка Mustang Da Vinci Green 48мм × 50м",
    brand: "Mustang", subBrand: "Da Vinci Line", category: "malyarna",
    width: 48, length: 50, thickness: 130, glue: "Каучуковий", tempRange: "до +100°C",
    color: "green",
    price: 231, optPrice: 184, optThreshold: 30, stock: 950, rating: 4.9, reviews: 76,
    badges: ["new", "premium"],
    description: "Da Vinci Green — версія для зовнішніх робіт і високих температур. Тримається на сонці до 14 днів без слідів.",
    image: "mst-mal-davinci-green-48.jpg",
  }),
  make({
    id: 9, sku: "MST-MAL-DELICATE-VIOLET",
    name: "Малярна стрічка рисова Mustang Delicate Line 19мм × 25м",
    brand: "Mustang", subBrand: "Delicate Line", category: "malyarna",
    width: 19, length: 25, thickness: 90, glue: "Акриловий", tempRange: "до +60°C",
    color: "purple",
    price: 126, optPrice: 100, optThreshold: 50, stock: 1450, rating: 4.9, reviews: 168,
    badges: ["hit", "premium"],
    description: "Делікатна рисова стрічка made in Italy. Чітка лінія наче лезом, не підриває лакофарбові матеріали, не залишає слідів. Для тонких декоративних робіт.",
    image: "mst-mal-delicate-line-violet.jpg",
  }),
  make({
    id: 10, sku: "MST-MAL-DELICATE-PRO",
    name: "Малярна стрічка рисова Mustang Delicate Line 48мм × 25м",
    brand: "Mustang", subBrand: "Delicate Line", category: "malyarna",
    width: 48, length: 25, thickness: 90, glue: "Акриловий", tempRange: "до +60°C",
    color: "purple",
    price: 236, optPrice: 188, optThreshold: 30, stock: 720, rating: 4.9, reviews: 92,
    badges: ["premium"],
    description: "Широка версія Delicate Line 48мм для великих площ декору. Той самий рисовий папір з Італії.",
    image: "mst-mal-delicate-line-premium.png",
  }),
  make({
    id: 11, sku: "MST-MAL-ULTRA-DELICATE",
    name: "Делікатна рисова малярна стрічка Mustang Ultra Delicate Line",
    brand: "Mustang", subBrand: "Ultra Delicate Line", category: "malyarna",
    width: 48, length: 50, thickness: 80, glue: "Акриловий", tempRange: "до +60°C",
    color: "purple",
    price: 471, optPrice: 376, optThreshold: 20, stock: 380, rating: 4.9, reviews: 47,
    badges: ["premium", "new"],
    description: "Топ лінійки — Ultra Delicate. Найтонший рисовий папір, абсолютно чистий зйом з делікатних поверхонь. Для реставрації і авто-преміум сегменту.",
    image: "mst-mal-ultra-delicate.jpg",
  }),
  make({
    id: 12, sku: "MST-MAL-ELITE-25",
    name: "Стрічка малярна Mustang Elite WMT2525P 25мм × 25м",
    brand: "Mustang", subBrand: "Elite", category: "malyarna",
    width: 25, length: 25, thickness: 120, glue: "Каучуковий", tempRange: "до +60°C",
    color: "white",
    price: 100, optPrice: 80, optThreshold: 50, stock: 2400, rating: 4.7, reviews: 156,
    badges: [],
    description: "Універсальна біла малярна стрічка Elite. Робочий рулон для маляра — фарбування стін, фіксація, маркування.",
    image: "mst-mal-elite-25.jpg",
  }),
  make({
    id: 13, sku: "MST-MAL-FASADNA",
    name: "Малярна стрічка Mustang фасадна синя 48мм × 25м",
    brand: "Mustang", category: "malyarna",
    width: 48, length: 25, thickness: 140, glue: "Акриловий", tempRange: "−10…+90°C",
    color: "blue",
    price: 99, optPrice: 79, optThreshold: 50, stock: 1850, rating: 4.7, reviews: 84,
    badges: [],
    description: "Фасадна стрічка для зовнішніх робіт. Витримує дощ і сонце до 14 днів, не залишає слідів на штукатурці.",
    image: "mst-mal-fasadna.jpg",
  }),

  // ─── Двосторонній скотч ─────────────────────────────────────────────
  make({
    id: 14, sku: "MST-2S-FOAM-SUPER",
    name: "Двостороння клейка стрічка на спіненій основі Суперміцна Mustang",
    brand: "Mustang", category: "dvostoronniy",
    width: 19, length: 5, thickness: 1100, glue: "Акриловий VHB-аналог", tempRange: "−40…+120°C",
    color: "white",
    price: 50, optPrice: 40, optThreshold: 100, stock: 3200, rating: 4.8, reviews: 312,
    badges: ["hit"],
    description: "Спінена двостороння стрічка 1мм. Кріплення без свердлення на скло, метал, пластик. Зчеплення до 8 кг/м.",
    image: "mst-2s-foam-super.png",
  }),
  make({
    id: 15, sku: "MST-2S-NANO-TAPE",
    name: "Двостороння клейка стрічка Mustang Nano Tape прозора 19мм × 1м",
    brand: "Mustang", subBrand: "Nano Tape", category: "dvostoronniy",
    width: 19, length: 1, thickness: 2000, glue: "Гелевий силікон", tempRange: "−10…+100°C",
    color: "transparent",
    price: 154, optPrice: 123, optThreshold: 50, stock: 1100, rating: 4.7, reviews: 98,
    badges: ["new"],
    description: "Багаторазова гелева стрічка — клеїться, миється, знову клеїться. Тримає до 1 кг на рівній поверхні. Без слідів.",
    image: "mst-2s-nano-tape.jpg",
  }),
  make({
    id: 16, sku: "MST-2S-PARO-GIDRO",
    name: "Двостороння стрічка для паро- та гідробар'єру Mustang 30мм × 15м",
    brand: "Mustang", category: "dvostoronniy",
    width: 30, length: 15, thickness: 800, glue: "Каучуковий", tempRange: "−40…+90°C",
    color: "yellow",
    price: 130, optPrice: 104, optThreshold: 50, stock: 1450, rating: 4.7, reviews: 76,
    badges: ["new"],
    description: "Спеціалізована стрічка для герметизації паро- і гідроізоляційних плівок у дахах і стінах. Сертифікована для будівництва.",
    image: "mst-2s-paro-gidro.jpg",
  }),
  make({
    id: 17, sku: "MST-2S-PROF-MOMENT",
    name: "Двостороння стрічка PROF Момент Mustang прозора 9мм × 5м",
    brand: "Mustang", subBrand: "Prof Line", category: "dvostoronniy",
    width: 9, length: 5, thickness: 230, glue: "Каучуковий", tempRange: "−10…+70°C",
    color: "transparent",
    price: 60, optPrice: 48, optThreshold: 50, stock: 2100, rating: 4.7, reviews: 142,
    badges: [],
    description: "Тонка прозора двостороння стрічка для надшвидкої фіксації. Декор, монтаж, ремонт — миттєвий захоп.",
    image: "mst-2s-prof-moment.jpg",
  }),
  make({
    id: 18, sku: "MST-2S-THIN-45-10",
    name: "Двостороння тонка стрічка Mustang 45мм × 10м (ATD4510)",
    brand: "Mustang", category: "dvostoronniy",
    width: 45, length: 10, thickness: 80, glue: "Акриловий", tempRange: "−10…+80°C",
    color: "white",
    price: 50, optPrice: 40, optThreshold: 100, stock: 4200, rating: 4.7, reviews: 234,
    badges: [],
    description: "Тонка двостороння на поліпропіленовій основі — для рекламних стендів, килимового покриття, виставкових конструкцій.",
    image: "mst-2s-thin-45-10.jpg",
  }),
  make({
    id: 19, sku: "MST-2S-TEXTILE-50",
    name: "Двостороння стрічка на тканинній основі Mustang 50мм × 10м",
    brand: "Mustang", category: "dvostoronniy",
    width: 50, length: 10, thickness: 220, glue: "Каучуковий", tempRange: "−20…+80°C",
    color: "white",
    price: 93, optPrice: 74, optThreshold: 50, stock: 1850, rating: 4.7, reviews: 132,
    badges: [],
    description: "Армована тканинною основою — повна сумісність з Gaffer-tape стандартом. Для сцени, виставок, килимів.",
    image: "mst-2s-textile.jpg",
  }),

  // ─── Армований скотч (Duct Tape) ────────────────────────────────────
  make({
    id: 20, sku: "MST-DUCT-GREY-50-50",
    name: "Армована стрічка Mustang сіра 50мм × 50м",
    brand: "Mustang", category: "armovanyi",
    width: 50, length: 50, thickness: 230, glue: "Каучуковий", tempRange: "−20…+80°C",
    color: "grey",
    price: 250, optPrice: 200, optThreshold: 50, stock: 1240, rating: 4.8, reviews: 187,
    badges: ["hit"],
    description: "Класичний сірий Duct Tape 50м — найходовіший SKU для виробництв і логістики. Розривається руками, тримає на ущільненні повітропроводів і аварійних ремонтах.",
    image: "mst-duct-grey-50-50.jpg",
  }),
  make({
    id: 21, sku: "MST-DUCT-GREY-50-10",
    name: "Армована стрічка Mustang сіра 50мм × 10м",
    brand: "Mustang", category: "armovanyi",
    width: 50, length: 10, thickness: 230, glue: "Каучуковий", tempRange: "−20…+80°C",
    color: "grey",
    price: 54, optPrice: 43, optThreshold: 100, stock: 5600, rating: 4.7, reviews: 245,
    badges: [],
    description: "Той самий Duct Tape, малий рулон 10м. Пробний SKU для нових клієнтів і роздрібного попиту.",
    image: "mst-duct-grey-50-10.jpg",
  }),
  make({
    id: 22, sku: "MST-DUCT-UNIV-50-40",
    name: "Армована стрічка універсальна Mustang 50мм × 40м (DT)",
    brand: "Mustang", category: "armovanyi",
    width: 50, length: 40, thickness: 250, glue: "Каучуковий", tempRange: "−20…+90°C",
    color: "grey",
    price: 166, optPrice: 133, optThreshold: 50, stock: 1850, rating: 4.7, reviews: 142,
    badges: [],
    description: "Підсилена версія Duct Tape — товщий шар клею для важких робіт. Кріплення на бруд, пил, вологість.",
    image: "mst-duct-univ-50-40.jpg",
  }),
  make({
    id: 23, sku: "MST-DUCT-BLUE-WATER",
    name: "Армована стрічка Mustang вологостійка синя 50мм × 10м",
    brand: "Mustang", category: "armovanyi",
    width: 50, length: 10, thickness: 270, glue: "Каучуковий", tempRange: "−10…+80°C",
    color: "blue",
    price: 69, optPrice: 55, optThreshold: 100, stock: 2840, rating: 4.7, reviews: 96,
    badges: ["new"],
    description: "Вологостійка версія Duct Tape для герметизації труб, сантехніки, басейнів. Не відклеюється у воді.",
    image: "mst-duct-blue-water.jpg",
  }),

  // ─── Електроізоляційна стрічка (ПВХ) ────────────────────────────────
  make({
    id: 24, sku: "MST-PVC-BLACK-19-20",
    name: "Ізоляційна стрічка Mustang 19мм × 20м чорна (ПВХ)",
    brand: "Mustang", category: "izolyaciyna",
    width: 19, length: 20, thickness: 150, glue: "Каучуковий", tempRange: "−10…+80°C",
    color: "black",
    price: 108, optPrice: 86, optThreshold: 100, stock: 7200, rating: 4.6, reviews: 487,
    badges: ["hit"],
    description: "Електроізоляційна стрічка ПВХ. Витримує до 6000В, негорюча, самозатухаюча. Маркування фаз, ізоляція з'єднань.",
    image: "mst-pvc-black-19-20.jpg",
  }),
  make({
    id: 25, sku: "MST-PVC-BLUE-15-10",
    name: "Ізоляційна стрічка Mustang 15мм × 10м синя (ПВХ)",
    brand: "Mustang", category: "izolyaciyna",
    width: 15, length: 10, thickness: 150, glue: "Каучуковий", tempRange: "−10…+80°C",
    color: "blue",
    price: 25, optPrice: 20, optThreshold: 100, stock: 9800, rating: 4.6, reviews: 312,
    badges: [],
    description: "Синя ізоляційна для маркування нульового проводу. Бюджетний рулон 10м.",
    image: "mst-pvc-blue-15.jpg",
  }),

  // ─── Алюмінієва і термостійка ───────────────────────────────────────
  make({
    id: 26, sku: "MST-ALU-50-5",
    name: "Скотч алюмінієвий Mustang 50мм × 5м (ALT505)",
    brand: "Mustang", category: "alyuminieva",
    width: 50, length: 5, thickness: 60, glue: "Акриловий", tempRange: "−40…+170°C",
    color: "silver",
    price: 30, optPrice: 24, optThreshold: 100, stock: 6800, rating: 4.7, reviews: 215,
    badges: [],
    description: "Алюмінієва фольгована стрічка 5м. Ущільнення повітропроводів, теплоізоляція, відображення тепла. До +170°C.",
    image: "mst-alu-50-5.jpg",
  }),
  make({
    id: 27, sku: "MST-ALU-50-10",
    name: "Алюмінієва стрічка Mustang 50мм × 10м",
    brand: "Mustang", category: "alyuminieva",
    width: 50, length: 10, thickness: 60, glue: "Акриловий", tempRange: "−40…+170°C",
    color: "silver",
    price: 62, optPrice: 50, optThreshold: 100, stock: 4200, rating: 4.7, reviews: 178,
    badges: [],
    description: "Більший рулон 10м — для пакета будівельника, теплоізоляції котлів і камінів.",
    image: "mst-alu-50-10.jpg",
  }),
  make({
    id: 28, sku: "MST-ALU-50-40",
    name: "Скотч алюмінієвий Mustang 50мм × 40м (ALT5040)",
    brand: "Mustang", category: "alyuminieva",
    width: 50, length: 40, thickness: 60, glue: "Акриловий", tempRange: "−40…+170°C",
    color: "silver",
    price: 191, optPrice: 152, optThreshold: 50, stock: 1240, rating: 4.8, reviews: 89,
    badges: [],
    description: "Промисловий рулон 40м. Профі-формат для систем вентиляції і HVAC.",
    image: "mst-alu-50-40.jpg",
  }),

  // ─── Захисна плівка Masking Roller ──────────────────────────────────
  make({
    id: 29, sku: "MST-MASK-30-2700",
    name: "Захисна плівка Mustang Masking Roller 30м × 2700мм",
    brand: "Mustang", subBrand: "Masking Roller", category: "masking-roller",
    width: 2700, length: 30, color: "transparent",
    price: 410, optPrice: 328, optThreshold: 20, stock: 480, rating: 4.8, reviews: 64,
    badges: ["new"],
    description: "Малярна плівка з готовою стрічкою — розкочуєш, клеїш одним рухом. Захист стелі, підлоги, меблів від фарби. Ширина 2.7м перекриває все.",
    image: "mst-masking-30-2700.jpg",
  }),
  make({
    id: 30, sku: "MST-MASK-30-1100",
    name: "Захисна плівка Mustang Masking Roller 30м × 1100мм",
    brand: "Mustang", subBrand: "Masking Roller", category: "masking-roller",
    width: 1100, length: 30, color: "transparent",
    price: 223, optPrice: 178, optThreshold: 30, stock: 920, rating: 4.7, reviews: 53,
    badges: [],
    description: "Компактна версія Masking Roller для невеликих об'єктів. Швидкий захист підвіконь, плінтусів, місцевого декору.",
    image: "mst-masking-30-1100.jpg",
  }),
  make({
    id: 31, sku: "MST-MASK-DOORS",
    name: "Захисна плівка Mustang тимчасові двері на блискавці",
    brand: "Mustang", subBrand: "Masking Roller", category: "masking-roller",
    width: 1200, length: 2.2, color: "transparent",
    price: 415, optPrice: 332, optThreshold: 10, stock: 320, rating: 4.8, reviews: 42,
    badges: ["new"],
    description: "Тимчасові двері з блискавкою — захист сусідньої кімнати від пилу під час ремонту. Прозорий поліетилен з міцним каркасом.",
    image: "mst-masking-doors.jpg",
  }),

  // ─── Спецстрічки і сервіс ───────────────────────────────────────────
  make({
    id: 32, sku: "MST-DOCTOR-TAPE",
    name: "Ремонтна клейка стрічка Mustang Doctor Tape 50мм × 10м",
    brand: "Mustang", subBrand: "Doctor Tape", category: "spec",
    width: 50, length: 10, thickness: 400, glue: "Бутил-каучук", tempRange: "−40…+90°C",
    color: "black",
    price: 169, optPrice: 135, optThreshold: 30, stock: 870, rating: 4.9, reviews: 124,
    badges: ["hit", "premium"],
    description: "Бутил-каучукова стрічка-герметик. Лагодить тріщини в дахах, басейнах, трубах, водостоках. Працює навіть під водою.",
    image: "mst-doctor-tape.jpg",
  }),
  make({
    id: 33, sku: "MST-GO-TAPE",
    name: "Захисна стрічка Mustang Go Tape від подряпин котів",
    brand: "Mustang", subBrand: "Go Tape", category: "spec",
    width: 105, length: 5, color: "transparent",
    price: 79, optPrice: 63, optThreshold: 50, stock: 2400, rating: 4.6, reviews: 178,
    badges: ["new"],
    description: "Прозора захисна плівка для меблів від кігтів котів. Не відлякує тварин, просто не дає їм зачепитись. Майже невидима.",
    image: "mst-go-tape.jpg",
  }),
  make({
    id: 34, sku: "MST-SKLOPLASTYK-50-20",
    name: "Скловолоконна стрічка Mustang 50мм × 20м",
    brand: "Mustang", category: "spec",
    width: 50, length: 20, thickness: 200, glue: "Акриловий", tempRange: "−40…+200°C",
    color: "white",
    price: 170, optPrice: 136, optThreshold: 50, stock: 980, rating: 4.7, reviews: 87,
    badges: [],
    description: "Армована скловолокном самоклейка серпʼянка. Армування швів гіпсокартону, ремонт тріщин стін.",
    image: "mst-skloplastyk.jpg",
  }),
  make({
    id: 35, sku: "MST-LINE-18",
    name: "Клейка стрічка-лінійка Mustang 18мм × 20м (2 шт)",
    brand: "Mustang", category: "spec",
    width: 18, length: 20, thickness: 100, glue: "Акриловий", tempRange: "до +60°C",
    color: "yellow",
    price: 273, optPrice: 218, optThreshold: 20, stock: 420, rating: 4.8, reviews: 38,
    badges: ["premium"],
    description: "Стрічка з нанесеною шкалою — вимірюй і клей одночасно. Для розмітки в столярці, меблівництві, виставках.",
    image: "mst-mal-line-18.jpg",
  }),
];

export const CATEGORIES: { slug: ProductCategory; name: string; icon: string; count: number }[] = [
  { slug: "bopp",            name: "Пакувальний скотч (BOPP)",     icon: "Package",       count: PRODUCTS.filter(p => p.category === "bopp").length },
  { slug: "malyarna",        name: "Малярна стрічка",              icon: "PaintRoller",   count: PRODUCTS.filter(p => p.category === "malyarna").length },
  { slug: "dvostoronniy",    name: "Двосторонній скотч",           icon: "Layers",        count: PRODUCTS.filter(p => p.category === "dvostoronniy").length },
  { slug: "armovanyi",       name: "Армований скотч (Duct Tape)",  icon: "Wrench",        count: PRODUCTS.filter(p => p.category === "armovanyi").length },
  { slug: "izolyaciyna",     name: "Електроізоляційна (ПВХ)",      icon: "Zap",           count: PRODUCTS.filter(p => p.category === "izolyaciyna").length },
  { slug: "alyuminieva",     name: "Алюмінієва і термостійка",     icon: "Flame",         count: PRODUCTS.filter(p => p.category === "alyuminieva").length },
  { slug: "masking-roller",  name: "Захисна плівка Masking Roller", icon: "Brush",        count: PRODUCTS.filter(p => p.category === "masking-roller").length },
  { slug: "spec",            name: "Спецстрічки і сервіс",         icon: "Sparkles",      count: PRODUCTS.filter(p => p.category === "spec").length },
];

export const COLOR_SWATCHES: { value: Color; name: string; hex: string }[] = [
  { value: "purple",      name: "Фіолетовий (Delicate Line)", hex: "#8B5CF6" },
  { value: "red",         name: "Червоний (Da Vinci Red)",     hex: "#DC2626" },
  { value: "green",       name: "Зелений (Da Vinci Green)",    hex: "#16A34A" },
  { value: "blue",        name: "Синій (фасадна / вологостійка)", hex: "#2563EB" },
  { value: "yellow",      name: "Жовтий (паро-гідробар'єр)",   hex: "#FACC15" },
  { value: "black",       name: "Чорний (ізоляційна / Doctor)", hex: "#111827" },
  { value: "grey",        name: "Сірий (Duct Tape)",            hex: "#6B7280" },
  { value: "silver",      name: "Сріблястий (алюмінієва)",      hex: "#94A3B8" },
];

export const REVIEWS = [
  { author: "Олександр П.", date: "12.04.2026", rating: 5, text: "Замовляли 200 рулонів Magnum на склад, тримає добре, шов не розходиться. Відправили день-у-день, прийшло на наступний день у Львів." },
  { author: "Марина К.",    date: "03.04.2026", rating: 5, text: "Брали Da Vinci Green під фасад — три тижні на сонці, зняли без слідів. Італійська якість, не наша." },
  { author: "Дмитро С.",    date: "27.03.2026", rating: 4, text: "Делікат Лайн дешевше ніж в Епіцентрі, рулон щільний. Краї рівні, при знятті жодних залишків. Один рулон з партії був з нерівним торцем — замінили без питань." },
  { author: "Юлія В.",      date: "18.03.2026", rating: 5, text: "Працюємо з Mustang вже рік, постачання стабільне, рахунок з ПДВ виставляють швидко. Менеджер Андрій — окрема подяка." },
  { author: "Сергій Б.",    date: "09.03.2026", rating: 5, text: "Замовляв Doctor Tape для тріщини в басейні — приклеїв під водою, тримає вже 4 місяці. Заявлено, що працює — реально працює." },
];

export const BRANDS = [
  "Mustang",
  "Da Vinci Line",
  "Delicate Line",
  "Magnum",
  "Doctor Tape",
  "Go Tape",
  "Masking Roller",
  "Nano Tape",
];
