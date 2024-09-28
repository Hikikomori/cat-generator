import { makeAutoObservable, reaction } from 'mobx'
import { v4 } from 'uuid'

import { IGallery, IGalleryItem } from './types'

class AppStore {
  galleryItems: Record<string, IGalleryItem> = {}
  galleryList: string[] = []
  id: string = ''
  src: string = ''
  params: string = ''
  text: string = ''
  
  constructor() {
    makeAutoObservable(this)
  }
  
  addToGallery = async () => {
    const {
      id,
      src,
      params,
      text
    } = this
    
    const uuid = v4()
    
    this.galleryItems = {
      ...this.galleryItems,
      [uuid]: {
        id,
        src,
        params,
        text
      }
    }
    
    this.galleryList = [
      ...this.galleryList,
      uuid
    ]
    
    return this.galleryList
  }
  
  removeFromGallery = async (uuid: string) => {
    delete this.galleryItems[uuid]
    
    this.galleryList = this.galleryList.filter((id) => id !== uuid)
  }
  
  setGallery = ({items, list}: IGallery) => {
    this.galleryItems = items
    this.galleryList = list
  }
  
  setId = (id: string) => {
    this.id = id
  }
  
  setParams = (params: string) => {
    this.params = params
  }
  
  setSrc = (src: string) => {
    this.src = src
  }
  
  setText = (text: string) => {
    this.text = text
  }
}

const store = new AppStore()
export default store

reaction((): IGallery => {
  const {
    galleryItems,
    galleryList
  } = store
  
  return {
    items: galleryItems,
    list: galleryList
  }
}, (gallery) => {
  const {
    items,
    list
  } = gallery
  
  const itemsToStore: Record<string, IGalleryItem> = list.reduce((acc, key) => {
    const {
      id,
      params,
      text
    } = items[key]
    
    return {
      ...acc,
      [key]: {
        id,
        params,
        text
      }
    }
  }, {})
  
  const galleryToStore: IGallery = {
    items: itemsToStore,
    list
  }
  
  localStorage.setItem('gallery', JSON.stringify(galleryToStore))
})
