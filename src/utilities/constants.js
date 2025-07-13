export const INTEGRATION_SET_VALUE = Object.freeze([
  { label: 'Server A', value: 'server_a' },
  { label: 'Server B', value: 'server_b' },
  { label: 'Server C', value: 'server_c' },
]);

export const MODULE_CONFIG_SCHEMA = Object.freeze([
  {
    key: 'ordering',
    title: 'Ordering',
    configFields: {
      key: 'adviceForwardingOrderXml',
      label: 'Advice Forwarding order - XML',
      text:
        'Pre-information of your forwarding orders (necessary to schedule the activity). ' +
        'They can be changed until the final Forwarding Order is sent. ' +
        'The advice forwarding order message can be configured to be provided to Dachser.',
    },
  },
  {
    key: 'manifesting',
    title: 'Manifesting',
    configFields: {
      key: 'forwardingOrdersXml',
      label: 'Forwarding Orders - XML',
      text: 'Your orders to transport goods from you to a consignee.',
    },
  },
  {
    key: 'tracking',
    title: 'Tracking',
    configFields: {
      key: 'configureTrackingFileSFTP',
      label: 'Configure tracking file formats provided by the carrier through SFTP',
      text: 'Carrier publishes files to FTP. Requires setup from both you and the carrier.',
    },
  },
]);

export const PRICING_OPTIONS = Object.freeze([
  { label: 'Basic carrier pricing', value: 'basic' },
  { label: 'ShipitSmarter base tariffs', value: 'shipSmarter' },
]);

export const CANCEL_OPTIONS = [
  {
    key: 'email',
    label: 'Email carrier cancellation',
  },
  {
    key: 'sms',
    label: 'Text message carrier cancellation',
  },
];
