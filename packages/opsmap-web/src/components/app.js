import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

function sendVisit(value) {
  return fetch(`/visit?value=${value}`)
}

class App extends Component {
  render() {
    return (
      <div>
        <h1>opsmap</h1>
        <div>
          uv: TODO
          pv: TODO
          <Button onClick={() => sendVisit('hi')}>visit</Button>
        </div>
      </div>
    )
  }
}

export default App
