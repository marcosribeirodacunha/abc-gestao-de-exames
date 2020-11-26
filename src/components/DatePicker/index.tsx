import React, { useEffect, useRef, useState } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { MdErrorOutline } from 'react-icons/md';

import { useField } from '@unform/core';

import { Container, Error } from './styles';

import 'react-datepicker/dist/react-datepicker.css';

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  label?: string;
  tip?: string;
  variant?: 'default' | 'white';
  handleChange?: (selectedDate: Date) => void;
}

const DatePicker: React.FC<Props> = ({
  name,
  label,
  tip,
  variant = 'default',
  dateFormat = 'dd/MM/yyy',
  handleChange,
  isClearable = true,
  ...rest
}) => {
  const datepickerRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [date, setDate] = useState(defaultValue || null);

  function onChange(selectedDate: Date) {
    setDate(selectedDate);
    if (handleChange) handleChange(selectedDate);
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: (ref: any) => {
        ref.clear();
      },
      setValue(_: any, value: Date) {
        setDate(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container hasError={!!error}>
      {label && (
        <label htmlFor={fieldName}>
          {label} {tip && <span>({tip})</span>}
        </label>
      )}

      <div>
        <ReactDatePicker
          className={variant}
          id={fieldName}
          ref={datepickerRef}
          selected={date}
          onChange={onChange}
          dateFormat={dateFormat}
          isClearable={isClearable}
          onChangeRaw={e => e.preventDefault()}
          {...rest}
        />
        {error && (
          <Error title={error}>
            <MdErrorOutline size={24} />
          </Error>
        )}
      </div>
    </Container>
  );
};

export default DatePicker;
