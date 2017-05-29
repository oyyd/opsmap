// @flow
const DEFAULT_CONFIGS = {
  'web-static-prefix': '/static/opsmap-web/',
}

// eslint-disable-next-line
export function createConfig(argv) {
  const config = Object.assign({}, DEFAULT_CONFIGS)

  Object.keys(DEFAULT_CONFIGS).forEach((key) => {
    if (argv[key]) {
      config[key] = argv[key]
    }
  })

  return config
}
