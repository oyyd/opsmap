const path = require('path')
// eslint-disable-next-line
const chokidar = require('chokidar')
const childProcess = require('child_process')

const relative = p => path.resolve(__dirname, p)

const WAIT_TIME_FOR_CHANGE = 300
const MAX_RETRY_TIMES = 2
const START_SCRIPT = 'npm run start:dev'

function onReady(watcher) {
  return new Promise((resolve) => {
    watcher.on('ready', () => {
      resolve()
    })
  })
}

function timer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, WAIT_TIME_FOR_CHANGE)
  })
}

function onAllEvent(watcher, next) {
  watcher.on('all', (event, p) => {
    next(event, p)
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

function onFileChange(ctx/* , event, p*/) {
  const tick = Date.now()
  ctx.tick = tick

  timer().then(() => {
    if (tick !== ctx.tick) {
      return
    }

    ctx.child = restart(ctx)
  })
}

function watch() {
  const ctx = {}
  const watcher = chokidar.watch(relative('../lib'))
  const onAll = onAllEvent.bind(null, watcher, onFileChange.bind(null, ctx))

  onReady(watcher).then(() => {
    ctx.child = restart(ctx)
    onAll()
  })
}

if (require.main === module) {
  watch()
}
