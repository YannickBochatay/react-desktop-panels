import React, { PropTypes, Component, Children } from "react"

const styles = {
  container : {
    display : "flex",
    flexDirection : "column"
  },
  ul : {
    display : "flex",
    flexDirection : "row",
    alignItems : "flex-end",
    margin : 0,
    padding : 0,
    listStyleType : "none",
    cursor : "default"
  },
  li : {
    minWidth : 35,
    flex : "0 1 125px",
    minHeight : 20,
    maxHeight : 20,
    border : "1px solid #ddd",
    borderBottom : "none",
    padding : "0px 10px",
    background : "#f5f5f5",
    whiteSpace : "nowrap",
    overflow : "hidden",
    textOverflow : "ellipsis"
  },
  liActive : {
    minHeight : 23,
    maxHeight : 23,
    background : "white",
    transform : "translateY(1px)"
  },
  content : {
    flex : 1,
    border : "1px solid #ddd",
    padding : 5
  }
}

class Panels extends Component {

  constructor(props) {

    super(props)

    this.state = { active : 0 }

  }

  handleClick(i) {

    this.setState({ active : i })

  }

  renderHeader() {

    const { active } = this.state

    return Children.map(this.props.children, (child, i) => {

      const { label } = child.props

      let style = { ...styles.li }

      if (active === i) style = { ...style, ...styles.liActive }

      return (
        <li style={ style } onClick={ this.handleClick.bind(this, i) } key={ "panelTitle" + i }>
          { label }
        </li>
      )

    })

  }

  renderActivePanel() {

    const { children } = this.props
    const { active } = this.state

    return Children.toArray(children)[active]

  }

  render() {

    const { style, ...rest } = this.props

    delete rest.children

    return (
      <div { ...rest } style={ { ...styles.container, ...style } }>
        <ul style={ styles.ul }>
          { this.renderHeader() }
        </ul>
        <div style={ styles.content }>
          { this.renderActivePanel() }
        </div>
      </div>
    )

  }
}

Panels.propTypes = {
  style : PropTypes.object,
  children : PropTypes.node
}

export default Panels
