import { Image as AntImage, Space, Tooltip } from 'antd';
import {
  EyeOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import cn from 'classnames';
import { ToolbarRenderInfoType } from 'rc-image/lib/Preview';
import React, { FC, ReactElement } from 'react';

import styles from './image.module.scss';

import { IImageProps as IProps } from './types';

const Image: FC<IProps> = (props) => {
  const { additionalToolbarActions, className, src, ...restProps } = props;

  const mask: ReactElement = (
    <Space>
      <EyeOutlined />
      Просмотр
    </Space>
  );

  const toolbarRender = (
    _node: ReactElement,
    info: Omit<ToolbarRenderInfoType, 'current' | 'total'>,
  ): ReactElement => {
    const {
      actions: {
        onFlipY,
        onFlipX,
        onRotateLeft,
        onRotateRight,
        onZoomOut,
        onZoomIn,
      },
      transform: { scale },
    } = info;

    const additionalActions = additionalToolbarActions?.map((action) => {
      const { icon, tooltip } = action;

      return (
        <Tooltip key={tooltip} title={tooltip}>
          <div className='ant-image-preview-operations-operation'>{icon}</div>
        </Tooltip>
      );
    });

    return (
      <div className='ant-image-preview-operations'>
        {additionalActions}
        <Tooltip title='Отразить по вертикали'>
          <div className='ant-image-preview-operations-operation'>
            <SwapOutlined rotate={90} onClick={onFlipY} />
          </div>
        </Tooltip>
        <Tooltip title='Отразить по горизонтали'>
          <div className='ant-image-preview-operations-operation'>
            <SwapOutlined onClick={onFlipX} />
          </div>
        </Tooltip>
        <Tooltip title='Повернуть против часовой стрелки'>
          <div className='ant-image-preview-operations-operation'>
            <RotateLeftOutlined onClick={onRotateLeft} />
          </div>
        </Tooltip>
        <Tooltip title='Повернуть по часовой стрелке'>
          <div className='ant-image-preview-operations-operation'>
            <RotateRightOutlined onClick={onRotateRight} />
          </div>
        </Tooltip>
        <Tooltip title='Уменьшить'>
          <div
            className={cn('ant-image-preview-operations-operation', {
              'ant-image-preview-operations-operation-disabled': scale === 1,
            })}
          >
            <ZoomOutOutlined onClick={onZoomOut} />
          </div>
        </Tooltip>
        <Tooltip title='Увеличить'>
          <div
            className={cn('ant-image-preview-operations-operation', {
              'ant-image-preview-operations-operation-disabled': scale === 10,
            })}
          >
            <ZoomInOutlined onClick={onZoomIn} />
          </div>
        </Tooltip>
      </div>
    );
  };

  return (
    <AntImage
      src={src}
      className={cn(styles.image, className)}
      preview={{
        mask,
        toolbarRender,
      }}
      {...restProps}
    />
  );
};

export default Image;
