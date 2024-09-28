'use client'

import {
  DeleteOutlined
} from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'

import ImageCore from '@/components/image'
import { IAdditionalToolbarAction } from '@/components/image/types'

import { useStore } from '@/hooks'
import { getCatImageUrl } from '@/utils'

import {
  IImageProps as IProps
} from './types'

import styles from './image.module.scss'

const Image: FC<IProps> = observer((props) => {
  const {
    notificationApi,
    uuid,
    ...restProps
  } = props
  
  const {
    galleryItems,
    removeFromGallery
  } = useStore();
  
  const {
    id,
    src,
    params,
    text
  } = galleryItems[uuid]
  
  const handleRemoveFromGalleryClick = async () => {
    await removeFromGallery(uuid)
    
    notificationApi.success({
      description: 'Котик удален из галереи',
      message: 'Успешно',
      duration: 2
    })
  }
  
  const removeFromGalleryAction: IAdditionalToolbarAction = {
    icon: <DeleteOutlined onClick={handleRemoveFromGalleryClick} />,
    tooltip: 'Удалить из галереи'
  }
  
  return (
    <ImageCore
      additionalToolbarActions={[
        removeFromGalleryAction
      ]}
      className={styles.image}
      src={src || getCatImageUrl(id, text, params)}
      {...restProps}
    />
  )
})

export default Image


