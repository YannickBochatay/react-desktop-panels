import React, { PropTypes, Component, Children } from "react"
import ReactDOM from "react-dom"
import Resizer from "./Resizer"

class Resizable extends Component {

  constructor(props) {

    super(props)

    this.setDimInit = this.setDimInit.bind(this)
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

  getAndSetDim(units, callback) {

    let { node } = this

    if (!node.getBoundingClientRect) node = ReactDOM.findDOMNode(node)

    let { width, height } = node.getBoundingClientRect()

    if (units === "%") {

      const parent = node.parentNode
      const dimParent = parent.getBoundingClientRect()


      width = Math.round(width / dimParent.width * 10000) / 100 + "%"
      height = Math.round(height / dimParent.height * 10000) / 100 + "%"

    }

    this.setState({ width, height }, callback)

  }

  handleDragStart(e) {

    this.xClick = e.pageX
    this.yClick = e.pageY

    this.getAndSetDim("px", this.setDimInit)

    if (this.props.onDragStart) this.props.onDragStart(e)

  }

  handleDragEnd(e) {

    this.getAndSetDim("%")

    if (this.props.onDragEnd) this.props.onDragEnd(e)

  }

  handleDrag(e) {

    const { orientation, resizerPos, minSize } = this.props

    const vertical = (orientation === "vertical")

    if (vertical) {

      const deltaX = (e.pageX - this.xClick) * (resizerPos === "before" ? -1 : 1)
      const width = Math.max(minSize, this.widthInit + deltaX)

      this.setState({ width })

    } else {

      const deltaY = (e.pageY - this.yClick) * (resizerPos === "before" ? -1 : 1)
      const height = Math.max(minSize, this.heightInit + deltaY)

      this.setState({ height })

    }

    if (this.props.onDrag) this.props.onDrag(e)

  }

  setDimInit() {

    this.widthInit = this.state.width
    this.heightInit = this.state.height

  }

  setStyle() {

    const { orientation, style } = this.props
    const { width, height } = this.state
    const vertical = (orientation === "vertical")

    const fullStyle = {
      display : "flex",
      alignItems : "stretch",
      flexDirection : (vertical ? "row" : "column"),
      ...style
    }

    if (width === null && height === null) {
      if (vertical && !fullStyle.width || !vertical && !fullStyle.height) fullStyle.flex = 1
    }
    else if (vertical) fullStyle.width = width
    else fullStyle.height = height

    return fullStyle

  }

  render() {

    const { orientation, children, resizerPos, ...rest } = this.props

    delete rest.minSize

    const content = (
      <div style={ { flex : 1 } }>
        { Children.map(children, child => (
            React.cloneElement(child, {
              style : { height : "100%", ...child.props.style }
            })
          ))
        }
      </div>
    )

    const resizer = (
      <Resizer
        orientation={ orientation }
        onDragStart={ this.handleDragStart }
        onDrag={ this.handleDrag }
        onDragEnd={ this.handleDragEnd }
      />
    )

    return (
      <div { ...rest } style={ this.setStyle() } ref={ node => this.node = node }>
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
  orientation : PropTypes.oneOf(["vertical", "horizontal"]),
  minSize : PropTypes.number
}

Resizable.defaultProps = {
  orientation : "vertical",
  resizerPos : "after",
  minSize : 80
}


export default Resizable
