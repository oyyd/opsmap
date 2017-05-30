// @flow
import defer from 'promise-defer'

let instances = null
const instanceInitDeferred = defer()
const instanceInitPromise = instanceInitDeferred.promise

export function initInstances(refers) {
  instances = refers
  instanceInitDeferred.resolve()
}

export function getInstance(name) {
  return instanceInitPromise.then(() => instances[name])
}
