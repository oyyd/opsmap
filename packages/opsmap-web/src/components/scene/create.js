import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import TitleRegion from '../title_region'
import { post } from '../../request'
import { getInstance } from '../utils'

const { Field } = Form

class Create extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      title: '',
    }
  }

  onSubmit(event) {
    event.preventDefault()

    const { title } = this.state

    post('/scene', {
      title,
    }).then(() => {
      console.log('success')
      getInstance('modal').then(modal => modal.open('success'))
    }).catch((err) => {
      console.log('fail')
      getInstance('modal').then(modal => modal.open(`creation failed: ${err.message}`))
    })
  }

  render() {
    const { onSubmit } = this
    return (
      <div>
        <TitleRegion
          icon="browser"
          title="Create Scene"
        />
        <Form
          onSubmit={onSubmit}
        >
          <Field>
            <label>title</label>
            <input
              placeholder="optional, like: 'index page'"
              onChange={e => this.setState({ title: e.target.value })}
            />
          </Field>
          <Button
            primary
            onClick={() => false}
          >
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default Create
