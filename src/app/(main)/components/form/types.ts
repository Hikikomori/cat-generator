import { textFonts } from '@/const'
import { ICats } from '@/api/types'
import { FormProps } from 'antd'

export interface IFormProps extends FormProps {
  cats: ICats
}

export interface IFormValues {
  type: 'image' | 'gif'
  text: string
  font: typeof textFonts[number]
  fontSize: number
  fontColor: string
  blur: number
  filter: 'mono' | 'negate' | 'custom' | undefined
  brightness: number
  saturation: number
  hue: number
  lightness: number
  color: {
    r: number,
    g: number,
    b: number
  } | undefined
  mode: 'edit' | 'new'
}

export interface IGetCatImageParams extends Partial<Omit<IFormValues,'type' | 'text' | 'color' | 'mode'>> {
  r?: number
  g?: number
  b?: number
}
