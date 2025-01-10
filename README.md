# Simple Form Generator

A powerful and flexible JSON-to-React form generator with comprehensive validation, styling, and customization options.

## Features

- 🚀 Declarative JSON schema definition
- ✨ Automatic Zod schema generation and validation
- 📝 Seamless React Hook Form integration
- 🎨 Built-in Tailwind CSS styling with customization options
- 🔒 Full TypeScript support with strict type checking
- 📋 Advanced field types and array support
- 🔍 Comprehensive validation and error handling
- 🔄 Form state management with loading states
- 🎯 Custom validation and submission callbacks
- 🛡️ Error boundary protection
- 🎨 Customizable styling per field and form
- 🔐 Password strength indicator
- 📧 Multiple email support
- 🔢 Number input with units

## Installation

```bash
npm install simple-form-generator
# or
yarn add simple-form-generator
# or
bun add simple-form-generator
```

## Quick Start

```typescript
import { Renderer } from 'simple-form-generator';

// Define your form schema
const formSchema = {
  title: "Contact Form",
  description: "Please fill out the contact information below",
  fields: {
    name: {
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "John Doe",
      validation: {
        minLength: 2,
        maxLength: 50
      }
    },
    email: {
      type: "email",
      label: "Email Address",
      required: true,
      allowMultiple: true,
      placeholder: "john@example.com"
    },
    age: {
      type: "number",
      label: "Age",
      min: 18,
      max: 120,
      unit: "years"
    }
  },
  styling: {
    className: "max-w-lg mx-auto p-6",
    fieldClassName: "bg-gray-50"
  },
  callbacks: {
    onValidate: async (data) => {
      // Custom validation logic
      return true;
    },
    onSubmit: async (data) => {
      // Handle form submission
      await submitToAPI(data);
    },
    onError: (errors) => {
      // Handle validation/submission errors
      console.error(errors);
    }
  }
};

function MyForm() {
  return <Renderer schema={formSchema} />;
}
```

## Field Types

### Text Field
```typescript
interface TextField extends BaseField<"text"> {
  minLength?: number;
  maxLength?: number;
}
```

### Email Field
```typescript
interface EmailField extends BaseField<"email"> {
  allowMultiple?: boolean; // Enable comma-separated email addresses
}
```

### Password Field
```typescript
interface PasswordField extends BaseField<"password"> {
  showStrengthIndicator?: boolean; // Show password strength meter
  showToggle?: boolean; // Show password visibility toggle
}
```

### Number Field
```typescript
interface NumberField extends BaseField<"number"> {
  min?: number;
  max?: number;
  step?: number;
  unit?: string; // Display unit label (e.g., "kg", "$")
}
```

### Array Field
```typescript
interface ArrayField<T> extends BaseField<"array"> {
  itemsType: "text" | "email" | "password" | "number";
  minItems?: number;
  maxItems?: number;
  sortable?: boolean; // Enable drag-and-drop reordering
}
```

## Common Field Properties

All fields share these base properties:
```typescript
interface BaseField<T> {
  type: T;
  label: string;
  description?: string;
  required?: boolean;
  default?: any;
  placeholder?: string;
  className?: string;
  validation?: ValidationRules;
  disabled?: boolean;
}
```

## Form Schema Configuration

```typescript
interface FormSchema {
  title?: string;
  description?: string;
  fields: Record<string, Field>;
  styling?: {
    className?: string;
    fieldClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
  };
  callbacks?: {
    onValidate?: (data: any) => Promise<boolean>;
    onSubmit?: (data: any) => Promise<void>;
    onChange?: (data: any) => void;
    onError?: (errors: Record<string, ValidationError>) => void;
  };
}
```

## Advanced Features

### Custom Validation
```typescript
const formSchema = {
  fields: {
    username: {
      type: "text",
      label: "Username",
      validation: {
        required: true,
        pattern: /^[a-z0-9_]+$/i,
        custom: (value) => {
          return value.length >= 3 || "Username must be at least 3 characters";
        }
      }
    }
  }
};
```

### Conditional Fields
```typescript
const formSchema = {
  fields: {
    employmentStatus: {
      type: "text",
      label: "Employment Status",
      validation: {
        required: true
      }
    },
    companyName: {
      type: "text",
      label: "Company Name",
      validation: {
        required: (data) => data.employmentStatus === "employed"
      }
    }
  }
};
```

### Array Field with Sorting
```typescript
const formSchema = {
  fields: {
    phoneNumbers: {
      type: "array",
      itemsType: "text",
      label: "Phone Numbers",
      minItems: 1,
      maxItems: 3,
      sortable: true,
      placeholder: "+1 (555) 555-5555"
    }
  }
};
```

## Error Handling

The form generator includes built-in error handling:

- Field-level validation errors
- Form-level validation errors
- Submission errors
- Runtime errors (via ErrorBoundary)

## Styling

The form generator uses Tailwind CSS for styling and provides multiple ways to customize the appearance:

1. Global form styling:
```typescript
const formSchema = {
  styling: {
    className: "max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg",
    fieldClassName: "bg-gray-50 hover:bg-gray-100",
    labelClassName: "text-gray-700 font-medium",
    errorClassName: "text-red-600 font-medium"
  }
};
```

2. Per-field styling:
```typescript
const formSchema = {
  fields: {
    name: {
      type: "text",
      label: "Name",
      className: "border-blue-500 focus:ring-blue-500"
    }
  }
};
```

## Examples

The package includes a dynamic for example where you can see live changes made to a JSON file.

To run the example:

```bash
git clone https://github.com/yourusername/simple-form-generator.git
cd simple-form-generator
bun install
bun run dev
```

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) first.

To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
