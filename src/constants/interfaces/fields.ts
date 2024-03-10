export interface Fields {
  label: string;
  id: string;
  type: string;
  required: boolean;
  placeholder: string;
  pattern?: RegExp;
  validate?: boolean;
  requiredMessage?: string;
  patternMessage?: string;
  validationMessage?: string;
}
