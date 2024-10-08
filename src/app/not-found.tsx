import { Button, Flex } from 'antd';
import Title from 'antd/lib/typography/Title';
import Image from 'next/image';
import Link from 'next/link';

import styles from './error.module.scss';

const NotFound = () => {
  return (
    <div className='inner'>
      <Flex className='full-height' vertical justify='center' align='center'>
        <Title>Тут ничего нет, как вы сюда попали?</Title>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src='/cat_in_box.jpg'
            alt='Cat in box'
            width={1160}
            height={773}
            priority
          />
        </div>
        <Link href='/'>
          <Button type='primary' size='large'>
            На главную
          </Button>
        </Link>
      </Flex>
    </div>
  );
};

export default NotFound;
