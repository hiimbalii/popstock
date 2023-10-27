//calculate the delta of 2 prices

export default function calculateDelta(
  originalPrice: number,
  newPrice: number,
  rounding = 2,
): number {
  if (!originalPrice) return 0; //division by 0
  const increase = newPrice - originalPrice;
  const delta = (increase / Math.abs(originalPrice)) * 100;
  if (rounding) return Math.round(delta * 10 * rounding) / (10 * rounding);
  return Math.round(delta);
}
