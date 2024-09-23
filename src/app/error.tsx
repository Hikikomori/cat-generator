'use client'

import { Flex, Typography } from 'antd'
import Image from 'next/image'

const { Title } = Typography

import styles from './error.module.scss'

const Error = () => {
  return (
    <Flex
      vertical
      justify='center'
      align='center'
      style={{height:'100%'}}
    >
      <Title>Упс, похоже котики уронили сервер, попробуйте позже</Title>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src='/server_cat.jpg'
          alt='Server Cat'
          width={1024}
          height={1024}
          priority
        />
      </div>
    </Flex>
  )
}

export default Error

