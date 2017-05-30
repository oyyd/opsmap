// @flow
import 'babel-polyfill'
import Koa from 'koa'
import koaBody from 'koa-body'
import router from './router'
import createService from './service'
import createController from './controller'
import { createConfig } from './config'

const PORT = 8000

function output(ctx, data, success = true, msg) {
  ctx.body = success ? {
    success,
    data,
  } : {
    success,
    msg,
  }
}

export default function create(config: any = createConfig()) {
  const app = new Koa()

  app.config = config
  app.output = output

  return createService().then((service) => {
    app.service = service

    return createController()
  })
  .then(controller => (app.controller = controller))
  .then(() => {
    app.use(koaBody())

    router(app)

    app.listen(PORT, () => {
      // eslint-disable-next-line
      console.log(`listening on ${PORT}`)
    })
  })
}

if (require.main === module) {
  create().catch(console.error) // eslint-disable-line
}
