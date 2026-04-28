import { Product } from "@/data/products";
import tapeTransparent from "@/assets/tape-transparent.png";
import tapeBrown from "@/assets/tape-brown.png";
import tapeOrange from "@/assets/tape-orange.png";
import tapeRed from "@/assets/tape-red.png";
import tapeYellow from "@/assets/tape-yellow.png";
import tapeBlue from "@/assets/tape-blue.png";
import tapeGreen from "@/assets/tape-green.png";
import tapeBlack from "@/assets/tape-black.png";
import tapeWhite from "@/assets/tape-white.png";
import tapeSilver from "@/assets/tape-silver.png";
import tapeGrey from "@/assets/tape-grey.png";
import tapeMixed from "@/assets/tape-mixed.png";
import dispenser from "@/assets/dispenser.png";
import stretch from "@/assets/stretch.png";
import bubble from "@/assets/bubble.png";

// Real Mustang product photos — resolved at build time by Vite.
// Eager import keeps URLs synchronous and tree-shakes unused files.
const productPhotoModules = import.meta.glob<{ default: string }>(
  "@/assets/products/*.{jpg,jpeg,png,webp}",
  { eager: true }
);
const productPhotos: Record<string, string> = Object.fromEntries(
  Object.entries(productPhotoModules).map(([path, mod]) => {
    const filename = path.split("/").pop() ?? path;
    return [filename, mod.default];
  })
);

const COLOR_PLACEHOLDER: Record<string, string> = {
  transparent: tapeTransparent,
  brown: tapeBrown,
  orange: tapeOrange,
  red: tapeRed,
  yellow: tapeYellow,
  blue: tapeBlue,
  green: tapeGreen,
  black: tapeBlack,
  white: tapeWhite,
  silver: tapeSilver,
  grey: tapeGrey,
  pink: tapeRed,
  purple: tapeBlue,
  mixed: tapeMixed,
};

function pickImage(product: Product): string {
  // 1. Real Mustang photo if SKU has one.
  if (product.image) {
    const real = productPhotos[product.image];
    if (real) return real;
  }
  // 2. Category-specific placeholders for special types.
  if (product.category === "spec" && product.color === "white") return stretch;
  if (product.category === "masking-roller") return stretch;
  // 3. Color-mapped fallback (legacy AI-generated rolls).
  return COLOR_PLACEHOLDER[product.color] ?? tapeOrange;
}

interface TapeImageProps {
  product: Product;
  size?: number;
}

export function TapeImage({ product, size = 180 }: TapeImageProps) {
  const src = pickImage(product);
  return (
    <img
      src={src}
      alt={product.name}
      width={size}
      height={size}
      loading="lazy"
      className="object-contain select-none pointer-events-none"
      style={{ width: size, height: size }}
    />
  );
}
