import yargs from 'yargs'
import { createConfig } from '../config'
import createServer from '../index'

function main() {
  // create config
  const { argv } = yargs
  const config = createConfig(argv)

  // start server
  createServer(config).catch(console.error) // eslint-disable-line
}

if (require.main === module) {
  main()
}
