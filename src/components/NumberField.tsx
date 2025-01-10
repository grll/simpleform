import React from 'react';
import { BaseFieldWrapper } from './BaseField';
import type { NumberField as NumberFieldType, ValidationError } from '../types';

interface NumberFieldProps {
  name: string;
  field: NumberFieldType;
  error?: ValidationError;
  register: any;
}

export const NumberField: React.FC<NumberFieldProps> = ({
  name,
  field,
  error,
  register
}) => {
  const inputProps = {
    ...register(name, {
      required: field.required,
      min: field.min,
      max: field.max,
      disabled: field.disabled,
      valueAsNumber: true,
    }),
    id: name,
    type: 'number',
    step: field.step || 1,
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
      <div className="relative">
        <input {...inputProps} />
        {field.unit && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{field.unit}</span>
          </div>
        )}
      </div>
    </BaseFieldWrapper>
  );
};
