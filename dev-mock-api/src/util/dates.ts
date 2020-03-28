import * as moment from "moment";

export function nowPlusMinutes(minutes: number) {
  let date = new Date();
  date.setMinutes(date.getMinutes() + minutes);

  return date;
}

export function splittedDateToMoment(year: number, month: number, day: number) {
  return moment.utc(
    `${year}-${(month + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`
  );
}

export function splittedDateToString(year: number, month: number, day: number) {
  return `${day.toString().padStart(2, "0")}/${(month + 1)
    .toString()
    .padStart(2, "0")}/${year}`;
}
