import React, { PropTypes, Component, Children } from "react"
import Resizable from "./Resizable"

class Panel extends Component {

  renderChildren() {

    const { direction, children } = this.props

    const childrenArray = Children.toArray(children)

    return childrenArray.map((child, i) => {

      if (!child.props) return child

      if (child.props.resizable) {

        const props = { }

        if (!child.props.direction) props.direction = direction

        if (children[i - 1] && children[i - 1].props.resizable) {
          // props.resizable = false
          // props.style = { ...child.props.style, flex : 1 }
        }
        else if (i === childrenArray.length - 1) props.resizerPos = "before"

        return React.cloneElement(child, props)

      }
      /* else if (i < childrenArray.length - 1) {

        const cssProp = "margin" + (direction === "row" ? "Right" : "Bottom")
        const style = { ...child.props.style, [cssProp] : 5 }

        return React.cloneElement(child, { style })
      } */
      else return child

    })

  }

  render() {

    const { stretchable, resizable, direction, children, style, defaultSize, ...rest } = this.props
    const childrenArray = Children.toArray(children)

    const splitted = childrenArray.some(child => child.type === Panel)

    let fullStyle = { ...style }

    if (stretchable) fullStyle.flex = 1

    if (splitted) {

      fullStyle = {
        ...fullStyle,
        display : "flex",
        alignItems : "stretch",
        flexDirection : direction
      }

    }

    if (resizable) {
      return (
        <Resizable { ...rest } style={ fullStyle } direction={ direction }>
          { this.renderChildren() }
        </Resizable>
      )
    }
    else {

      if (defaultSize) {
        const dimProp = (direction === "column") ? "height" : "width"
        fullStyle[dimProp] = defaultSize
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
  children : PropTypes.node,
  style : PropTypes.object,
  defaultSize : PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Panel.defaultProps = {}

export default Panel
