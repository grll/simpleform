import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { FormSchema, Field } from './types'
import { convertToZodSchema } from './index'

interface RendererProps {
  schema: FormSchema
  onSubmit: (data: any) => void
}

export function Renderer({ schema, onSubmit }: RendererProps) {
  const zodSchema = convertToZodSchema(schema)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(zodSchema)
  })

  const renderField = (name: string, field: Field) => {
    const commonProps = {
      ...register(name),
      id: name,
      className: 'border rounded p-2 w-full',
      required: field.required
    }

    if (field.type === 'array') {
      const { fields, append, remove } = useFieldArray({
        control,
        name: name
      })
      
      return (
        <div className="space-y-2">
          {fields.map((arrayField, index) => (
            <div key={arrayField.id} className="flex gap-2">
              <input
                type={field.itemsType}
                {...register(`${name}.${index}` as const)}
                className="border rounded p-2 flex-1"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                -
              </button>
              {index === fields.length - 1 && (
                <button
                  type="button"
                  onClick={() => append('')}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  +
                </button>
              )}
            </div>
          ))}
          {fields.length === 0 && (
            <button
              type="button"
              onClick={() => append('')}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Add Item
            </button>
          )}
        </div>
      )
    }

    switch (field.type) {
      case 'number':
        return <input type="number" {...commonProps} />
      default:
        return <input type={field.type} {...commonProps} />
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {Object.entries(schema.fields).map(([name, field]) => (
        <div key={name}>
          <label htmlFor={name} className="block text-sm font-medium mb-1">
            {field.label}
          </label>
          {renderField(name, field)}
          {errors[name] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[name]?.message as string}
            </p>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  )
}