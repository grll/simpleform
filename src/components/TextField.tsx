import React from 'react';
import { BaseFieldWrapper } from './BaseField';
import type { TextField as TextFieldType, ValidationError } from '../types';

interface TextFieldProps {
  name: string;
  field: TextFieldType;
  error?: ValidationError;
  register: any;
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  field,
  error,
  register
}) => {
  const inputProps = {
    ...register(name, {
      required: field.required,
      minLength: field.minLength,
      maxLength: field.maxLength,
      disabled: field.disabled,
    }),
    id: name,
    type: 'text',
    placeholder: field.placeholder,
    className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      field.className || ''
    } ${error ? 'border-red-500' : 'border-gray-300'}`,
  };

  return (
    <BaseFieldWrapper
      name={name}
      field={field}
      error={error}
      register={register}
    >
      <input {...inputProps} />
    </BaseFieldWrapper>
  );
};
