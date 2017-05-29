/* eslint-disable import/first */
import './setting'
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'

import './style.less'

function main(Comp) {
  ReactDOM.render(
    <AppContainer>
      <Comp />
    </AppContainer>,
    document.getElementById('main'),
  )
}

main(App)

if (module.hot) {
  module.hot.accept('./components/app', () => main(App))
}
