import { reactive } from 'vue';

export function useFormInputValidator(model, requiredFields) {
  const validationReport = reactive({ isValid: false });

  function validate() {
    validationReport.isValid = true;

    for (const field of requiredFields) {
      const value = model[field];
      const isEmpty = value === null || value === undefined || value.toString().trim() === '';
      validationReport[field] = isEmpty ? 'This field is required' : '';
      if (isEmpty) validationReport.isValid = false;
    }
  }

  return {
    validationReport,
    validate,
  };
}
