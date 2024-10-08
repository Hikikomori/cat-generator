import { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Генератор котиков - Галерея',
};

const GalleryLayout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default GalleryLayout;
