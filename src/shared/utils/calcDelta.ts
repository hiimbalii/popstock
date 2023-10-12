//calculate the delta of 2 prices

export default function calculateDelta(
  originalPrice: number,
  newPrice: number,
  rounding = 2
): number {
  const increase = newPrice - originalPrice;
  const delta = (increase / Math.abs(originalPrice)) * 100;
  return (Math.round(delta * 10 * rounding) / (10 * rounding));
}
