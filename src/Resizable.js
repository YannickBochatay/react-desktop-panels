import React, { Component } from "react"
import PropTypes from "prop-types"
import ReactDOM from "react-dom"
import Resizer from "./Resizer"

class Resizable extends Component {

  constructor(props) {

    super(props)

    this.setUnit = this.setUnit.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)

    this.state = { size : null }

    this.xClick = null
    this.yClick = null
    this.sizeInit = null

  }

  getComputedDim(unit = "px") {

    let { node } = this

    if (!node.getBoundingClientRect) node = ReactDOM.findDOMNode(node)

    let { width, height } = node.getBoundingClientRect()

    if (unit === "%" && this.unit === "%") {

      const parent = node.parentNode
      const dimParent = parent.getBoundingClientRect()
      const parentStyle = window.getComputedStyle(node.parentNode, null)
      const paddingLeft = parseFloat(parentStyle.paddingLeft)
      const paddingRight = parseFloat(parentStyle.paddingRight)
      const paddingTop = parseFloat(parentStyle.paddingTop)
      const paddingBottom = parseFloat(parentStyle.paddingBottom)

      const widthParent = dimParent.width - paddingLeft - paddingRight
      const heightParent = dimParent.height - paddingTop - paddingBottom

      width = Math.round(width / widthParent * 10000) / 100 + "%"
      height = Math.round(height / heightParent * 10000) / 100 + "%"

    }

    return { width, height }
  }

  getProp() {

    return this.props.direction === "row" ? "width" : "height"
  }

  handleDragStart(e) {

    this.xClick = e.pageX
    this.yClick = e.pageY

    const dim = this.getComputedDim("px")
    const prop = this.getProp()
    const size = dim[prop]

    if (!this.isControlled()) this.setState({ size })

    this.sizeInit = size

    if (this.props.onDrag) this.props.onDrag(size, e)
    if (this.props.onDragStart) this.props.onDragStart(size, e)
  }

  handleDragEnd(e) {

    const dim = this.getComputedDim("%")
    const prop = this.getProp()
    const size = dim[prop]

    if (!this.isControlled()) this.setState({ size })

    if (this.props.onDrag) this.props.onDrag(size, e)
    if (this.props.onDragEnd) this.props.onDragStart(size, e)
  }

  handleDrag(e) {

    const { direction, resizerPos, minSize, maxSize, onDrag } = this.props
    const controlled = this.isControlled()

    let size = this.sizeInit

    if (direction === "row") {

      const deltaX = (e.pageX - this.xClick) * (resizerPos === "before" ? -1 : 1)

      size = Math.min(maxSize, Math.max(minSize, this.sizeInit + deltaX))

    } else {

      const deltaY = (e.pageY - this.yClick) * (resizerPos === "before" ? -1 : 1)

      size = Math.min(maxSize, Math.max(minSize, this.sizeInit + deltaY))
    }

    if (!controlled) this.setState({ size })

    if (onDrag) onDrag(size, e)

  }

  getOwnDim() {

    const state = this.isControlled() ? this.props : this.state

    return state.size
  }

  isControlled() {

    const { initialSize, size } = this.props

    return size != null && initialSize == null
  }

  setUnit(dimension) {

    const dim = dimension || this.getOwnDim()

    this.unit = dim && /%/.test(dim) ? "%" : "px"
  }

  componentWillMount() {

    const { initialSize } = this.props

    if (initialSize == null) this.setUnit()
    else {
      this.setState({ size : initialSize })
      this.setUnit(initialSize)
    }
  }

  setContainerStyle() {

    const { direction } = this.props

    const size = this.getOwnDim()

    const style = {
      display : "flex",
      alignItems : "stretch",
      flexDirection : direction
    }

    if (size === null) style.flex = 1
    else if (direction === "row") style.width = size
    else style.height = size

    return style
  }

  render() {

    const { direction, children, resizerPos, resizerSize, style, ...rest } = this.props

    delete rest.minSize
    delete rest.maxSize
    delete rest.size
    delete rest.initialSize

    const content = (
      <div { ...rest } style={ { flex : 1, ...style } } >
        { children }
      </div>
    )

    const resizer = (
      <Resizer
        direction={ direction }
        onDragStart={ this.handleDragStart }
        onDrag={ this.handleDrag }
        onDragEnd={ this.handleDragEnd }
        size={ resizerSize }
      />
    )

    return (
      <div style={ this.setContainerStyle() } ref={ node => this.node = node }>
        { resizerPos === "before" ? resizer : content }
        { resizerPos === "before" ? content : resizer }
      </div>
    )

  }
}

Resizable.propTypes = {
  children : PropTypes.node,
  style : PropTypes.object,
  resizerPos : PropTypes.oneOf(["before", "after"]),
  resizerSize : PropTypes.number,
  onDragStart : PropTypes.func,
  onDrag : PropTypes.func,
  onDragEnd : PropTypes.func,
  direction : PropTypes.oneOf(["row", "column"]),
  initialSize : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minSize : PropTypes.number,
  maxSize : PropTypes.number,
  size : PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

Resizable.defaultProps = {
  direction : "row",
  resizerPos : "after",
  minSize : 80,
  maxSize : 2000
}


export default Resizable
