export const getMonthMatrix = (year: number, month: number): (Date | null)[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const matrix: (Date | null)[] = [];

  for (let i = 0; i < firstDay.getDay(); i++) matrix.push(null);

  for (let d = 1; d <= lastDay.getDate(); d++) matrix.push(new Date(year, month, d));

  while (matrix.length % 7 !== 0) matrix.push(null);

  return matrix;
};

export const isSameDay = (a?: Date | null, b?: Date | null) => {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};
