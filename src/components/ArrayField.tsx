import React from 'react';
import { BaseFieldWrapper } from './BaseField';
import type { ArrayField as ArrayFieldType, ValidationError } from '../types';
import { useFieldArray } from 'react-hook-form';

interface ArrayFieldProps {
  name: string;
  field: ArrayFieldType<any>;
  error?: ValidationError;
  register: any;
  control: any;
}

export const ArrayField: React.FC<ArrayFieldProps> = ({
  name,
  field,
  error,
  register,
  control,
}) => {
  const {
    fields,
    append,
    remove,
    move,
  } = useFieldArray({
    control,
    name,
  });

  const canAddMore = !field.maxItems || fields.length < field.maxItems;
  const canRemove = !field.minItems || fields.length > field.minItems;

  const getInputType = (itemsType: string) => {
    switch (itemsType) {
      case 'number':
        return { type: 'number', step: '1' };
      case 'email':
        return { type: 'email' };
      case 'password':
        return { type: 'password' };
      default:
        return { type: 'text' };
    }
  };

  return (
    <BaseFieldWrapper
      name={name}
      field={field}
      error={error}
      register={register}
    >
      <div className="space-y-2">
        {fields.map((arrayField, index) => (
          <div
            key={arrayField.id}
            className={`flex gap-2 items-center ${
              field.sortable ? 'group' : ''
            }`}
          >
            {field.sortable && index > 0 && (
              <button
                type="button"
                onClick={() => move(index, index - 1)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                ↑
              </button>
            )}
            {field.sortable && index < fields.length - 1 && (
              <button
                type="button"
                onClick={() => move(index, index + 1)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                ↓
              </button>
            )}
            
            <input
              {...register(`${name}.${index}`)}
              {...getInputType(field.itemsType)}
              className="flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              placeholder={field.placeholder}
            />
            
            {canRemove && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700"
                tabIndex={-1}
              >
                ✕
              </button>
            )}
          </div>
        ))}

        {canAddMore && (
          <button
            type="button"
            onClick={() => append('')}
            className="mt-2 w-full px-3 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
          >
            Add {field.label}
          </button>
        )}

        {field.minItems && fields.length < field.minItems && (
          <p className="text-sm text-red-500 mt-1">
            At least {field.minItems} {field.label.toLowerCase()} required
          </p>
        )}
        
        {field.maxItems && fields.length >= field.maxItems && (
          <p className="text-sm text-gray-500 mt-1">
            Maximum {field.maxItems} {field.label.toLowerCase()} allowed
          </p>
        )}
      </div>
    </BaseFieldWrapper>
  );
};
