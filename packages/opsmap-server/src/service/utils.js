// eslint-disable-next-line
export function promisify(collection, method, ...args) {
  return new Promise((resolve, reject) => {
    collection[method](...args, (err, result) => {
      if (err) {
        reject(err)
        return
      }

      resolve(result)
    })
  })
}
