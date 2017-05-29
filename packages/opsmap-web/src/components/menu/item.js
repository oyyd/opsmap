import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { string, func } from 'prop-types'

class Item extends Component {
  render() {
    const { name, onClick, activeItem,
      // eslint-disable-next-line
      children } = this.props

    return (
      <Menu.Item
        key={name}
        name={name}
        active={activeItem === name}
        onClick={onClick}
      >
        {children}
      </Menu.Item>
    )
  }
}

Item.propTypes = {
  activeItem: string.isRequired,
  name: string.isRequired,
  onClick: func.isRequired,
}

export default Item
