'use client'

import React, { createContext, FC, PropsWithChildren, useEffect } from 'react'

import store from './store'

export const StoreContext = createContext(store)

const StoreWrapper: FC<PropsWithChildren> = ({ children}) => {
  useEffect(() => {
    const storedGallery = localStorage.getItem('gallery')
    
    if (!storedGallery) return
    
    const {
      setGallery
    } = store
    
    setGallery(JSON.parse(storedGallery))
  }, [])
  
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreWrapper
