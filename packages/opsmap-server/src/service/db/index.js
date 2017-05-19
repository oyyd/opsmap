// @flow
import { MongoClient } from 'mongodb'
import scene from './scene'

const IP = 'localhost'
const PORT = '27017'
const DBNAME = 'opsmap'
const CONNECT_URL = `mongodb://${IP}:${PORT}/${DBNAME}`

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
