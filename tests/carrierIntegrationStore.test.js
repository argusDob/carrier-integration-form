import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCarrierIntegrationStore } from '../src/store/carrierIntegrationStore.js';

function createMockApi(overrides = {}) {
  return {
    getCarrierServiceData: async () => ({
      id: '123',
      carrierInfo: {
        name: 'Carrier',
        code: 'CRR',
        integrationSet: 'INT',
        label: 'LBL',
        reference: 'REF',
        statuses: {
          onboarding: { status: 'done', isEditable: false },
          ordering: { status: 'open', isEditable: true },
          manifesting: { status: 'open', isEditable: true },
        },
      },
      modules: {
        ordering: { adviceForwardingOrderXml: true },
        manifesting: { forwardingOrdersXml: true },
        tracking: { configureTrackingFileSFTP: false },
      },
      pricing: 'basic',
      cancelOrder: { label: 'cancel', options: { email: false, sms: false } },
    }),
    submitCarrierServiceData: vi.fn(async data => ({ data, message: 'ok' })),
    ...overrides,
  };
}

beforeEach(() => {
  setActivePinia(createPinia());
});

describe('carrierIntegrationStore', () => {
  it('resetFormState initializes default shape', () => {
    const store = useCarrierIntegrationStore();
    store.resetFormState();

    expect(store.formData).toBeDefined();
    expect(store.formData.carrierInfo).toBeDefined();
    expect(store.formData.modules).toBeDefined();
    expect(store.formData.cancelOrder).toBeDefined();
  });

  it('loadForm populates data from API', async () => {
    const store = useCarrierIntegrationStore();
    store.init(createMockApi());

    await store.loadForm();
    expect(store.error).toBeNull();
    expect(store.formData.id).toBe('123');
    expect(store.formData.carrierInfo.name).toBe('Carrier');
  });

  it('submitForm no-ops when there are no changes', async () => {
    const store = useCarrierIntegrationStore();
    const api = createMockApi();
    store.init(api);

    // stub global alert
    global.alert = vi.fn();

    await store.loadForm();
    await store.submitForm();

    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(api.submitCarrierServiceData).not.toHaveBeenCalled();
  });

  it('submitForm sends only changed fields', async () => {
    const store = useCarrierIntegrationStore();
    const api = createMockApi();
    store.init(api);

    await store.loadForm();
    // change a single nested field
    store.formData.carrierInfo.name = 'New Name';

    await store.submitForm();
    expect(api.submitCarrierServiceData).toHaveBeenCalledTimes(1);

    const arg = api.submitCarrierServiceData.mock.calls[0][0];
    expect(arg).toEqual({ carrierInfo: { name: 'New Name' }, id: '123' });
  });
});
