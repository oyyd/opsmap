// @flow
import 'babel-polyfill'
import Koa from 'koa'
import router from './router'
import createService from './service'
import createController from './controller'

const PORT = 8000

export default function create() {
  const app = new Koa()

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
