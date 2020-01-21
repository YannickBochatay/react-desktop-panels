import React, { Component, Children } from "react"
import PropTypes from "prop-types"
import Resizable from "./Resizable"

class Panel extends Component {

  renderChildren() {

    const { splitDirection, children } = this.props

    const childrenArray = Children.toArray(children)

    return childrenArray.map((child, i) => {

      if (!child.props) return child

      if (child.props.resizable) {

        const props = { }

        props.direction = splitDirection

        if (children[i - 1] && children[i - 1].props.resizable) {
          // props.resizable = false
          // props.style = { ...child.props.style, flex : 1 }
        }
        else if (i === childrenArray.length - 1) props.resizerPos = "before"

        return React.cloneElement(child, props)

      }
      /* else if (i < childrenArray.length - 1) {

        const cssProp = "margin" + (splitDirection === "row" ? "Right" : "Bottom")
        const style = { ...child.props.style, [cssProp] : 5 }

        return React.cloneElement(child, { style })
      } */
      else return child

    })

  }

  render() {

    const {
      stretchable,
      resizable,
      direction,
      splitDirection,
      children,
      style,
      size,
      initialSize,
      ...rest
    } = this.props

    const splitted = Children.count(children) > 1

    let fullStyle = { ...style }

    if (stretchable) fullStyle.flex = 1

    if (splitted) {

      fullStyle = {
        ...fullStyle,
        display : "flex",
        alignItems : "stretch",
        flexDirection : splitDirection
      }

    }

    if (resizable) {
      return (
        <Resizable
          { ...rest }
          style={ fullStyle }
          direction={ direction }
          size={ size }
          initialSize={ initialSize }
        >
          { this.renderChildren() }
        </Resizable>
      )
    }
    else {

      delete rest.minSize
      delete rest.maxSize
      delete rest.resizerPos
      delete rest.resizerSize
      delete rest.resizerStyle
      delete rest.resizerRenderer
      delete rest.onDrag
      delete rest.onDragStart
      delete rest.onDragEnd

      if (initialSize || size) {
        const dimProp = (direction === "column") ? "height" : "width"
        fullStyle[dimProp] = initialSize || size
      }

      return (
        <div { ...rest } style={ fullStyle }>
          { this.renderChildren() }
        </div>
      )

    }

  }

}

Panel.propTypes = {
  stretchable : PropTypes.bool,
  resizable : PropTypes.bool,
  direction : PropTypes.oneOf(["row", "column"]),
  splitDirection : PropTypes.oneOf(["row", "column"]),
  minSize : PropTypes.number,
  maxSize : PropTypes.number,

  resizerSize : PropTypes.number, // customize size
  resizerStyle : PropTypes.object, // customize style
  resizerRenderer : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]), // rewrite renderer

  size : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  initialSize : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  onDrag : PropTypes.func,
  onDragStart : PropTypes.func,
  onDragEnd : PropTypes.func,

  children : PropTypes.node,
  style : PropTypes.object
}

Panel.defaultProps = {}

export default Panel
