// @flow
import domready from 'domready'
import touch from './touch'

function getConfig() {
  const metaTags = document.querySelectorAll('meta')

  let scenes = null
  let host = null

  metaTags.forEach((metaTag) => {
    const name = metaTag.getAttribute('name')
    const content = metaTag.getAttribute('content')

    if (!content) {
      return
    }

    if (name === 'opsmap-scenes') {
      scenes = content.split(',')
    } else if (name === 'opsmap-host') {
      host = content
    }
  })

  return {
    scenes,
    host,
  }
}

function main() {
  domready(() => {
    const config = getConfig()
    const { scenes } = config

    if (typeof config.host !== 'string') {
      return
    }

    touch(config, {
      scenes,
    })
  })
}

main()
