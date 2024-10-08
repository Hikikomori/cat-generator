import {
  Col,
  InputNumber,
  Row,
  Modal,
  Slider,
  ColorPicker,
  Form,
  Select,
} from 'antd';
import { AggregationColor } from 'antd/es/color-picker/color';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';

import { textFonts } from '@/const';

import { ITextModalProps as IProps } from './types';

const fontOptions = textFonts.map((value) => ({
  label: <span style={{ fontFamily: value }}>{value}</span>,
  value,
}));

const fontFormatter = (value?: number | string) =>
  value !== undefined ? `${value} px` : '';

const TextModal: FC<IProps> = (props) => {
  const { control, open, onClose, onSetValue } = props;

  const { fontColor, fontSize } = useWatch({
    control,
  });

  const handleFontColorChange = (value: AggregationColor) => {
    onSetValue('fontColor', value.toHexString());
  };

  const handleFontSizeChange = (value: number | null) => {
    onSetValue('fontSize', value ?? 0);
  };

  return (
    <Modal
      footer={null}
      onCancel={onClose}
      open={open}
      title='Настройки текста'
    >
      <FormItem control={control} name='font' label='Шрифт'>
        <Select options={fontOptions} />
      </FormItem>
      <Row gutter={16}>
        <Col flex='auto'>
          <FormItem control={control} name='fontSize' label='Размер шрифта'>
            <Slider
              tooltip={{
                formatter: fontFormatter,
              }}
              min={0}
            />
          </FormItem>
        </Col>
        <Col>
          <Form.Item>
            <InputNumber
              changeOnWheel
              onChange={handleFontSizeChange}
              min={0}
              formatter={fontFormatter}
              value={fontSize}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label='Цвет'>
        <ColorPicker
          disabledAlpha
          onChangeComplete={handleFontColorChange}
          defaultValue={fontColor}
          format='hex'
        />
      </Form.Item>
    </Modal>
  );
};

export default TextModal;
