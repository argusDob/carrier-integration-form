import { mockFormData } from '../mocks/formData.mock';

class CarrierIntegrationService {
  static instance;

  constructor() {
    if (CarrierIntegrationService.instance) return CarrierIntegrationService.instance;
    CarrierIntegrationService.instance = this;
  }

  getCarrierServiceData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockFormData) {
          resolve(mockFormData);
        } else {
          reject(new Error('Failed to load form data'));
        }
      }, 1000);
    });
  }

  submitCarrierServiceData(formData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(formData);
        if (formData && typeof formData === 'object') {
          if (formData.id === undefined) {
            resolve({ data: formData, message: 'New Data submitted successfully - {POST}' });
          } else {
            resolve({
              data: formData,
              message: 'Updated Data submitted successfully - {PATCH}',
            });
          }
        } else {
          reject(new Error('Invalid form data'));
        }
      }, 1000);
    });
  }
}

export const carrierIntegrationService = new CarrierIntegrationService();
