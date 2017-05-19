// @flow
import db from './db'
import scene from './scene'

export const list = {
  db,
  scene,
}

export default async function createService() {
  const service = {}

  for (const name in list) {
    if (Object.hasOwnProperty.call(list, name)) {
      const create = list[name]

      service[name] = await create()
    }
  }

  return service
}
