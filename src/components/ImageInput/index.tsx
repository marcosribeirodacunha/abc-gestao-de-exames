import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { BiUpload } from 'react-icons/bi';

import { useField } from '@unform/core';

import photoPlaceholder from '../../assets/photo-placeholder.svg';
import { Container } from './styles';

interface Props {
  name: string;
}
type InputProps = JSX.IntrinsicElements['input'] & Props;

const ImageInput: React.FC<InputProps> = ({ name, disabled, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [preview, setPreview] = useState(defaultValue || photoPlaceholder);

  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(photoPlaceholder);
    }
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        ref.value = '';
        setPreview(photoPlaceholder);
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container hasError={!!error}>
      <div>
        <img src={preview} alt="preview" />
      </div>
      <input
        type="file"
        ref={inputRef}
        onChange={handlePreview}
        disabled={disabled}
        {...rest}
      />
      {!disabled && (
        <button type="button" onClick={() => inputRef.current?.click()}>
          <BiUpload size="24" />
        </button>
      )}
    </Container>
  );
};

export default ImageInput;
