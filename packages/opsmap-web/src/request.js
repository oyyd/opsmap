import parse from 'url-parse'

function handleRequest(promise) {
  return promise.then(res => res.json()).then((res) => {
    if (!res.success) {
      throw new Error(res.message)
    }

    return res.data || res.success
  })
}

export function get(url, data) {
  const urlInfo = parse(url)

  urlInfo.set('query', Object.assign({}, urlInfo.query, data))

  return handleRequest(fetch(urlInfo.toString()))
}

export function post(url, data) {
  return handleRequest(fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }))
}
