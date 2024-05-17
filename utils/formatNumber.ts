export const formatNumber = (digit: number) => {
  return new Intl.NumberFormat("vi-VN").format(digit);
};
