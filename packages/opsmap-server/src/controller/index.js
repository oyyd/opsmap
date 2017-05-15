// @flow
async function visit(ctx) {
  const { create } = ctx.app.service.db.scene
  const value = ctx.request.query.value || ''

  await create(value)

  ctx.body = 'success'
}

export default async function createController() {
  return {
    visit,
  }
}
