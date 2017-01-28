import React, { PropTypes } from "react"

const Splitter = ({ style, direction, children, ...rest }) => (
  <div { ...rest } style={ {
    ...style,
    display : "flex",
    alignItems : "stretch",
    flexDirection : direction }
  }
  >
    { children }
  </div>
)

Splitter.propTypes = {
  style : PropTypes.object,
  children : PropTypes.node,
  direction : PropTypes.oneOf(["row", "column"])
}

Splitter.defaultProps = {
  direction : "row"
}

export default Splitter
