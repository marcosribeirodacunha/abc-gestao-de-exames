import React, { useEffect, useRef } from 'react';
import { MdErrorOutline } from 'react-icons/md';

import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface Props {
  name: string;
  label?: string;
  variant?: 'default' | 'white';
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const Input: React.FC<InputProps> = ({
  label,
  name,
  variant = 'default',
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container hasError={!!error}>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <div>
        <input
          className={variant}
          ref={inputRef}
          id={fieldName}
          name={fieldName}
          defaultValue={defaultValue}
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

export default Input;
