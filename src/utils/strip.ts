export default function strip(number: number) {
  return parseFloat(number.toPrecision(12));
}
