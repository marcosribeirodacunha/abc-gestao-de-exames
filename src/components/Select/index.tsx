import React, { useEffect, useRef } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import ReactSelect, {
  Props as SelectProps,
  OptionTypeBase,
} from 'react-select';

import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  label?: string;
  tip?: string;
  variant?: 'default' | 'white';
}

const Select: React.FC<Props> = ({
  name,
  label,
  tip,
  variant = 'default',
  placeholder,
  ...rest
}) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container hasError={!!error}>
      {label && (
        <label htmlFor={fieldName}>
          {label} {tip && <span>({tip})</span>}
        </label>
      )}

      <div>
        <ReactSelect
          className={variant}
          ref={selectRef}
          inputId={fieldName}
          defaultValue={defaultValue}
          placeholder={placeholder || 'Selecione uma opção'}
          classNamePrefix="react-select"
          isClearable
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

export default Select;
