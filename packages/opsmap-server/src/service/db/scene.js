// @flow
import { Long } from 'mongodb'
import { promisify } from '../utils'

const NAME = 'records'

export type UserAgentInfoType = {
  id: string,
  browser: {
    name: string,
    major: string,
  },
  os: string,
  ip: string,
}

function getTimestamp() {
  const date = new Date()

  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)

  return Long.fromNumber(date.valueOf())
}

function create(client, userAgentInfo: UserAgentInfoType) {
  const timestamp = getTimestamp()

  const col = client.collection(NAME)

  // TODO: need a better solution
  return promisify(col, 'insert', Object.assign({}, userAgentInfo, {
    timestamp,
  }))
}

function getVisit(client) {
  const col = client.collection(NAME)

  const cursor = col.find()

  return promisify(cursor, 'toArray')
}

export default function createDao(options: { client: any }) {
  const { client } = options

  return {
    create: create.bind(null, client),
    getVisit: getVisit.bind(null, client),
  }
}
