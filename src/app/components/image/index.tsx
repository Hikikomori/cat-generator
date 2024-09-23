'use client'

import { Image as AntImage } from 'antd'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useEffect } from 'react'

import { StoreContext } from '@/store/provider'

import styles from './image.module.scss'

import {
  IImageProps as IProps
} from './types'

const Image: FC<IProps> = observer((props) => {
  const {
    className,
    id,
    src,
    ...restProps
  } = props
  
  const {
    src: storedSrc,
    setId,
    setSrc
  } = useContext(StoreContext);
  
  useEffect(() => {
    src && setSrc(src)
    setId(id)
  }, [id, setId, setSrc, src])
  
  return (
    <AntImage
      src={storedSrc || src}
      className={cn(styles.image, className)}
      {...restProps}
    />
  )
})

export default Image


