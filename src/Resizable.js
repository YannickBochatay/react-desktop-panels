import React, { Component } from "react"
import PropTypes from "prop-types"
import ReactDOM from "react-dom"
import Resizer from "./Resizer"

class Resizable extends Component {

  constructor(props) {

    super(props)

    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)

    this.xClick = null
    this.yClick = null
    this.sizeInit = null
    this.zoomFactor = 1

    this.state = { size : this.props.initialSize || this.props.size }
  }

  getNode() {
    const { node } = this

    return node.getBoundingClientRect ? node : ReactDOM.findDOMNode(node)
  }

  getZoomFactor() {
    const node = this.getNode()
    const { width, height } = node.getBoundingClientRect()

    return { x : node.offsetWidth / width, y : node.offsetHeight / height }
  }

  getComputedDim(unit = "px") {
    const node = this.getNode()

    let width = node.offsetWidth
    let height = node.offsetHeight

    if (unit === "%" && this.unit === "%") {

      const parent = node.parentNode
      const parentWidth = parent.offsetWidth
      const parentHeight = parent.offsetHeight
      const parentStyle = window.getComputedStyle(node.parentNode, null)
      const paddingLeft = parseFloat(parentStyle.paddingLeft)
      const paddingRight = parseFloat(parentStyle.paddingRight)
      const paddingTop = parseFloat(parentStyle.paddingTop)
      const paddingBottom = parseFloat(parentStyle.paddingBottom)
      const borderTop = parseFloat(parentStyle.borderTopWidth)
      const borderBottom = parseFloat(parentStyle.borderBottomWidth)
      const borderLeft = parseFloat(parentStyle.borderLeftWidth)
      const borderRight = parseFloat(parentStyle.borderRightWidth)

      const widthParent = parentWidth - paddingLeft - paddingRight - borderLeft - borderRight
      const heightParent = parentHeight - paddingTop - paddingBottom - borderTop - borderBottom

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
    this.zoomFactor = this.getZoomFactor()
    this.unit = this.getUnit()

    const dim = this.getComputedDim("px")
    const prop = this.getProp()
    const size = dim[prop]

    if (!this.isControlled()) this.setState({ size })

    this.sizeInit = size

    if (this.props.onDrag) this.props.onDrag(size, e)
    if (this.props.onDragStart) this.props.onDragStart(size, e)
  }

  handleDragEnd(e) {

    const { onDrag, onDragEnd, onResized } = this.props

    const dim = this.getComputedDim("%")
    const prop = this.getProp()
    const size = dim[prop]
    const isControlled = this.isControlled()

    if (!isControlled) {
      this.setState({ size })
      this.sizeInit = null
    }

    if (onDrag) onDrag(size, e)
    if (onDragEnd) onDragEnd(size, e)
    if (onResized) onResized(size, e)
  }

  handleDrag(e) {

    const { direction, resizerPos, minSize, maxSize, onDrag } = this.props
    const controlled = this.isControlled()

    let size

    if (direction === "row") {

      const offset = (e.pageX - this.xClick) * this.zoomFactor.x
      const deltaX = offset * (resizerPos === "before" ? -1 : 1)

      size = Math.min(maxSize, Math.max(minSize, this.sizeInit + deltaX))

    } else {

      const offset = (e.pageY - this.yClick) * this.zoomFactor.y
      const deltaY = offset * (resizerPos === "before" ? -1 : 1)

      size = Math.min(maxSize, Math.max(minSize, this.sizeInit + deltaY))
    }

    if (!controlled) this.setState({ size })

    if (onDrag) onDrag(size, e)

  }

  getOwnDim() {

    const useProps = this.isControlled() || (this.isSemiControlled() && this.sizeInit == null)

    return this[useProps ? "props" : "state"].size
  }

  isControlled() {

    const { size, initialSize, onDrag, onResized } = this.props

    return initialSize == null && size != null && onDrag != null && onResized == null
  }

  isSemiControlled() {

    const { size, initialSize, onResized } = this.props

    return initialSize == null && size != null && onResized != null
  }

  getUnit() {

    const dim = this.getOwnDim()

    return dim && /%/.test(dim) ? "%" : "px"
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

    const { direction, children, resizerPos, resizerSize, resizerStyle, resizerRenderer, style, ...rest } = this.props

    delete rest.minSize
    delete rest.maxSize
    delete rest.size
    delete rest.initialSize
    delete rest.minSize
    delete rest.maxSize
    delete rest.onDragStart
    delete rest.onDrag
    delete rest.onDragEnd
    delete rest.onResized

    const content = (
      <div { ...rest } style={ { flex : 1, ...style } } >
        { children }
      </div>
    )

    const resizerProps = {
      direction,
      onDragStart : this.handleDragStart,
      onDrag : this.handleDrag,
      onDragEnd : this.handleDragEnd
    }

    if (resizerSize) resizerProps.size = resizerSize
    if (resizerStyle) resizerProps.style = resizerStyle
    if (resizerRenderer) resizerProps.renderer = resizerRenderer

    const resizer = <Resizer { ...resizerProps }/>

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
  resizerStyle : PropTypes.object,
  resizerRenderer : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  onDragStart : PropTypes.func,
  onDrag : PropTypes.func,
  onDragEnd : PropTypes.func, // for fully controlled use
  onResized : PropTypes.func, // for semi-controlled use
  direction : PropTypes.oneOf(["row", "column"]),
  initialSize : PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // for uncontrolled use
  minSize : PropTypes.number,
  maxSize : PropTypes.number,
  size : PropTypes.oneOfType([PropTypes.number, PropTypes.string]) // for semi or fully controlled use
}

Resizable.defaultProps = {
  direction : "row",
  resizerPos : "after",
  minSize : 0,
  maxSize : Infinity
}


export default Resizable
