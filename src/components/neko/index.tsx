'use client';

import { FC, useEffect, useRef } from 'react';

import { Neko as NekoTS } from 'neko-ts';

const Neko: FC = () => {
  const neko = useRef<NekoTS>();

  useEffect(() => {
    if (!neko.current) {
      neko.current = new NekoTS({
        speed: 0,
      });
    }
  }, [neko]);

  return null;
};

export default Neko;
