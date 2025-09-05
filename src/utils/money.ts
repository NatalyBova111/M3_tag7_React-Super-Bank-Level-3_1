import type { Mood } from "../types/bank"; 

export const EUR = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

export const centsToEuro = (cents: number) => EUR.format(cents / 100);

/** принимает "25,50" или "25.50" -> центы; NaN если неверно */
export function parseAmountToCents(input: string): number {
  if (!input) return NaN;
  const s = input.trim().replace(/\s|_/g, "").replace(",", ".");
  if (!/^[-+]?\d*(?:\.\d{0,2})?$/.test(s)) return NaN;
  const val = Number(s);
  return Number.isNaN(val) ? NaN : Math.round(val * 100);
}

export function moodForBalance(
  balanceCents: number
): { mood: Mood; color: string; label: string } {
  const eur = balanceCents / 100;
  if (eur < -500) return { mood: "ko", color: "#ef4444", label: "Stark überzogen" };
  if (eur < 0) return { mood: "sad", color: "#f87171", label: "Überzogen" };
  if (eur === 0) return { mood: "shocked", color: "#f59e0b", label: "Nullsaldo" };
  if (eur < 500) return { mood: "happy", color: "#3b82f6", label: "Stabil" };
  if (eur < 2000) return { mood: "blissful", color: "#10b981", label: "Solide Rücklagen" };
  return { mood: "lovestruck", color: "#8b5cf6", label: "Vermögend 😎" };
}
