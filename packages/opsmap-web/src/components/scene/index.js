import React, { Component } from 'react'
import { Grid, Menu } from 'semantic-ui-react'
import Create from './create'
import Edit from './edit'
import List from './list'

const { Column } = Grid

const regions = {
  List,
  Create,
  Edit,
}

class Scene extends Component {
  constructor(props) {
    super(props)

    this.changeItem = this.changeItem.bind(this)

    this.state = {
      activeItem: 'Create',
    }
  }

  changeItem(activeItem) {
    this.setState({
      activeItem,
    })
  }

  render() {
    const { changeItem } = this
    const { activeItem } = this.state
    const Comp = regions[activeItem]

    return (
      <Grid>
        <Column width={3}>
          <Menu fluid vertical tabular>
            {Object.keys(regions).map(name => (
              <Menu.Item
                name={name}
                active={activeItem === name}
                onClick={() => changeItem(name)}
              />
            ))}
          </Menu>
        </Column>
        <Column width={12}>
          <Comp />
        </Column>
      </Grid>
    )
  }
}

export default Scene
