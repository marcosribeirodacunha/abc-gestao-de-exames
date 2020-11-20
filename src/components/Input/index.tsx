import React, { useEffect, useRef } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import ReactInputMask, { Props as InputMaskProps } from 'react-input-mask';

import { useField } from '@unform/core';

import { Container } from './styles';

interface Props extends Partial<InputMaskProps> {
  name: string;
  label?: string;
  variant?: 'default' | 'white';
}

const Input: React.FC<Props> = ({
  label,
  name,
  variant = 'default',
  mask = '',
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container hasError={!!error}>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <div>
        <ReactInputMask
          className={variant}
          id={fieldName}
          name={fieldName}
          inputRef={inputRef}
          defaultValue={defaultValue}
          mask={mask}
          {...rest}
        />
        {error && <MdErrorOutline size={24} />}
      </div>
    </Container>
  );
};

export default Input;
