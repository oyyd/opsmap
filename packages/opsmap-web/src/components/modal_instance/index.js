import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

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

    return (
      <Modal
        closeIcon="close"
        open={open}
      >
        <Header icon="archive" content="Archive Old Messages" />
        <Modal.Content>
          <p>
            {content}
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red">
            <Icon name="remove" /> No
          </Button>
          <Button color="green">
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ModalExampleCloseIcon
