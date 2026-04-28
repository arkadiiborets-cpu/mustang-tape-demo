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

const colorImg: Record<string, string> = {
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
  if (product.category === "dyspensery") return dispenser;
  if (product.category === "stretch") return stretch;
  if (product.category === "bulbashkova") return bubble;
  return colorImg[product.color] || tapeOrange;
}

export function TapeImage({ product, size = 180 }: { product: Product; size?: number }) {
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
