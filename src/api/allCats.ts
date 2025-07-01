import { ICat, ICats } from './types';

const isCats = (cats: unknown): cats is ICat[] =>
  (cats as ICat[]).every((cat) => cat.id.length > 0);

const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/cats?limit=-1`;

export const getAllCats = async (): Promise<ICats> => {
  const response = await fetch(url, {
    next: {
      revalidate: 10,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cats');
  }

  const cats = await response.json();

  if (!isCats(cats)) throw new Error('Cats data error');

  return cats.reduce(
    (acc: ICats, cat: ICat) => {
      const { id, mimetype } = cat;

      const type = mimetype === 'image/gif' ? 'gif' : 'image';

      return {
        ...acc,
        [type]: [...acc[type], id],
      };
    },
    {
      gif: [],
      image: [],
    },
  );
};
