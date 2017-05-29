// @flow
import parse from 'ua-parser-js'
import crypto from 'crypto'
import type { UserAgentInfoType } from '../db/visit'

function createUserID(ip, ua) {
  const hash = crypto.createHmac('sha1', 'opsmap')
    .update(`${ip}${ua}`)
    .digest('hex')

  return hash
}

async function visit(ctx, ip, userAgent) {
  const { create } = ctx.app.service.db.visit
  const ua = parse(userAgent)
  const id = createUserID(ip, userAgent)

  const userAgentInfo: UserAgentInfoType = {
    ip,
    id,
    os: ua.os.name,
    browser: {
      name: ua.browser.name,
      version: ua.browser.version,
    },
  }

  return create(userAgentInfo)
}

export default async function createVisitService() {
  return {
    visit,
  }
}
