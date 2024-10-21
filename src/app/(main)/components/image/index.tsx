'use client';

import { HeartOutlined } from '@ant-design/icons';
import { Button, notification, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, MouseEvent, ReactElement, useEffect } from 'react';

import ImageCore from '@/components/image';
import { IAdditionalToolbarAction } from '@/components/image/types';
import { useStore } from '@/hooks';

import { IImageProps as IProps } from './types';

const { useNotification } = notification;

const Image: FC<IProps> = observer((props) => {
  const { alt, id, src, ...restProps } = props;

  const [notificationApi, notificationContextHolder] = useNotification();

  const { addToGallery, src: storedSrc, setId, setSrc } = useStore();

  const handleAddToGalleryClick = async (evt: MouseEvent) => {
    evt.stopPropagation()
    
    await addToGallery();

    notificationApi.success({
      description: 'Котик добавлен в галерею',
      message: 'Успешно',
      duration: 2,
    });
  };

  const addToGalleryAction: IAdditionalToolbarAction = {
    icon: <HeartOutlined onClick={handleAddToGalleryClick} />,
    tooltip: 'Добавить в галерею',
  };
  
  const renderMaskButton = (): ReactElement => (
    <Tooltip title='Добавить в галерею' placement='bottomRight'>
      <Button
        onClick={handleAddToGalleryClick}
        size='large'
        type='primary'
        shape='circle'
        icon={<HeartOutlined />}
      />
    </Tooltip>
  )

  useEffect(() => {
    src && setSrc(src);
    setId(id);
  }, [id, setId, setSrc, src]);

  return (
    <>
      {notificationContextHolder}
      <ImageCore
        additionalToolbarActions={[addToGalleryAction]}
        alt={alt}
        maskButton={renderMaskButton()}
        src={storedSrc || src}
        {...restProps}
      />
    </>
  );
});

export default Image;
