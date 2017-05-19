// @flow
async function visit(ctx) {
  const { visit: v } = ctx.app.service.scene
  const userAgent = ctx.request.headers['user-agent'] || ''
  const { ip } = ctx.request

  await v(ctx, ip, userAgent)

  ctx.body = 'success'
}

async function getVisit(ctx) {
  const { getVisit: get } = ctx.app.service.db.scene

  const res = await get()

  ctx.body = res.length
}

export default async function createController() {
  return {
    visit,
    getVisit,
  }
}
