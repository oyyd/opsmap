import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { get } from '../../request'
import TitleRegion from '../title_region'
import { notify } from '../utils'

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: null,
    }
  }

  componentDidMount() {
    get('/scene').then((list) => {
      this.setState({
        list,
      })
    }).catch((err) => {
      notify(err.message)
    })
  }

  render() {
    const { list } = this.state
    return (
      <div>
        <TitleRegion
          title="Scene List"
          icon="browser"
        />
        {list ? (
          <Table
            celled
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>title</Table.HeaderCell>
                <Table.HeaderCell>scene id</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {list.map(item => (
                <Table.Row key={item.sceneId}>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>{item.sceneId}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : null}
      </div>
    )
  }
}

export default List
