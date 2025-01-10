import React from 'react';
import { BaseFieldWrapper } from './BaseField';
import type { EmailField as EmailFieldType, ValidationError } from '../types';

interface EmailFieldProps {
  name: string;
  field: EmailFieldType;
  error?: ValidationError;
  register: any;
}

export const EmailField: React.FC<EmailFieldProps> = ({
  name,
  field,
  error,
  register
}) => {
  const inputProps = {
    ...register(name, {
      required: field.required,
      disabled: field.disabled,
      pattern: {
        value: field.allowMultiple
          ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}(\s*,\s*[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})*$/i
          : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: field.allowMultiple
          ? 'Please enter valid email addresses separated by commas'
          : 'Please enter a valid email address',
      },
    }),
    id: name,
    type: 'email',
    multiple: field.allowMultiple,
    placeholder: field.placeholder || (field.allowMultiple ? 'email1@example.com, email2@example.com' : 'email@example.com'),
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
      {field.allowMultiple && !error && (
        <p className="text-sm text-gray-500 mt-1">
          Separate multiple email addresses with commas
        </p>
      )}
    </BaseFieldWrapper>
  );
};
