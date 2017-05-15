// @flow
import { resolve } from 'path'
import serve from 'koa-static'
import createRouter from 'koa-router'

const PACKAGES = [
  'opsmap-web',
]

function relative(p) {
  return resolve(__dirname, p)
}

function nodeModulesPath(packageName) {
  return relative(`../node_modules/${packageName}/build`)
}

const REG = /static\/[^/]+\/(.+)/

function getFilePath(p) {
  const res = REG.exec(p)

  if (!res) {
    return null
  }

  return res[1]
}

export default function serveStatic(router: any) {
  PACKAGES.forEach((pkg) => {
    const servePkg = serve(nodeModulesPath(pkg))

    const subrouter = createRouter()

    subrouter.get('*', async (ctx, next) => {
      ctx.path = getFilePath(ctx.path)
      // TODO: this is too low level
      return servePkg(ctx, next)
    })

    router.use(`/static/${pkg}/`, subrouter.routes())
  })
}
