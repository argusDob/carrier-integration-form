export const mockFormData = Object.freeze({
  id: 2,
  carrierInfo: {
    name: 'Dachser',
    code: 'DAC',
    integrationSet: 'server_a',
    label: 'label',
    reference: 'REF123',
    statuses: {
      onboarding: {
        status: 'Pending',
        isEditable: false,
      },
      ordering: {
        status: 'Test mode',
        isEditable: true,
      },
      manifesting: {
        status: 'Test mode',
        isEditable: true,
      },
    },
  },
  modules: {
    ordering: {
      adviceForwardingOrderXml: true,
    },
    manifesting: {
      forwardingOrdersXml: false,
    },
    tracking: {
      configureTrackingFileSFTP: true,
    },
  },
  pricing: 'shipSmarter',
  cancelOrder: {
    label: 'Cancel Order',
    options: {
      email: true,
      sms: false,
    },
  },
});
