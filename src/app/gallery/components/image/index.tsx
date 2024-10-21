'use client';

import { Button, Flex, Spin, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import React, { FC, MouseEvent, ReactElement } from 'react';

import ImageCore from '@/components/image';
import { IAdditionalToolbarAction } from '@/components/image/types';

import { useStore } from '@/hooks';
import { getCatImageUrl } from '@/utils';

import { IImageProps as IProps } from './types';

import styles from './image.module.scss';

const renderSpinner = (): ReactElement => (
  <Flex className='full-height' align='center' justify='center'>
    <Spin size='large' />
  </Flex>
);

const Image: FC<IProps> = observer((props) => {
  const { notificationApi, uuid, ...restProps } = props;

  const { galleryItems, removeFromGallery } = useStore();

  const { id, src, params, text } = galleryItems[uuid];

  const handleRemoveFromGalleryClick = async (evt: MouseEvent) => {
    evt.stopPropagation()
    
    await removeFromGallery(uuid);

    notificationApi.success({
      description: 'Котик удален из галереи',
      message: 'Успешно',
      duration: 2,
    });
  };

  const removeFromGalleryAction: IAdditionalToolbarAction = {
    icon: <DeleteOutlined onClick={handleRemoveFromGalleryClick} />,
    tooltip: 'Удалить из галереи',
  };
  
  const renderMaskButton = (): ReactElement => (
    <Tooltip title='Удалить из галереи' placement='bottomRight'>
      <Button
        danger
        onClick={handleRemoveFromGalleryClick}
        size='large'
        type='primary'
        shape='circle'
        icon={<DeleteOutlined />}
      />
    </Tooltip>
  )

  return (
    <ImageCore
      additionalToolbarActions={[removeFromGalleryAction]}
      className={styles.image}
      maskButton={renderMaskButton()}
      placeholder={renderSpinner()}
      src={src || getCatImageUrl(id, text, params)}
      {...restProps}
    />
  );
});

export default Image;
