import React, { PropTypes, Component } from "react"
import ReactDOM from "react-dom"
import Resizer from "./Resizer"

class Split extends Component {

  constructor(props) {

    super(props)

    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDrag = this.handleDrag.bind(this)

    this.state = {
      width : null,
      height : null
    }

    this.xClick = null
    this.yClick = null
    this.widthInit = null
    this.heightInit = null

  }

  handleDragStart(e) {

    this.xClick = e.pageX
    this.yClick = e.pageY

    this.widthInit = this.state.width
    this.heightInit = this.state.height

  }

  handleDrag(e) {

    const { vertical } = this.props

    if (vertical) this.setState({ width : this.widthInit + e.pageX - this.xClick })
    else this.setState({ height : this.heightInit + e.pageY - this.yClick })

  }

  componentDidMount() {

    let { node } = this

    if (!node.getBoundingClientRect) node = ReactDOM.findDOMNode(node)

    const dim = node.getBoundingClientRect()

    this.setState({
      width : dim.width,
      height : dim.height
    })

  }

  renderFirstDiv(elmt) {

    const { width, height } = this.state

    let dimStyle = null

    if (width === null && height === null) dimStyle = { flex : 1 }
    else if (this.props.vertical) dimStyle = { width }
    else dimStyle = { height }

    return React.cloneElement(elmt, {
      style : { ...elmt.props.style, ...dimStyle },
      ref : node => this.node = node,
      key : "firstDiv"
    })

  }

  renderSecondDiv(elmt) {

    return React.cloneElement(elmt, {
      style : { ...elmt.props.style, flex : 1 },
      key : "secondDiv"
    })

  }

  renderResizer() {

    return (
      <Resizer
        vertical={ this.props.vertical }
        onDragStart={ this.handleDragStart }
        onDrag={ this.handleDrag }
        key="resizer"
      />
    )

  }

  renderChildren() {

    const children = React.Children.toArray(this.props.children)

    if (children.length !== 2) throw new Error("you should have 2 elements as children")

    return [
      this.renderFirstDiv(children[0]),
      this.renderResizer(),
      this.renderSecondDiv(children[1])
    ]

  }


  render() {

    const { vertical, style, ...rest } = this.props

    const flexStyle = {
      display : "flex",
      alignItems : "stretch",
      flexDirection : vertical ? "row" : "column"
    }

    return (
      <div { ...rest } style={ { ...style, ...flexStyle } }>
        { this.renderChildren() }
      </div>
    )

  }
}

Split.propTypes = {
  vertical : PropTypes.bool,
  style : PropTypes.object,
  children : PropTypes.node
}

export default Split
