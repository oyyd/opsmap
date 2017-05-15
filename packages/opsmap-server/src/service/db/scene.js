// @flow
import { Long } from 'mongodb'

const NAME = 'records'

function createID() {
  const date = new Date()

  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)

  return Long.fromNumber(date.valueOf())
}

function create(client, value) {
  const timestamp = createID()

  const col = client.collection(NAME)

  return new Promise((resolve, reject) => {
    col.insert({
      timestamp,
      value,
    }, (err, result) => {
      if (err) {
        reject(err)
        return
      }

      resolve(result)
    })
  })
}

export default function createDao(options: { client: any }) {
  const { client } = options

  return {
    create: create.bind(null, client),
  }
}
