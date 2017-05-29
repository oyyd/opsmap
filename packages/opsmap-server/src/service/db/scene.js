// @flow
import uuidV1 from 'uuid/v1'
import { promisify } from '../utils'

const NAME = 'scene'

export type SceneCreationType = {
  sceneId: string,
  title: string,
};

async function create(client, title = '') {
  const col = client.collection(NAME)
  const sceneId = uuidV1()

  const filter = {
    sceneId,
  }
  const update = {
    $setOnInsert: {
      sceneId,
      title,
    },
  }

  return promisify(col, 'updateOne', filter, update, { upsert: true })
}

export default function createDao(options: { client: any }) {
  const { client } = options

  return {
    create: create.bind(null, client),
  }
}
