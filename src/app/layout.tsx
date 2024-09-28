import React, { PropsWithChildren } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Button, ConfigProvider, Flex, Layout, Space } from 'antd'
import { Content, Footer, Header } from 'antd/lib/layout/layout'
import { Metadata } from 'next'

import 'antd/dist/reset.css'
import './globals.scss'
import styles from './layout.module.scss'

import StoreWrapper from '@/store/provider'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Генератор котиков'
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='ru'>
      <body>
        <StoreWrapper>
          <AntdRegistry>
            <ConfigProvider theme={{
              cssVar: true,
              hashed: false
            }}>
              <Layout
                className='full-height'
              >
                <Header
                  className={styles.header}
                >
                  <Flex justify='space-between' className='inner'>
                    <Link className={styles.header_link} href='/'>
                      Генератор котиков (лого)
                    </Link>
                    <Link className={styles.header_link} href='/gallery'>
                      Галерея
                    </Link>
                  </Flex>
                </Header>
                <Content className={styles.content}>
                  {children}
                </Content>
                <Footer>
                  <Flex className='inner' justify='space-between'>
                    <Space align='center'>
                      Made by
                      <a
                        href='https://github.com/Hikikomori'
                        target='_blank'
                      >
                        Hikikomori
                      </a>
                    </Space>
                    <Space align='center'>
                      Powered by
                      <a
                        href={process.env.NEXT_PUBLIC_DOMAIN}
                        target='_blank'
                      >
                        <Space>
                          <Image
                            src={`${process.env.NEXT_PUBLIC_DOMAIN}/cat?width=32&height=32`}
                            width={32}
                            height={32}
                            alt='CATAAS'
                          />
                          CATAAS
                        </Space>
                      </a>
                    </Space>
                  </Flex>
                </Footer>
              </Layout>
            </ConfigProvider>
          </AntdRegistry>
        </StoreWrapper>
      </body>
    </html>
  );
}
