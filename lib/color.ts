import type { Oklch } from "@/constants/tokens";

const cube = (n: number) => n * n * n;

/** OKLCH → sRGB linear, sem clamp. */
const oklchToLinearRgb = ({ l, c, h }: Oklch) => {
  const rad = (h * Math.PI) / 180;
  const a = c * Math.cos(rad);
  const b = c * Math.sin(rad);

  const l1 = cube(l + 0.396_337_777_4 * a + 0.215_803_757_3 * b);
  const m1 = cube(l - 0.105_561_345_8 * a - 0.063_854_172_8 * b);
  const s1 = cube(l - 0.089_484_177_5 * a - 1.291_485_548 * b);

  return {
    b: -0.004_196_086_3 * l1 - 0.703_418_614_7 * m1 + 1.707_614_701 * s1,
    g: -1.268_438_004_6 * l1 + 2.609_757_401_1 * m1 - 0.341_319_396_5 * s1,
    r: 4.076_741_662_1 * l1 - 3.307_711_591_3 * m1 + 0.230_969_929_2 * s1,
  };
};

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const encode = (n: number) => {
  const v = clamp01(n);
  return v <= 0.003_130_8 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055;
};

export const oklchToHex = (color: Oklch) => {
  const { r, g, b } = oklchToLinearRgb(color);
  const toHex = (n: number) =>
    Math.round(encode(n) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const relativeLuminance = (color: Oklch) => {
  const { r, g, b } = oklchToLinearRgb(color);
  return 0.2126 * clamp01(r) + 0.7152 * clamp01(g) + 0.0722 * clamp01(b);
};

/** Razão de contraste WCAG entre duas cores. */
export const contrastRatio = (a: Oklch, b: Oklch) => {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
};
