import { ImageProps } from 'antd'
import { NotificationInstance } from 'antd/lib/notification/interface'

export interface IImageProps extends ImageProps {
  notificationApi: NotificationInstance
  uuid: string
}
