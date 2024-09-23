import { makeAutoObservable } from 'mobx'
import { IGetCatImageParams } from '@/app/components/form/types'

class AppStore {
  id: string = ''
  src: string = ''
  params: IGetCatImageParams = {}
  
  constructor() {
    makeAutoObservable(this)
  }
  
  setId = (id: string) => {
    this.id = id
  }
  
  setParams = (params: IGetCatImageParams) => {
    this.params = params
  }
  
  setSrc = (src: string) => {
    this.src = src
  }
}

const store = new AppStore()
export default store
