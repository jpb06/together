export function splittedDateToString(year: number, month: number, day: number) {
  return `${day.toString().padStart(2, "0")}/${(month + 1)
    .toString()
    .padStart(2, "0")}/${year}`;
}
