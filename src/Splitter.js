import React, { PropTypes, Component } from "react"
import ReactDOM from "react-dom"
import Resizer from "./Resizer"

class Splitter extends Component {

  constructor(props) {

    super(props)

    this.handleResize = this.handleResize.bind(this)
    this.setDimInit = this.setDimInit.bind(this)

    this.state = {
      width : null,
      height : null
    }

    this.xClick = null
    this.yClick = null
    this.widthInit = null
    this.heightInit = null
    this.winWidth = null
    this.winHeight = null

  }

  getAndSetDim(callback) {

    let { node } = this

    if (!node.getBoundingClientRect) node = ReactDOM.findDOMNode(node)

    const dim = node.getBoundingClientRect()

    this.setState({
      width : dim.width,
      height : dim.height
    }, callback)

  }

  handleDragStart(e) {

    this.xClick = e.pageX
    this.yClick = e.pageY

    this.getAndSetDim(this.setDimInit)

  }

  handleDrag(e) {

    const { vertical } = this.props

    if (vertical) this.setState({ width : this.widthInit + e.pageX - this.xClick })
    else this.setState({ height : this.heightInit + e.pageY - this.yClick })

  }

  setDimInit() {

    this.widthInit = this.state.width
    this.heightInit = this.state.height

  }

  setWinDim() {

    this.winWidth = window.innerWidth
    this.winHeight = window.innerHeight

  }

  hasResizer(childrenProps) {

    if (!childrenProps) childrenProps = this.props.children

    const children = React.Children.toArray(childrenProps)

    return children[1] && children[1].type === Resizer

  }

  handleResize() {

    const { vertical } = this.props
    const { width, height } = this.state

    if (!this.winWidth) this.setWinDim()

    if (width === null || height === null) {
      this.getAndSetDim(this.setDimInit)
      return
    }

    if (vertical) this.setState({ width : Math.round(width * window.innerWidth / this.winWidth) })
    else this.setState({ height : Math.round(height * window.innerHeight / this.winHeight) })

    this.setWinDim()

  }

  attachResizeListener() {

    window.addEventListener("resize", this.handleResize)

  }

  detachResizeListener() {

    window.removeEventListener("resize", this.handleResize)

  }

  componentWillUpdate(nextProps) {

    const hadResizer = this.hasResizer(this.props.children)
    const hasResizer = this.hasResizer(nextProps.children)

    if (hadResizer && !hasResizer) {
      this.detachResizeListener()
      this.setState({ width : null, height : null })
    }
    else if (!hadResizer && hasResizer) this.attachResizeListener()

  }

  componentDidMount() {

    if (this.resizer) this.attachResizeListener()

  }

  componentWillUnmount() {

    this.detachResizeListener()

  }

  renderFirstDiv(elmt) {

    const { width, height } = this.state
    const { vertical } = this.props

    const style = { ...elmt.props.style }

    if (width === null && height === null) style.flex = 1
    else if (vertical) style.width = width
    else style.height = height

    return React.cloneElement(elmt, {
      ref : node => this.node = node,
      key : "firstDiv",
      style
    })

  }

  renderSecondDiv(elmt) {

    return React.cloneElement(elmt, {
      style : { ...elmt.props.style, flex : 1 },
      key : "secondDiv"
    })

  }

  renderResizer(resizer) {

    if (resizer.type !== Resizer) throw new TypeError("argument should be a Resizer element")

    return React.cloneElement(resizer, {

      vertical : this.props.vertical,

      onDragStart : e => {
        this.handleDragStart(e)
        if (resizer.props.onDragStart) resizer.props.onDragStart(e)
      },

      onDrag : e => {
        this.handleDrag(e)
        if (resizer.props.onDrag) resizer.props.onDrag(e)
      },

      key : "resizer",

      ref : elmt => this.resizer = elmt

    })

  }

  renderChildren() {

    const children = React.Children.toArray(this.props.children)

    if (children.length !== 2 && children.length !== 3) throw new Error("you should have 2 or 3 elements as children")

    if (children.length === 3) {

      return [
        this.renderFirstDiv(children[0]),
        this.renderResizer(children[1]),
        this.renderSecondDiv(children[2])
      ]

    } else {

      return [
        this.renderFirstDiv(children[0]),
        this.renderSecondDiv(children[1])
      ]
    }


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

Splitter.propTypes = {
  vertical : PropTypes.bool,
  style : PropTypes.object,
  children : PropTypes.node
}

export default Splitter
