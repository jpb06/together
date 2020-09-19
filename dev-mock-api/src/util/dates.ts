import moment from "moment";

export const nowPlusMinutes = (minutes: number) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);

  return date;
};

export const splittedDateToMoment = (
  year: number,
  month: number,
  day: number
) =>
  moment.utc(
    `${year}-${(month + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`
  );
