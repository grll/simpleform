import { z } from 'zod'
import type { Field, FormSchema } from './types'

/**
 * Convert a single field to a Zod type
 * @param field - The field to convert
 * @returns The Zod type
 */
function convertFieldToZod(field: Field) {
  let schema: z.ZodType

  if (field.type === 'array') {
    // Handle array types by creating a nested schema based on itemsType
    let itemSchema: z.ZodType
    switch (field.itemsType) {
      case 'text':
        itemSchema = z.string()
        break
      case 'email':
        itemSchema = z.string().email()
        break
      case 'password':
        itemSchema = z.string()
        break
      case 'number':
        itemSchema = z.number()
        break
    }
    schema = z.array(itemSchema)
  } else {
    // Handle non-array types
    switch (field.type) {
      case 'text':
        schema = z.string()
        break
      case 'email':
        schema = z.string().email()
        break
      case 'password':
        schema = z.string()
        break
      case 'number':
        schema = z.number()
        if ('min' in field && field.min !== undefined) {
          schema = (schema as z.ZodNumber).min(field.min)
        }
        if ('max' in field && field.max !== undefined) {
          schema = (schema as z.ZodNumber).max(field.max)
        }
        break
    }
  }

  return field.required ? schema : schema.optional()
}

export function convertToZodSchema(formSchema: FormSchema) {
  const shape: Record<string, z.ZodType> = {}
  
  for (const [fieldName, field] of Object.entries(formSchema.fields)) {
    shape[fieldName] = convertFieldToZod(field)
  }

  return z.object(shape)
}