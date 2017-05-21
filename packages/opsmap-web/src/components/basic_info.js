import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

function sendVisit(value) {
  return fetch(`/visit?value=${value}`)
}

function getVisit() {
  return fetch('/get_visit')
}

class BasicInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pv: null,
    }
  }

  componentWillMount() {
    getVisit().then(res => res.text()).then(pv => this.setState({ pv }))
  }

  render() {
    const { pv } = this.state

    if (!pv) {
      return null
    }

    return (
      <div>
        <h1>opsmap</h1>
        <div>
          uv: TODO
          pv: {pv}
        </div>
        <Button onClick={() => sendVisit('hi')}>visit</Button>
      </div>
    )
  }
}

export default BasicInfo
