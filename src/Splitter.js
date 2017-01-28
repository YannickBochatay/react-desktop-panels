import React, { PropTypes } from "react"

const defaultStyle = {
  display : "flex",
  alignItems : "stretch"
}

const Splitter = ({ style, orientation, children, ...rest }) => (
  <div { ...rest } style={ {
    ...style,
    ...defaultStyle,
    flexDirection : (orientation === "vertical" ? "row" : "column") }
  }
  >
    { children }
  </div>
)

Splitter.propTypes = {
  style : PropTypes.object,
  children : PropTypes.node,
  orientation : PropTypes.oneOf(["vertical", "horizontal"])
}

Splitter.defaultProps = {
  orientation : "vertical"
}

export default Splitter
