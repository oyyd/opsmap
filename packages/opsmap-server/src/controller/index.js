// @flow
async function visit(ctx) {
  const { visit: v } = ctx.app.service.visit
  const userAgent = ctx.request.headers['user-agent'] || ''
  const { ip } = ctx.request

  await v(ctx, ip, userAgent)

  ctx.body = 'success'
}

async function getVisit(ctx) {
  const { getVisit: get } = ctx.app.service.db.visit

  const res = await get()

  ctx.body = res.length
}

async function createScene(ctx) {
  const { create } = ctx.app.service.scene
  const title = ctx.request.body.title || ''

  const success = await create(ctx, title)

  ctx.body = {
    success,
  }
}

async function findScene(ctx) {
  const { find } = ctx.app.service.scene

  const res = await find(ctx)

  ctx.app.output(ctx, res)
}

export default async function createController() {
  return {
    visit,
    getVisit,
    createScene,
    findScene,
  }
}
