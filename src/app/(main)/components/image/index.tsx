'use client'

import {
  DownloadOutlined
} from '@ant-design/icons'
import { notification } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { FC, useEffect } from 'react'

import ImageCore from '@/components/image'
import { IAdditionalToolbarAction } from '@/components/image/types'
import { useStore } from '@/hooks'

import {
  IImageProps as IProps
} from './types'

const { useNotification } = notification

const Image: FC<IProps> = observer((props) => {
  const {
    alt,
    id,
    src,
    ...restProps
  } = props
  
  const [
    notificationApi,
    notificationContextHolder
  ] = useNotification()
  
  const {
    addToGallery,
    src: storedSrc,
    setId,
    setSrc
  } = useStore();
  
  const handleAddToGalleryClick = async () => {
    await addToGallery()
    
    notificationApi.success({
      description: 'Котик добавлен в галерею',
      message: 'Успешно',
      duration: 2
    })
  }
  
  const addToGalleryAction: IAdditionalToolbarAction = {
    icon: <DownloadOutlined onClick={handleAddToGalleryClick} />,
    tooltip: 'Добавить в галерею'
  }
  
  useEffect(() => {
    src && setSrc(src)
    setId(id)
  }, [id, setId, setSrc, src])
  
  return (
    <>
      {notificationContextHolder}
      <ImageCore
        additionalToolbarActions={[
          addToGalleryAction
        ]}
        alt={alt}
        src={storedSrc || src}
        {...restProps}
      />
    </>
  )
})

export default Image


