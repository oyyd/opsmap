// @flow
import { MongoClient } from 'mongodb'
import scene from './scene'

const CONNECT_URL = 'mongodb://localhost:27017/opsmap'

const list = {
  scene,
}

function createClient() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(CONNECT_URL, (err, db) => {
      if (err) {
        reject(err)
        return
      }

      resolve(db)
    })
  })
}

export default async function create() {
  const db = {}
  const client = await createClient()

  for (const name in list) {
    if (Object.hasOwnProperty.call(list, name)) {
      const createDao = list[name]

      db[name] = createDao({
        client,
      })
    }
  }

  return db
}
