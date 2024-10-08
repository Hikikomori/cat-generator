'use client';

import { Flex, notification, Typography } from 'antd';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { FC, ReactElement, useEffect, useState } from 'react';

import { useStore } from '@/hooks';

import GalleryImage from './components/image';

import styles from './gallery.module.scss';

const { useNotification } = notification;
const { Title } = Typography;

const Gallery: FC = observer(() => {
  const [notificationApi, notificationContextHolder] = useNotification();

  const [isClient, setIsClient] = useState(false);

  const { galleryList } = useStore();

  const renderPlaceholder = (): ReactElement => {
    return (
      <Flex className='full-height' vertical justify='center' align='center'>
        <Title>В галерее пусто. Добавьте котиков с главной страницы</Title>
        <div className={styles.placeholderImageWrapper}>
          <Image
            className={styles.placeholderImage}
            src='/blep.jpg'
            alt='Blep'
            width={750}
            height={734}
            priority
          />
        </div>
      </Flex>
    );
  };

  const renderGallery = (): ReactElement => (
    <Flex gap={25} wrap>
      {galleryList.map((uuid) => (
        <GalleryImage
          key={uuid}
          notificationApi={notificationApi}
          uuid={uuid}
          width={228}
          height={228}
        />
      ))}
    </Flex>
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className={cn(styles.gallery, 'full-height')}>
      {notificationContextHolder}
      <div
        className={cn('inner', {
          [styles.inner]: galleryList.length,
        })}
      >
        {!galleryList.length ? renderPlaceholder() : renderGallery()}
      </div>
    </div>
  );
});

export default Gallery;
