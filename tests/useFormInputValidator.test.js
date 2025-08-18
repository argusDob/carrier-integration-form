import { describe, it, expect } from 'vitest';
import { useFormInputValidator } from '../src/composables/useFormInputValidator.js';

describe('useFormInputValidator', () => {
  it('flags missing required fields', () => {
    const model = { label: '', integrationSet: undefined };
    const required = ['label', 'integrationSet'];
    const { validate, validationReport } = useFormInputValidator(model, required);
    validate();

    expect(validationReport.isValid).toBe(false);
    expect(validationReport.label).toBe('This field is required');
    expect(validationReport.integrationSet).toBe('This field is required');
  });

  it('passes when required fields are present', () => {
    const model = { label: 'L1', integrationSet: 'INT' };
    const required = ['label', 'integrationSet'];
    const { validate, validationReport } = useFormInputValidator(model, required);
    validate();

    expect(validationReport.isValid).toBe(true);
    expect(validationReport.label).toBe('');
    expect(validationReport.integrationSet).toBe('');
  });
});
