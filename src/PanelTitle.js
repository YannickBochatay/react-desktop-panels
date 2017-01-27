import React, { PropTypes, Component } from "react"

const styles = {
  common : {
    minWidth : 35,
    flex : "0 1 125px",
    height : 20,
    border : "1px solid #ddd",
    borderBottom : "none",
    padding : "0px 10px",
    backgroundColor : "#eee",
    whiteSpace : "nowrap",
    overflow : "hidden",
    textOverflow : "ellipsis",
    borderRadius : "3px 3px 0 0"
  },
  active : {
    height : 23,
    backgroundColor : "white",
    transform : "translateY(1px)"
  },
  hover : { backgroundColor : "#f5f5f5" }
}

class PanelTitle extends Component {

  constructor(props) {

    super(props)

    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)

    this.state = { hover : false }
  }

  handleMouseOver(e) {

    this.setState({ hover : true })

    if (this.props.onMouseOver) this.props.onMouseOver(e)
  }

  handleMouseOut(e) {

    this.setState({ hover : false })

    if (this.props.onMouseOut) this.props.onMouseOut(e)
  }

  render() {

    const { style, active, children, ...rest } = this.props

    let defaultStyle = { ...styles.common }

    if (active) defaultStyle = { ...defaultStyle, ...styles.active }
    else if (this.state.hover) defaultStyle = { ...defaultStyle, ...styles.hover }

    return (
      <li
        { ...rest }
        style={ { ...defaultStyle, ...style } }
        onMouseOver={ this.handleMouseOver }
        onMouseOut={ this.handleMouseOut }
      >
        { children }
      </li>
    )
  }
}

PanelTitle.propTypes = {
  style : PropTypes.object,
  active : PropTypes.bool,
  children : PropTypes.node,
  onMouseOver : PropTypes.func,
  onMouseOut : PropTypes.func
}

export default PanelTitle
