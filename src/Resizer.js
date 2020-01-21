import React, { Component } from "react"
import PropTypes from "prop-types"

const Renderer = ({ direction, size, style, ...rest }) => {

  const vertical = (direction === "row")

  const fullStyle = {
    width : vertical ? size : "100%",
    height : vertical ? "100%" : size,
    display : "inline-block",
    cursor : vertical ? "col-resize" : "row-resize",
    ...style
  }

  return <span style={ fullStyle } { ...rest }/>
}

Renderer.propTypes = {
  direction : PropTypes.oneOf(["row", "column"]),
  size : PropTypes.number,
  style : PropTypes.object
}

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

    const { renderer, ...rest } = this.props

    delete rest.onDragStart
    delete rest.onDrag
    delete rest.onDragEnd

    return React.createElement(renderer, {
      ...rest,
      onMouseDown : this.handleMouseDown,
      ref : node => this.node = node
    })
  }
}

Resizer.propTypes = {
  onDragStart : PropTypes.func,
  onDrag : PropTypes.func,
  onDragEnd : PropTypes.func,
  style : PropTypes.object,
  direction : PropTypes.oneOf(["row", "column"]),
  size : PropTypes.number,
  renderer : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string])
}

Resizer.defaultProps = {
  direction : "row",
  size : 5,
  renderer : Renderer
}

export default Resizer
