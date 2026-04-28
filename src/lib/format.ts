export const uah = (n: number) => `₴${n.toLocaleString("uk-UA")}`;
export const plural = (n: number, forms: [string, string, string]) => {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
};
