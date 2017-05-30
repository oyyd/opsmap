// @flow
import domready from 'domready'
import { visit } from './visit'

function getConfig() {
  const scenes = []

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
