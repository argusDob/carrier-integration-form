import { defineStore } from 'pinia';
import { ref } from 'vue';

import isEqual from 'lodash.isequal';
import transform from 'lodash.transform';
import merge from 'lodash.merge';

export const useCarrierIntegrationStore = defineStore('carrierIntegrationStore', () => {
  const formData = ref();
  const originalFormData = ref();
  const error = ref(null);
  //inject Service as dependency and comply with SOLI(D)
  const api = ref(null);

  function resetFormState() {
    formData.value = {
      id: undefined,
      carrierInfo: {
        name: '',
        code: '',
        integrationSet: '',
        label: '',
        reference: '',
        statuses: {
          onboarding: {
            status: '',
            isEditable: false,
          },
          ordering: {
            status: '',
            isEditable: true,
          },
          manifesting: {
            status: '',
            isEditable: true,
          },
        },
      },
      modules: {
        ordering: {
          adviceForwardingOrderXml: false,
        },
        manifesting: {
          forwardingOrdersXml: false,
        },
        tracking: {
          configureTrackingFileSFTP: false,
        },
      },
      pricing: 'basic',
      cancelOrder: {
        label: '',
        options: {
          email: false,
          sms: false,
        },
      },
    };

    originalFormData.value = JSON.parse(JSON.stringify(formData.value));
  }

  async function loadForm() {
    error.value = null;
    try {
      const data = await api.value.getCarrierServiceData();
      formData.value = JSON.parse(JSON.stringify(data));
      originalFormData.value = JSON.parse(JSON.stringify(data));
    } catch (err) {
      error.value = err.message || 'Failed to load';
    }
  }

  async function submitForm() {
    try {
      const changedData = getDeepDifference(formData.value, originalFormData.value);
      if (Object.keys(changedData).length === 0) {
        alert('OOOOps no changed detected');
        return;
      }
      if (formData.value.id) {
        changedData.id = formData.value.id;
      }

      const { data, message } = await api.value.submitCarrierServiceData(changedData);
      originalFormData.value = merge(originalFormData.value, data);
      console.log(message);
    } catch (err) {
      error.value = err.message || 'Failed to submit';
    }
  }

  function getDeepDifference(newObj, originalObj) {
    return transform(newObj, (result, value, key) => {
      if (!isEqual(value, originalObj[key])) {
        result[key] =
          typeof value === 'object' && value !== null && originalObj[key]
            ? getDeepDifference(value, originalObj[key])
            : value;
      }
    });
  }

  function init(carrierApiService) {
    api.value = carrierApiService;
  }

  return {
    formData,
    error,
    originalFormData,
    api,
    init,
    loadForm,
    resetFormState,
    submitForm,
  };
});
