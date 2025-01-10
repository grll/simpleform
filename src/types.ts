/**
 * Supported field types for form generation.
 * @remarks
 * - text: Standard text input
 * - email: Email input with validation
 * - password: Secure password input
 * - number: Numeric input with optional min/max
 * - array: Dynamic array of fields
 */
export type FieldType = "text" | "email" | "password" | "number" | "array";

/**
 * Validation error structure for form fields
 */
export interface ValidationError {
  type: string;
  message: string;
}

/**
 * Common validation rules that can be applied to fields
 */
export interface ValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
  validate?: (value: any, formData: any) => boolean | string | Promise<boolean | string>;
}

/**
 * Base field interface that defines common properties across all field types
 * @template T - The specific field type extending FieldType
 * @property {T} type - The type of the field
 * @property {string} label - Display label for the field
 * @property {string} [description] - Optional help text for the field
 * @property {boolean} [required] - Whether the field is required
 * @property {any} [default] - Default value for the field
 * @property {string} [placeholder] - Placeholder text for input fields
 * @property {string} [className] - Custom CSS classes
 * @property {ValidationRules} [validation] - Additional validation rules
 */
export interface BaseField<T extends FieldType> {
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

/**
 * Text input field configuration
 * @extends BaseField<"text">
 * @property {number} [minLength] - Minimum text length
 * @property {number} [maxLength] - Maximum text length
 */
export interface TextField extends BaseField<"text"> {
  minLength?: number;
  maxLength?: number;
}

/**
 * Email input field configuration
 * @extends BaseField<"email">
 * @property {boolean} [allowMultiple] - Allow multiple email addresses
 */
export interface EmailField extends BaseField<"email"> {
  allowMultiple?: boolean;
}

/**
 * Password input field configuration
 * @extends BaseField<"password">
 * @property {boolean} [showStrengthIndicator] - Show password strength meter
 * @property {boolean} [showToggle] - Show password visibility toggle
 */
export interface PasswordField extends BaseField<"password"> {
  showStrengthIndicator?: boolean;
  showToggle?: boolean;
}

/**
 * Number input field configuration
 * @extends BaseField<"number">
 * @property {number} [min] - Minimum allowed value
 * @property {number} [max] - Maximum allowed value
 * @property {number} [step] - Step increment/decrement value
 * @property {string} [unit] - Unit label (e.g., "kg", "$")
 */
export interface NumberField extends BaseField<"number"> {
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

/**
 * Array field configuration for dynamic field lists
 * @template T - The type of items in the array
 * @extends BaseField<"array">
 * @property {T} itemsType - Type of items in the array
 * @property {number} [minItems] - Minimum number of items required
 * @property {number} [maxItems] - Maximum number of items allowed
 * @property {boolean} [sortable] - Allow items to be reordered
 */
export interface ArrayField<T extends Omit<FieldType, "array">>
  extends BaseField<"array"> {
  itemsType: T;
  minItems?: number;
  maxItems?: number;
  sortable?: boolean;
}

/**
 * Specialized array field types for specific item types
 */
export interface ArrayTextField extends ArrayField<"text"> {}
export interface ArrayEmailField extends ArrayField<"email"> {}
export interface ArrayPasswordField extends ArrayField<"password"> {}
export interface ArrayNumberField extends ArrayField<"number"> {}

/**
 * Union type of all possible field configurations
 */
export type Field =
  | TextField
  | EmailField
  | PasswordField
  | NumberField
  | ArrayTextField
  | ArrayEmailField
  | ArrayPasswordField
  | ArrayNumberField;

/**
 * Form submission state
 */
export interface FormState {
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  errors: Record<string, ValidationError>;
}

/**
 * Complete form schema configuration
 * @property {string} [title] - Form title
 * @property {string} [description] - Form description
 * @property {Record<string, Field>} fields - Form fields configuration
 * @property {Object} [styling] - Custom styling options
 * @property {Object} [callbacks] - Form lifecycle callbacks
 */
export interface FormSchema {
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
