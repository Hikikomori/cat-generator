export const getRandomArrayElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

export const getCatImageUrl = (id: string, text?: string, params?: string) => {
  let url = `${process.env.NEXT_PUBLIC_DOMAIN}/cat/${id}`;

  if (text) {
    url += `/says/${text}`;
  }

  if (params) {
    url += `?${params}`;
  }

  return url;
};
