import React, { Component } from 'react'
import Menu from './menu'
import ModalInstance from './modal_instance'
import { initInstances } from './utils'

class App extends Component {
  constructor(props) {
    super(props)

    this.refers = {}

    this.state = {

    }
  }

  componentDidMount() {
    initInstances(this.refers)
  }

  render() {
    return (
      <div>
        <ModalInstance
          ref={modal => (this.refers.modal = modal)}
        />
        <Menu />
      </div>
    )
  }
}

export default App
