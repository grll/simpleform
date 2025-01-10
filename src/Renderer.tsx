import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { FormSchema, Field, ValidationError } from './types';
import { convertToZodSchema } from './index';
import {
  TextField,
  NumberField,
  EmailField,
  PasswordField,
  ArrayField,
  ErrorBoundary,
} from './components';

interface RendererProps {
  schema: FormSchema;
  onSubmit: (data: any) => Promise<void> | void;
  className?: string;
}

export function Renderer({ schema, onSubmit, className }: RendererProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const zodSchema = convertToZodSchema(schema);
  
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid }
  } = useForm({
    resolver: zodResolver(zodSchema),
    mode: 'onChange'
  });

  const handleFormSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      
      // Run custom validation if provided
      if (schema.callbacks?.onValidate) {
        const isValid = await schema.callbacks.onValidate(data);
        if (!isValid) return;
      }

      // Call onSubmit handler
      await onSubmit(data);

      // Run onChange callback if provided
      schema.callbacks?.onChange?.(data);

      // Reset form if submission was successful
      reset();
    } catch (error) {
      // Handle submission error
      schema.callbacks?.onError?.(errors as Record<string, ValidationError>);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (name: string, field: Field): React.ReactNode => {
    const error = errors[name] as ValidationError;

    switch (field.type) {
      case 'text':
        return (
          <TextField
            name={name}
            field={field}
            error={error}
            register={register}
          />
        );
      case 'number':
        return (
          <NumberField
            name={name}
            field={field}
            error={error}
            register={register}
          />
        );
      case 'email':
        return (
          <EmailField
            name={name}
            field={field}
            error={error}
            register={register}
          />
        );
      case 'password':
        return (
          <PasswordField
            name={name}
            field={field}
            error={error}
            register={register}
          />
        );
      case 'array':
        return (
          <ArrayField
            name={name}
            field={field}
            error={error}
            register={register}
            control={control}
          />
        );
      default: {
        const _exhaustiveCheck: never = field;
        return null;
      }
    }
  };

  return (
    <ErrorBoundary>
      <form 
        onSubmit={handleSubmit(handleFormSubmit)}
        className={`space-y-6 ${className || ''} ${schema.styling?.className || ''}`}
        noValidate
      >
        {schema.title && (
          <h2 className="text-xl font-bold text-gray-900">
            {schema.title}
          </h2>
        )}
        
        {schema.description && (
          <p className="text-gray-600">
            {schema.description}
          </p>
        )}

        <div className="space-y-4">
          {Object.entries(schema.fields).map(([name, field]) => (
            <div 
              key={name}
              className={schema.styling?.fieldClassName}
            >
              {renderField(name, field)}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={!isDirty || isSubmitting}
          >
            Reset
          </button>
          
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || !isDirty || !isValid}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
    </ErrorBoundary>
  );
}
