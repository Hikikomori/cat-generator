import { Control, UseFormSetValue } from 'react-hook-form'
import { IFormValues } from '../../types'

export interface IFilterModalProps {
  control: Control<IFormValues>
  open: boolean
  onClose: () => void
  onSetValue: UseFormSetValue<IFormValues>
}
