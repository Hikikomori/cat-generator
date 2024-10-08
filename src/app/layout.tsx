import React, { PropsWithChildren } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Flex, Layout, Menu, Space } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import { ItemType } from 'antd/lib/menu/interface';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import 'antd/dist/reset.css';
import './globals.scss';
import styles from './layout.module.scss';

import Neko from '@/components/neko';
import StoreWrapper from '@/store/provider';

export const metadata: Metadata = {
  title: 'Генератор котиков',
};

const menuItems: ItemType[] = [
  {
    key: 'main',
    label: <Link href='/'>Главная</Link>,
  },
  {
    key: 'gallery',
    label: <Link href='/gallery'>Галерея</Link>,
  },
];

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='ru'>
      <body>
        <Neko />
        <StoreWrapper>
          <AntdRegistry>
            <Layout className='full-height'>
              <Header className={styles.header}>
                <Flex
                  align='flex-end'
                  justify='space-between'
                  className='inner'
                >
                  <Link className={styles.header_logo} href='/'>
                    <Space size='large'>
                      <Image
                        src='/logo.png'
                        width={68}
                        height={58}
                        alt='Котэ'
                      />
                      Генератор котиков
                    </Space>
                  </Link>
                  <Menu
                    items={menuItems}
                    mode='horizontal'
                    theme='dark'
                    selectable={false}
                  />
                </Flex>
              </Header>
              <Content className={styles.content}>{children}</Content>
              <Footer>
                <Flex className='inner' justify='space-between'>
                  <Space align='center'>
                    Made by
                    <a href='https://github.com/Hikikomori' target='_blank'>
                      Hikikomori
                    </a>
                  </Space>
                  <Space align='center'>
                    Powered by
                    <a href={process.env.NEXT_PUBLIC_DOMAIN} target='_blank'>
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
          </AntdRegistry>
        </StoreWrapper>
      </body>
    </html>
  );
}
