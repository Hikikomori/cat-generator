import { useContext } from 'react';

import { StoreContext } from '@/store/provider';

const useStore = () => useContext(StoreContext);

export default useStore;
