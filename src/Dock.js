import React, { PropTypes, Component } from "react"

class Resizer extends Component {

  constructor(props) {

    super(props)

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)

    this.state = { pressed : false }

  }

  handleMouseDown(e) {

    this.setState({ pressed : true })
    this.node.addEventListener("mousemove", this.handleMouseMove)
    if (this.props.onDragStart) this.props.onDragStart(e)

  }

  handleMouseUp(e) {

    this.setState({ pressed : false })
    this.node.removeEventListener("mousemove", this.handleMouseMove)
    this.node.removeEventListener("mouseup", this.handleMouseUp)
    if (this.props.onDragEnd) this.props.onDragEnd(e)

  }

  handleMouseMove(e) {

    this.node.addEventListener("mouseup", this.handleMouseUp)
    if (this.props.onDrag) this.props.onDrag(e)

  }

  render() {

    const { vertical, ...rest } = this.props

    const style = {
      width : vertical ? 1 : "100%",
      height : vertical ? "100%" : 1,
      backgroundColor : "gray",
      display : "inline-block",
      cursor : vertical ? "ew-resize" : "ns-resize"
    }


    return (
      <span
        { ...rest }
        style={ style }
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
  vertical : PropTypes.bool
}

export default Resizer
