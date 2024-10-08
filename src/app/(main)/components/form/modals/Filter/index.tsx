import { Col, InputNumber, Row, Modal, Slider, ColorPicker, Form } from 'antd';
import { AggregationColor } from 'antd/es/color-picker/color';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';

import { IFilterModalProps as IProps } from './types';

const hueFormatter = (value?: number | string) =>
  value !== undefined ? `${value}°` : '';

const FilterModal: FC<IProps> = (props) => {
  const { control, open, onClose, onSetValue } = props;

  const hueValue = useWatch({
    control,
    name: 'hue',
  });

  const handleColorClear = () => {
    onSetValue('color', undefined);
  };

  const handleColorChange = (value: AggregationColor) => {
    onSetValue('color', value.toRgb());
  };

  const handleHueChange = (value: number | null) => {
    onSetValue('hue', value ?? 0);
  };

  return (
    <Modal
      footer={null}
      onCancel={onClose}
      open={open}
      title='Настройки фильтрации'
    >
      <FormItem control={control} name='brightness' label='Яркость'>
        <InputNumber
          changeOnWheel
          min={0}
          step={0.1}
          style={{
            width: '100%',
          }}
        />
      </FormItem>
      <FormItem control={control} name='saturation' label='Насыщенность'>
        <InputNumber
          changeOnWheel
          min={0}
          step={0.1}
          style={{
            width: '100%',
          }}
        />
      </FormItem>
      <FormItem control={control} name='lightness' label='Осветление'>
        <InputNumber
          changeOnWheel
          min={0}
          style={{
            width: '100%',
          }}
        />
      </FormItem>
      <Row gutter={16}>
        <Col flex='auto'>
          <FormItem control={control} name='hue' label='Вращение оттенка'>
            <Slider
              tooltip={{
                formatter: hueFormatter,
              }}
              min={-360}
              max={360}
              marks={{
                0: '0°',
              }}
            />
          </FormItem>
        </Col>
        <Col>
          <Form.Item name='hue'>
            <InputNumber
              changeOnWheel
              min={-360}
              max={360}
              onChange={handleHueChange}
              formatter={hueFormatter}
              value={hueValue}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label='Цвет' name='color'>
        <ColorPicker
          allowClear
          disabledAlpha
          onChangeComplete={handleColorChange}
          onClear={handleColorClear}
          format='rgb'
        />
      </Form.Item>
    </Modal>
  );
};

export default FilterModal;
