const path = require('path')
// eslint-disable-next-line
const chokidar = require('chokidar')
const childProcess = require('child_process')
const packageJSON = require('../package.json')

const relative = p => path.resolve(__dirname, p)

const FIRST_CHECK_TIME = 1000
const WAIT_TIME_FOR_CHANGE = 300
const MAX_RETRY_TIMES = 2
const START_SCRIPT = packageJSON.scripts['start:dev']
const BUILD_SCRIPT = packageJSON.scripts['build:watch']

function timer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, WAIT_TIME_FOR_CHANGE)
  })
}

function onAllEvent(watcher, next) {
  watcher.on('all', (/* event, p */) => {
    next()
  })
}

function restart(ctx) {
  const { child } = ctx

  if (child) {
    child.kill()
  }

  const nextChild = childProcess.exec(START_SCRIPT, (error) => {
    if (!error) {
      return
    }

    ctx.retryTimes = ctx.retryTimes || 0
    ctx.retryTimes += 1

    if (ctx.retryTimes <= MAX_RETRY_TIMES) {
      ctx.child = restart(ctx)
    }
  })

  nextChild.stdout.pipe(process.stdin, {
    // NOTE: do not end the writer(process.stdin) when
    // the reader(nextChild.stdout) ends
    end: false,
  })

  nextChild.stderr.pipe(process.stderr, {
    end: false,
  })

  nextChild.on('close', () => {
    nextChild.stdout.unpipe(process.stdin)
    nextChild.stderr.unpipe(process.stderr)
  })

  return nextChild
}

function onFileChange(ctx) {
  const tick = Date.now()
  ctx.tick = tick

  timer().then(() => {
    if (tick !== ctx.tick) {
      return
    }

    ctx.child = restart(ctx)
  })
}

function build() {
  const child = childProcess.exec(BUILD_SCRIPT)

  child.stdout.pipe(process.stdin, {
    // NOTE: do not end the writer(process.stdin) when
    // the reader(child.stdout) ends
    end: false,
  })

  child.stderr.pipe(process.stderr, {
    end: false,
  })

  child.on('close', () => {
    child.stdout.unpipe(process.stdin)
    child.stderr.unpipe(process.stderr)
  })

  return child
}

function watch() {
  const ctx = {}
  const watcher = chokidar.watch(relative('../lib'))
  const start = onFileChange.bind(null, ctx)
  const onAll = onAllEvent.bind(null, watcher, start)

  build()

  setTimeout(() => {
    start()

    onAll()
  }, FIRST_CHECK_TIME)
}

if (require.main === module) {
  watch()
}
