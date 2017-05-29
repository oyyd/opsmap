// @flow
import 'babel-polyfill'
import Koa from 'koa'
import router from './router'
import createService from './service'
import createController from './controller'
import { createConfig } from './config'

const PORT = 8000

export default function create(config: any = createConfig()) {
  const app = new Koa()

  app.config = config

  return createService().then((service) => {
    app.service = service

    return createController()
  })
  .then(controller => (app.controller = controller))
  .then(() => {
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
