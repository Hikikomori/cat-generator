import { Flex } from 'antd';
import React from 'react';

import Image from 'next/image';

const Loading = () => {
  return (
    <Flex className='full-height' justify='center' align='center'>
      <Image
        src='/loading.gif'
        alt='Loading'
        width={800}
        height={600}
        priority
        unoptimized
      />
    </Flex>
  );
};

export default Loading;
