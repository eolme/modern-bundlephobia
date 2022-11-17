export const night = (offset: number) => {
  const date = new Date();

  const month = date.getUTCMonth();
  const hours = date.getUTCHours() + offset;

  if (month < 3 || month > 10) {
    return hours > 16 || hours < 10;
  }

  return hours > 20 || hours < 8;
};
