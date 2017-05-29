import React, { Component } from 'react'
import { Grid, Menu } from 'semantic-ui-react'
import Create from './create'
import Edit from './edit'
import List from './list'
import MenuItem from '../menu/item'

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
              <MenuItem
                key={name}
                name={name}
                activeItem={activeItem}
                onClick={() => changeItem(name)}
              />
            ))}
          </Menu>
        </Column>
        <Column width={13}>
          <Comp />
        </Column>
      </Grid>
    )
  }
}

export default Scene
