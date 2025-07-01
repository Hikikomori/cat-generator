import { ICat, ICats } from './types';

const isCats = (cats: unknown): cats is ICat[] =>
  (cats as ICat[]).every((cat) => cat.id.length > 0);

const getCatsUrl = (count: number): string => (
  `${process.env.NEXT_PUBLIC_DOMAIN}/api/cats?limit=${count}`
);

const countUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/api/count`;

export const getAllCats = async (): Promise<ICats> => {
  const countResponse = await fetch(countUrl, {
    next: {
      revalidate: 10,
    },
  });
  
  if (!countResponse.ok) {
    throw new Error('Failed to fetch count');
  }
  
  const { count } = await countResponse.json();
  
  const catsResponse = await fetch(getCatsUrl(count), {
    next: {
      revalidate: 10,
    },
  });

  if (!catsResponse.ok) {
    throw new Error('Failed to fetch cats');
  }

  const cats = await catsResponse.json();

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
