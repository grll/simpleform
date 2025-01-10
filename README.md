# Simple Form Generator

A minimalist JSON-to-React form generator with Zod validation and React Hook Form integration.

## Installation

```bash
npm install simple-form-generator react-hook-form zod
```

## Quick Start

```typescript
import { FormGenerator, createForm } from 'simple-form-generator';

// Define your form schema
const formSchema = {
  fields: {
    name: {
      type: "text",
      required: true
    },
    email: {
      type: "email",
      required: true
    }
  }
};

// Use in your React component
function MyForm() {
  const handleSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <FormGenerator 
      schema={formSchema}
      onSubmit={handleSubmit}
    />
  );
}
```

## Schema Definition

Your form schema should follow this simple structure:

```typescript
interface FormSchema {
  fields: {
    [fieldName: string]: {
      type: "text" | "email" | "number" | "select";
      required?: boolean;
      min?: number;      // For number fields
      max?: number;      // For number fields
      options?: string[]; // For select fields
    };
  };
}
```

## Features

- 🚀 Simple JSON schema definition
- ✨ Automatic Zod schema generation
- 📝 React Hook Form integration
- 🎨 Basic styling included
- 🔒 Type-safe form handling

## Advanced Usage

You can access the generated Zod schema directly:

```typescript
const { schema, zodSchema } = createForm(formSchema);
```

## Contributing

Contributions are welcome! Please read our contributing guidelines first.