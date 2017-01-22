import React, { PropTypes, Component } from "react"
import Resizer from "./Resizer"

class Panel extends Component {

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

    const dim = this.node.getBoundingClientRect()

    this.setState({
      width : dim.width,
      height : dim.height
    })

  }


  render() {

    const { vertical, style, ...rest } = this.props
    const { width, height } = this.state

    let fullStyle = style

    if (width !== null && height !== null) fullStyle = { ...style, width, height }

    return (
      <div>
        <div { ...rest } style={ fullStyle } ref={ node => this.node = node }/>
        <Resizer vertical={ vertical } onDragStart={ this.handleDragStart } onDrag={ this.handleDrag }/>
      </div>
    )

  }
}

Panel.propTypes = {
  vertical : PropTypes.bool,
  style : PropTypes.object
}

export default Panel
