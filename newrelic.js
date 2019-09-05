exports.config = {
  app_name: [
    'ApiGateway_PRD',
  ],
  license_key: '0254d1436233ce71eebeef18fbeadeb7ee6c73c6',
  logging: {
    enabled: false,
    level: 'info',
    filepath: '/var/log/api-gateway_newrelic.log',
  },
  allow_all_headers: true,
  attributes: {
    exclude: [],
  },
}
