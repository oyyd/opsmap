// @flow
import domready from 'domready'
import visit from './visit'

function getConfig() {
  let scenes = null

  const metaTags = document.getElementByTags('meta')

  metaTags.forEach((metaTag) => {
    const name = metaTag.getAttribute('name')

    if (name !== 'opsmap-scenes') {
      return
    }

    const content = metaTag.getAttribute('content')

    if (content) {
      scenes = content.split(',')
    }
  })

  return {
    scenes,
  }
}

function init() {

}

function main() {
  domready(() => {
    const config = getConfig()

    init(config)
    visit(config)
  })
}

main()
