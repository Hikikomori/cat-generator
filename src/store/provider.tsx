'use client'

import React, { createContext, FC, PropsWithChildren } from 'react'

import store from './store'

export const StoreContext = createContext(store)

const StoreWrapper: FC<PropsWithChildren> = ({ children}) => (
  <StoreContext.Provider value={store}>
    {children}
  </StoreContext.Provider>
)

export default StoreWrapper
