# Simple Form Generator

A minimalist JSON-to-React form generator with Zod validation and React Hook Form integration.

## Installation

```bash
npm install simple-form-generator
```

## Quick Start

```typescript
import { Renderer } from 'simple-form-generator';

// Define your form schema
const formSchema = {
  description: "Contact Form",
  fields: {
    name: {
      type: "text",
      label: "Name",
      required: true
    },
    email: {
      type: "email",
      label: "Email",
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
    <Renderer 
      schema={formSchema}
      onSubmit={handleSubmit}
    />
  );
}
```

## Schema Definition

Your form schema should follow this structure:

```typescript
interface FormSchema {
  description?: string;
  fields: Record<string, Field>;
}

type Field = TextField | EmailField | PasswordField | NumberField | ArrayField;

interface BaseField<T> {
  type: T;
  label: string;
  description?: string;
  required?: boolean;
  default?: T;
}

// Example field types
interface TextField extends BaseField<"text"> {}
interface EmailField extends BaseField<"email"> {}
interface NumberField extends BaseField<"number"> {
  min?: number;
  max?: number;
}
interface ArrayField<T> extends BaseField<"array"> {
  itemsType: "text" | "email" | "password" | "number";
}
```

## Features

- 🚀 Simple JSON schema definition
- ✨ Automatic Zod schema generation
- 📝 React Hook Form integration
- 🎨 Tailwind CSS styling included
- 🔒 Type-safe form handling
- 📋 Array field support
- 🔍 Built-in field validation

## Advanced Usage

### Array Fields

You can create dynamic array fields that allow users to add/remove items:

```typescript
const formSchema = {
  fields: {
    emails: {
      type: "array",
      itemsType: "email",
      label: "Email Addresses",
      required: true
    }
  }
};
```

### Number Validation

Number fields support min/max validation:

```typescript
const formSchema = {
  fields: {
    age: {
      type: "number",
      label: "Age",
      min: 0,
      max: 120,
      required: true
    }
  }
};
```

## Examples

The package includes a live example application that demonstrates the form generator in action. The example app features:

- A live schema editor with JSON validation
- Real-time form preview
- Full working implementation of all field types

### Running the Example

1. Clone the repository
2. Install dependencies:

## Contributing

Contributions are welcome! Please read our contributing guidelines first.

## License

MIT