import React, { PropTypes } from "react"
import Resizable from "./Resizable"

const Panel = ({ stretchable, resizable, splittable, direction, children, style, ...rest }) => {

  let fullStyle = { ...style }

  if (stretchable) fullStyle.flex = 1

  if (splittable) {

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
        { children }
      </Resizable>
    )
  }
  else {

    return (
      <div { ...rest } style={ fullStyle }>
        { children }
      </div>
    )

  }

}

Panel.propTypes = {
  stretchable : PropTypes.bool,
  resizable : PropTypes.bool,
  splittable : PropTypes.bool,
  direction : PropTypes.oneOf(["row", "column"]),
  children : PropTypes.node,
  style : PropTypes.object
}

export default Panel
