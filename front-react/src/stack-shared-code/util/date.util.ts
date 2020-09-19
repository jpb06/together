export const splittedDateToString = (
  year: number,
  month: number,
  day: number
) =>
  `${day.toString().padStart(2, "0")}/${(month + 1)
    .toString()
    .padStart(2, "0")}/${year}`;
