import React, { PropsWithChildren } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, Flex, Layout, Space } from 'antd'
import {
  Content,
  Header,
  Footer
} from 'antd/lib/layout/layout'
import { Metadata } from 'next'

import 'antd/dist/reset.css'
import './globals.scss'
import styles from './layout.module.scss'

import StoreWrapper from '@/store/provider'
import Image from 'next/image'

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
                  <Flex justify='center'>
                    <div className={styles.inner}>
                      <span className={styles.header_title}>
                        Генератор котиков
                      </span>
                    </div>
                  </Flex>
                </Header>
                <Content
                  className={styles.content}
                >
                  <Flex
                    className='full-height'
                    justify='center'
                  >
                    <div className={styles.inner}>
                      {children}
                    </div>
                  </Flex>
                </Content>
                <Footer>
                  <Flex justify='center'>
                    <Flex className={styles.inner} justify='space-between'>
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
