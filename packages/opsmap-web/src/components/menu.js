import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import BasicInfo from './basic_info'
import Scene from './scene'

const { Item } = Menu

const MENUS = {
  BasicInfo,
  Scene,
}

const styles = {
  container: {
    padding: '0 16px',
  },
}

class AppMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeItem: 'BasicInfo',
    }
  }

  render() {
    const { activeItem } = this.state
    const Comp = MENUS[activeItem]

    return (
      <div>
        <Menu
          pointing
          secondary
        >
          {Object.keys(MENUS).map(name => (
            <Item
              key={name}
              name={name}
              active={activeItem === name}
              onClick={() => this.setState({ activeItem: name })}
            >
              {name}
            </Item>
          ))}
        </Menu>
        <div style={styles.container}>
          <Comp />
        </div>
      </div>
    )
  }
}

export default AppMenu
