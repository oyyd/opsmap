// @flow
import createRouter from 'koa-router'
import tmplPlatform from './templates/platform'
import serveStatic from './static_file'

export default function route(app: any) {
  const { config, controller } = app
  const router = createRouter()

  serveStatic(router)

  router.get('/', (ctx) => {
    ctx.body = tmplPlatform(config)
  })

  router.get('/visit', controller.visit)
  router.get('/get_visit', controller.getVisit)
  router.get('/scene', controller.findScene)
  router.post('/scene', controller.createScene)

  app.use(router.routes())
    .use(router.allowedMethods())
}
