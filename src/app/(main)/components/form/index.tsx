'use client';

import {
  Button,
  Col,
  Flex,
  Form as AntForm,
  Input,
  InputNumber,
  notification,
  Select,
  Slider,
  Row,
  Tooltip,
} from 'antd';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import queryString from 'query-string';

import FilterModal from './modals/Filter';
import TextModal from './modals/Text';

import { getCatImage } from '@/api/catImage';
import { useStore } from '@/hooks';
import { getRandomArrayElement } from '@/utils';

import styles from './form.module.scss';

import { IGetCatImageParams, IFormValues, IFormProps as IProps } from './types';

const { useNotification } = notification;

const defaultValues: IFormValues = {
  type: 'image',
  text: '',
  font: 'Arial',
  fontSize: 30,
  fontColor: '#000',
  blur: 0,
  filter: undefined,
  brightness: 1,
  saturation: 1,
  hue: 0,
  lightness: 0,
  color: undefined,
  mode: 'new',
};

const filterOptions = [
  {
    label: 'Монохромный',
    value: 'mono',
  },
  {
    label: 'Негатив',
    value: 'negate',
  },
  {
    label: 'Настраиваемый',
    value: 'custom',
  },
];

const typeOptions = [
  {
    label: 'Картинка',
    value: 'image',
  },
  {
    label: 'GIF',
    value: 'gif',
  },
];

const Form: FC<IProps> = observer(({ cats, className, ...restProps }) => {
  const { id: storedId, setId, setParams, setSrc, setText } = useStore();

  const { handleSubmit, control, setValue } = useForm<IFormValues>({
    defaultValues,
  });

  const [notificationApi, notificationContextHolder] = useNotification();

  const [isLoading, setIsLoading] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [textModalOpen, setTextModalOpen] = useState(false);
  const [submittedType, setSubmittedType] = useState(defaultValues.type);

  const watch = useWatch({
    control,
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    const {
      type,
      text,
      font,
      fontSize,
      fontColor,
      blur,
      filter,
      brightness,
      saturation,
      hue,
      lightness,
      color,
      mode,
    } = data;

    let id = storedId;

    if (mode === 'new') {
      id = getRandomArrayElement(cats[type]);
    }

    let params: IGetCatImageParams = {
      blur,
      filter,
    };

    if (text) {
      params = {
        ...params,
        font,
        fontSize,
        fontColor,
      };
    }

    if (filter === 'custom') {
      params = {
        ...params,
        brightness,
        saturation,
        hue,
        lightness,
        r: color?.r,
        g: color?.g,
        b: color?.b,
      };
    }

    try {
      const paramsString = queryString.stringify(params);

      const src = await getCatImage(id, text, paramsString);
      setSubmittedType(type);
      setId(id);
      setParams(paramsString);
      setSrc(src);
      setText(text);
    } catch (err) {
      notificationApi.error({
        description: 'Попробуйте ещё раз',
        message: 'Ошибка при получении котика',
        pauseOnHover: true,
        showProgress: true,
      });
    } finally {
      setIsLoading(false);
    }
  });

  const handleBlurChange = (value: number | null) => {
    setValue('blur', value ?? 0);
  };

  const handleTextModalOpen = () => {
    setTextModalOpen(true);
  };

  const handleTextModalClose = () => {
    setTextModalOpen(false);
  };

  const handleFilterModalOpen = () => {
    setFilterModalOpen(true);
  };

  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
  };

  const handleSubmitNewClick = () => {
    setValue('mode', 'new');
  };

  const handleSubmitEditClick = () => {
    setValue('mode', 'edit');
  };

  useEffect(() => {
    if (watch.filter !== 'custom') {
      const filterFields = [
        'brightness',
        'saturation',
        'hue',
        'lightness',
        'color',
      ] as const;

      for (const field of filterFields) {
        setValue(field, defaultValues[field]);
      }
    }
  }, [setValue, watch.filter]);

  return (
    <AntForm
      className={cn(styles.form, className)}
      onFinish={handleFormSubmit}
      {...restProps}
    >
      {notificationContextHolder}
      <FormItem control={control} name='type' label='Тип'>
        <Select options={typeOptions} />
      </FormItem>
      <Row gutter={16}>
        <Col flex='auto'>
          <FormItem control={control} name='text' label='Текст'>
            <Input />
          </FormItem>
        </Col>
        <Col>
          <AntForm.Item>
            <Button
              disabled={!watch.text}
              onClick={handleTextModalOpen}
              type='link'
            >
              Настроить
            </Button>
          </AntForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col flex='auto'>
          <FormItem control={control} name='blur' label='Размытие'>
            <Slider min={0} max={20} />
          </FormItem>
        </Col>
        <Col>
          <AntForm.Item name='blur'>
            <InputNumber
              changeOnWheel
              onChange={handleBlurChange}
              min={0}
              max={20}
              value={watch.blur}
            />
          </AntForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col flex='auto'>
          <FormItem control={control} name='filter' label='Фильтр'>
            <Select
              allowClear
              options={filterOptions}
              placeholder='Не выбран'
            />
          </FormItem>
        </Col>
        {watch.filter === 'custom' && (
          <Col>
            <AntForm.Item>
              <Button onClick={handleFilterModalOpen} type='link'>
                Настроить
              </Button>
            </AntForm.Item>
          </Col>
        )}
      </Row>
      <FilterModal
        control={control}
        open={filterModalOpen}
        onClose={handleFilterModalClose}
        onSetValue={setValue}
      />
      <TextModal
        control={control}
        open={textModalOpen}
        onClose={handleTextModalClose}
        onSetValue={setValue}
      />
      <Flex gap={16}>
        <AntForm.Item>
          <Button
            type='primary'
            htmlType='submit'
            loading={isLoading}
            onClick={handleSubmitNewClick}
          >
            Получить нового котика
          </Button>
        </AntForm.Item>
        <AntForm.Item>
          <Tooltip
            title='Нельзя менять котика при смене типа'
            open={submittedType === watch.type ? false : undefined}
          >
            <Button
              disabled={submittedType !== watch.type}
              type='primary'
              htmlType='submit'
              loading={isLoading}
              onClick={handleSubmitEditClick}
            >
              Изменить текущего котика
            </Button>
          </Tooltip>
        </AntForm.Item>
      </Flex>
    </AntForm>
  );
});

export default Form;
