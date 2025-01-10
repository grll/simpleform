import React from 'react';
import type { BaseField as BaseFieldType, ValidationError } from '../types';

interface BaseFieldProps {
  name: string;
  field: BaseFieldType<any>;
  error?: ValidationError;
  register: any;
  className?: string;
  children?: React.ReactNode;
}

export const BaseFieldWrapper: React.FC<BaseFieldProps> = ({
  name,
  field,
  error,
  children,
  className
}) => {
  return (
    <div className={`field-wrapper ${className || ''}`}>
      <label 
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {field.description && (
        <p className="text-sm text-gray-500 mb-1">{field.description}</p>
      )}
      
      {children}
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error.message}</p>
      )}
    </div>
  );
};
