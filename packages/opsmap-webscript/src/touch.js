// @flow
import qs from 'querystring'

type TouchConfigType = {
  host: string,
}

export function getURL(config: TouchConfigType, data: any) {
  const { host } = config

  const target = `//${host}/visit?${qs.stringify(data)}`

  return target
}

export default function touch(config: TouchConfigType, data: any) {
  const target = getURL(config, data)
  const img = document.createElement('img')

  img.src = target
}
