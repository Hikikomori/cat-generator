import { Col, Row } from 'antd'
import React from 'react'

import Image from './components/image'
import Form from './components/form'

import { getAllCats } from '@/api/allCats'
import { getCatImage } from '@/api/catImage'

import { getRandomArrayElement } from '@/utils'

import styles from './page.module.scss'

const Home = async () => {
  const cats = await getAllCats()
  
  const id = getRandomArrayElement(cats.image)
  
  const src = await getCatImage(id)
  
  return (
    <Row
      align='middle'
      justify='center'
      className='full-height'
      gutter={16}
    >
      <Col
        flex='560px'
      >
        <Image
          alt={id}
          className={styles.image}
          id={id}
          width={560}
          height={400}
          src={src}
        />
      </Col>
      <Col
        flex='auto'
        xl={{
          offset: 1,
        }}
      >
        <Form
          className={styles.form}
          cats={cats}
        />
      </Col>
    </Row>
  )
}

export default Home;
