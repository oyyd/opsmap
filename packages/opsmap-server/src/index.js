// @flow
import Koa from 'koa'

export default function create() {
  const app = new Koa()

  app.use((ctx) => {
    ctx.body = 'Hello'
  })

  app.listen(8000)
}

if (require.main === module) {
  create()
}
