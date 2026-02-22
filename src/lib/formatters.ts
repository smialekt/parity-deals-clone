const compactNumberFormatter = new Intl.NumberFormat('en-EN', {
  notation: 'compact',
});
export function formatCompactNumber(number: number) {
  return compactNumberFormatter.format(number);
}
