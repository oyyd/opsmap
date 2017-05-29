// @flow
async function create(ctx, title) {
  const { create: c } = ctx.app.service.db.scene

  const { result } = await c(title)

  return result.n === 1 && result.ok === 1
}

export default async function createVisitService() {
  return {
    create,
  }
}
