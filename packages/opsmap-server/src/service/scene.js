// @flow
async function create(ctx, title) {
  const { create: c } = ctx.app.service.db.scene

  const { result } = await c(title)

  return result.n === 1 && result.ok === 1
}

async function find(ctx, query = {}) {
  const { get: f } = ctx.app.service.db.scene

  return f(query)
}

export default async function createVisitService() {
  return {
    create,
    find,
  }
}
