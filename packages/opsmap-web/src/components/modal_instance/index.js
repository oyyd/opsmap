import React, { Component } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'

class ModalExampleCloseIcon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: 'Hello',
      open: false,
    }
  }

  open(content) {
    this.setState({
      open: true,
      content,
    })
  }

  render() {
    const { open, content } = this.state

    const close = () => this.setState({ open: false })

    return (
      <Modal
        closeIcon="close"
        open={open}
        onClose={close}
      >
        <Header icon="archive" content="Archive Old Messages" />
        <Modal.Content>
          <p>
            {content}
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            onClick={close}
          >
            I know
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ModalExampleCloseIcon
