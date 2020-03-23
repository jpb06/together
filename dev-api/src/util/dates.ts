const nowPlusMinutes = (minutes: number) => {
  let date = new Date();
  date.setMinutes(date.getMinutes() + minutes);

  return date;
};

export { nowPlusMinutes };
