export const parseDate = (year, month, day) =>
  new Date(Date.UTC(year, month - 1, day));
