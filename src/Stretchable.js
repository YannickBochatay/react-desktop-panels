import React, { PropTypes, Children } from "react"

const Stretchable = ({ style, children, ...rest }) => (
  <div { ...rest } style={ { ...style, flex : 1 } }>
    { Children.map(children, child => (
        React.cloneElement(child, {
          style : { height : "100%", ...child.props.style }
        })
      ))
    }
  </div>
)

Stretchable.propTypes = {
  style : PropTypes.object,
  children : PropTypes.node
}

export default Stretchable
