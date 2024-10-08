import { ImageProps } from 'antd';
import { ReactElement } from 'react';

export interface IAdditionalToolbarAction {
  icon: ReactElement;
  tooltip: string;
}

export interface IImageProps extends ImageProps {
  additionalToolbarActions?: IAdditionalToolbarAction[];
}
