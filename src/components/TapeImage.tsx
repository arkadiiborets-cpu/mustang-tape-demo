import { Product } from "@/data/products";

const colorMap: Record<string, string> = {
  transparent: "#E5E7EB", brown: "#8B5A2B", red: "#DC2626", blue: "#2563EB",
  green: "#16A34A", yellow: "#FACC15", black: "#1F2937", white: "#F9FAFB",
  orange: "#FF6B00", pink: "#EC4899", purple: "#8B5CF6", grey: "#6B7280",
  silver: "#C0C0C0", mixed: "#FF6B00",
};

export function TapeImage({ product, size = 180 }: { product: Product; size?: number }) {
  const c = colorMap[product.color] || "#FF6B00";
  const isMix = product.color === "mixed";
  return (
    <svg viewBox="0 0 200 160" width={size} height={(size * 160) / 200} className="select-none">
      <defs>
        <radialGradient id={`g-${product.id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.15" />
        </radialGradient>
      </defs>
      {/* Outer ring */}
      <ellipse cx="100" cy="80" rx="70" ry="70" fill={isMix ? "#FF6B00" : c} stroke="#0F2A47" strokeOpacity="0.15" strokeWidth="1.5" />
      {isMix && (
        <>
          <path d="M100 10 A70 70 0 0 1 170 80 L100 80 Z" fill="#2563EB" />
          <path d="M170 80 A70 70 0 0 1 100 150 L100 80 Z" fill="#16A34A" />
          <path d="M100 150 A70 70 0 0 1 30 80 L100 80 Z" fill="#FACC15" />
        </>
      )}
      <ellipse cx="100" cy="80" rx="70" ry="70" fill={`url(#g-${product.id})`} />
      {/* Inner hole */}
      <ellipse cx="100" cy="80" rx="28" ry="28" fill="#F5DEB3" stroke="#8B5A2B" strokeWidth="1" />
      <ellipse cx="100" cy="80" rx="22" ry="22" fill="#FFF8E7" />
      {/* Side band suggesting wound tape */}
      <ellipse cx="100" cy="80" rx="70" ry="14" fill={isMix ? "#FF6B00" : c} opacity="0.85" />
      <ellipse cx="100" cy="80" rx="28" ry="6" fill="#F5DEB3" />
      {product.color === "transparent" && (
        <text x="100" y="84" textAnchor="middle" fontSize="9" fill="#6B7280" fontWeight="600">BOPP</text>
      )}
    </svg>
  );
}
