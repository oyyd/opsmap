import React, { Component } from 'react'
import { Divider, Header, Icon } from 'semantic-ui-react'
import { string } from 'prop-types'

class TitleRegion extends Component {
  render() {
    const { title, icon } = this.props
    return (
      <div>
        <Header as="h2">
          <Icon name={icon} />
          <Header.Content>
            {title}
          </Header.Content>
        </Header>
        <Divider />
      </div>
    )
  }
}

TitleRegion.propTypes = {
  title: string.isRequired,
  icon: string.isRequired,
}

export default TitleRegion
