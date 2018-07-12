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

    this.state = {
      width : null,
      height : null
    }

    this.xClick = null
    this.yClick = null
    this.widthInit = null
    this.heightInit = null

  }

  getComputedDim(unit = "px") {

    let { node } = this

    if (!node.getBoundingClientRect) node = ReactDOM.findDOMNode(node)

    let { width, height } = node.getBoundingClientRect()

    if (unit === "%" && this.unit == "%") {

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

  handleDragStart(e) {

    this.xClick = e.pageX
    this.yClick = e.pageY
      

    const dim = this.getComputedDim("px")

    const callback = () => {

      this.widthInit = dim.width
      this.heightInit = dim.height
      
      if (this.props.onDrag) this.props.onDrag(dim)
      if (this.props.onDragStart) this.props.onDragStart(dim)
    }

    if (this.isControlled()) callback()
    else this.setState(dim, callback)
  }

  handleDragEnd(e) {

    const dim = this.getComputedDim("%")

    const callback = () => {
      if (this.props.onDrag) this.props.onDrag(dim)
      if (this.props.onDragEnd) this.props.onDragStart(dim)
    }

    if (this.isControlled()) callback()
    else this.setState(dim, callback)
  }

  handleDrag(e) {

    const { direction, resizerPos, minSize, maxSize, onDrag } = this.props
    const controlled = this.isControlled()

    let width = this.widthInit
    let height = this.heightInit

    if (direction === "row") {

      const deltaX = (e.pageX - this.xClick) * (resizerPos === "before" ? -1 : 1)
      
      width = Math.min(maxSize, Math.max(minSize, this.widthInit + deltaX))

      if (!controlled) this.setState({ width })

    } else {

      const deltaY = (e.pageY - this.yClick) * (resizerPos === "before" ? -1 : 1)
      
      height = Math.min(maxSize, Math.max(minSize, this.heightInit + deltaY))

      if (!controlled) this.setState({ height })
    }

    if (onDrag) onDrag({ width, height })

  }

  getOwnDim() {
    
    const { width, height } = this.isControlled() ? this.props : this.state

    return { width, height }
  }

  isControlled() {

    return ("width" in this.props || "height" in this.props)
  }

  setUnit() {

    const prop = direction === "row" ? "width" : "height"
    const state = this.isControlled() ? this.props : this.state

    this.unit = /%/.test(state[prop]) ? "%" : "px"
  }

  componentWillMount() {

    const { defaultSize, direction } = this.props

    const prop = direction === "row" ? "width" : "height"

    if (defaultSize != null) {

      this.setState({ [prop] : defaultSize })
    }
  }

  setContainerStyle() {

    const { direction } = this.props

    const { width, height } = this.getOwnDim()

    const style = {
      display : "flex",
      alignItems : "stretch",
      flexDirection : direction
    }

    if (width === null && height === null) style.flex = 1
    else if (direction === "row") style.width = width
    else style.height = height

    return style
  }

  render() {

    const { direction, children, resizerPos, style, ...rest } = this.props

    delete rest.minSize
    delete rest.maxSize
    delete rest.defaultSize

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
  onDragStart : PropTypes.func,
  onDrag : PropTypes.func,
  onDragEnd : PropTypes.func,
  direction : PropTypes.oneOf(["row", "column"]),
  defaultSize : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minSize : PropTypes.number,
  maxSize : PropTypes.number,
  width : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height : PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

Resizable.defaultProps = {
  direction : "row",
  resizerPos : "after",
  minSize : 80,
  maxSize : 2000
}


export default Resizable
