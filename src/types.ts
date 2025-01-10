/**
 * Field type
 * This is the only supported types.
 */
type FieldType = "text" | "email" | "password" | "number" | "array";

/**
 * Base field type define all the common properties across all fields
 * @param T - The type of the field
 */
interface BaseField<T extends FieldType> {
  type: T;
  label: string;
  description?: string;
  required?: boolean;
  default?: T;
}

/**
 * Text field type
 */
interface TextField extends BaseField<"text"> {}

/**
 * Email field type
 */
interface EmailField extends BaseField<"email"> {}

/**
 * Password field type
 */
interface PasswordField extends BaseField<"password"> {}

/**
 * Number field type
 */
interface NumberField extends BaseField<"number"> {
  /**
   * Minimum value accepted
   */ 
  min?: number;

  /**
   * Maximum value accepted
   */
  max?: number;
}

/**
 * Generic array field contains properties common to all array fields
 * @param T - The type of the items in the array
 */
interface ArrayField<T extends Omit<FieldType, "array">>
  extends BaseField<"array"> {
  itemsType: T;
}

/**
 * Array field for text items
 */
interface ArrayTextField extends ArrayField<"text"> {}

/**
 * Array field for email items
 */
interface ArrayEmailField extends ArrayField<"email"> {}

/**
 * Array field for password items
 */
interface ArrayPasswordField extends ArrayField<"password"> {}

/**
 * Array field for number items
 */
interface ArrayNumberField extends ArrayField<"number"> {}

/**
 * Field type accepted by the form schema.
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
 * exported Form schema type where each fields record is keyed by id.
 */
export interface FormSchema {
  /**
   * A description of the form placed under the form title.
   */
  description?: string;

  /**
   * The fields of the form.
   */
  fields: Record<string, Field>;
}
