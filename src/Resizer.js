import React, { Component } from "react"
import PropTypes from "prop-types"

class Resizer extends Component {

  constructor(props) {

    super(props)

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)

  }

  handleMouseDown(e) {

    document.addEventListener("mousemove", this.handleMouseMove)
    if (this.props.onDragStart) this.props.onDragStart(e)

  }

  handleMouseUp(e) {

    document.removeEventListener("mousemove", this.handleMouseMove)
    document.removeEventListener("mouseup", this.handleMouseUp)
    if (this.props.onDragEnd) this.props.onDragEnd(e)

  }

  handleMouseMove(e) {

    document.addEventListener("mouseup", this.handleMouseUp)
    if (this.props.onDrag) this.props.onDrag(e)

  }

  render() {

    const { direction, style, size, ...rest } = this.props

    const vertical = (direction === "row")

    const baseStyle = {
      width : vertical ? size : "100%",
      height : vertical ? "100%" : size,
      display : "inline-block",
      cursor : vertical ? "ew-resize" : "ns-resize"
    }


    return (
      <span
        { ...rest }
        style={ { ...baseStyle, ...style } }
        onMouseDown={ this.handleMouseDown }
        ref={ node => this.node = node }
      />
    )

  }
}

Resizer.propTypes = {
  onDragStart : PropTypes.func,
  onDrag : PropTypes.func,
  onDragEnd : PropTypes.func,
  style : PropTypes.object,
  direction : PropTypes.oneOf(["row", "column"]),
  size : PropTypes.number
}

Resizer.defaultProps = {
  direction : "row",
  size : 5
}

export default Resizer
