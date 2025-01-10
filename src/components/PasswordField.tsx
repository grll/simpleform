import React, { useState } from 'react';
import { BaseFieldWrapper } from './BaseField';
import type { PasswordField as PasswordFieldType, ValidationError } from '../types';

interface PasswordFieldProps {
  name: string;
  field: PasswordFieldType;
  error?: ValidationError;
  register: any;
}

const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

const getStrengthColor = (strength: number): string => {
  switch (strength) {
    case 0:
    case 1:
      return 'bg-red-500';
    case 2:
    case 3:
      return 'bg-yellow-500';
    case 4:
    case 5:
      return 'bg-green-500';
    default:
      return 'bg-gray-200';
  }
};

export const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  field,
  error,
  register
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);

  const inputProps = {
    ...register(name, {
      required: field.required,
      disabled: field.disabled,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        if (field.showStrengthIndicator) {
          setStrength(calculatePasswordStrength(e.target.value));
        }
      },
    }),
    id: name,
    type: showPassword ? 'text' : 'password',
    placeholder: field.placeholder || '••••••••',
    className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      field.className || ''
    } ${error ? 'border-red-500' : 'border-gray-300'} ${
      field.showToggle ? 'pr-10' : ''
    }`,
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
        {field.showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            tabIndex={-1}
          >
            <span className="text-gray-500">
              {showPassword ? '🔒' : '👁️'}
            </span>
          </button>
        )}
      </div>
      
      {field.showStrengthIndicator && (
        <div className="mt-1">
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getStrengthColor(strength)} transition-all duration-300`}
              style={{ width: `${(strength / 5) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {strength === 0 && 'Very weak'}
            {strength === 1 && 'Weak'}
            {strength === 2 && 'Fair'}
            {strength === 3 && 'Good'}
            {strength === 4 && 'Strong'}
            {strength === 5 && 'Very strong'}
          </p>
        </div>
      )}
    </BaseFieldWrapper>
  );
};
