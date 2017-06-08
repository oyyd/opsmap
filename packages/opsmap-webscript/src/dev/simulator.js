import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import createIframeTmpl from './tmpl'

class Simulator extends Component {
  constructor(props) {
    super(props)

    this.trigger = this.trigger.bind(this)

    this.refers = {}

    this.state = {
      host: 'localhost:8000',
      scenes: 'abc',
    }
  }

  trigger() {
    const { container } = this.refers
    const { host, scenes } = this.state
    const tmpl = createIframeTmpl({ host, scenes })

    const iframe = document.createElement('iframe')

    container.innerHTML = ''

    container.appendChild(iframe)

    iframe.contentDocument.write(tmpl)
    iframe.contentDocument.close()
  }

  render() {
    const { trigger } = this
    const { host, scenes } = this.state
    return (
      <div>
        <div>
          <label>host</label>
          <input
            value={host}
            onChange={v => this.setState({ host: v.target.value })}
          />
        </div>
        <div>
          <label>scenes</label>
          <input
            value={scenes}
            onChange={v => this.setState({ scenes: v.target.value })}
          />
        </div>
        <button onClick={trigger}>trigger</button>
        <div
          ref={container => (this.refers.container = container)}
          style={{ display: 'none' }}
        />
      </div>
    )
  }
}

if (module === require.main) {
  ReactDOM.render(<Simulator />, document.getElementById('main'))
}
