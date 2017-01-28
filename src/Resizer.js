import React, { PropTypes, Component } from "react"

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

    const { direction, style, ...rest } = this.props

    const vertical = (direction === "row")

    const baseStyle = {
      width : vertical ? 5 : "100%",
      height : vertical ? "100%" : 5,
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
  direction : PropTypes.oneOf(["row", "column"])
}

Resizer.defaultProps = {
  direction : "row"
}

export default Resizer
