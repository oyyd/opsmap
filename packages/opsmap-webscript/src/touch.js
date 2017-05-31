// @flow
import qs from 'querystring'

type TouchConfigType = {
  hostname: string,
  port: string,
}

export function getURL(config, data) {
  const { hostname, port } = config
  const target = `//${hostname}:${port}?${qs.stringify(data)}`

  return target
}

export default function touch(config: TouchConfigType, data: any) {
  const target = getURL(config, data)
  const img = document.createElement('img')

  img.src = target
}
