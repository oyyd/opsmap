import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'

import './style.less'

function main() {
  ReactDOM.render(
    <App />,
    document.getElementById('main'),
  )
}

main()
