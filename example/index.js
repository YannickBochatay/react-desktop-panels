import React from "react"
import PropTypes from "prop-types"
import { render } from "react-dom"
import Panel from "../src/Panel"

const content = "Hello world"

const panelStyle = { padding : 10, border : "1px solid #ddd" }

const CustomResizer = ({ ...props }) => {

  delete props.size
  delete props.direction

  return (
    <div style={ { display : "flex", justifyContent : "center" } }>
      <div
        style={ {
          width : 20,
          height : 10,
          cursor : "row-resize",
          backgroundColor : "red"
        } }
        { ...props }
      />
    </div>
  )
}

CustomResizer.propTypes = {
  direction : PropTypes.oneOf(["row", "column"]),
  size : PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

class Example extends React.Component {

  constructor(props) {

    super(props)

    this.handleChangeWidth = this.handleChangeWidth.bind(this)
    this.handleChangeHeight = this.handleChangeHeight.bind(this)

    this.state = {
      width : "20%",
      height : "50%"
    }
  }

  handleChangeWidth(width) {
    this.setState({ width })
  }

  handleChangeHeight(height) {
    this.setState({ height })
  }

  render() {

    return (
      <Panel style={ { width : "100vw", height : "100vh", padding : 5 } }>

        <Panel
          resizable
          size={ this.state.width }
          onDrag={ this.handleChangeWidth }
          minSize={ 100 }
          maxSize={ 700 }
          resizerSize={ 5 }
          resizerStyle={ {
            backgroundImage : `repeating-linear-gradient(
              -25deg, #fff, #fff 20px, #df5646 20px, #df5646 40px, #fff 40px, #fff 60px, #1c78a4 60px, #1c78a4 80px
            )`
          } }
          splitDirection="column"
        >
          <Panel
            resizable
            style={ panelStyle }
            initialSize="33%"
            resizerRenderer={ CustomResizer }
          >
            { content }
          </Panel>
          <Panel stretchable style={ panelStyle }>
            { content }
          </Panel>
        </Panel>

        <Panel stretchable splitDirection="column">
          <Panel
            resizable
            style={ panelStyle }
            size={ this.state.height }
            onDrag={ this.handleChangeHeight }
          >
            { content }
          </Panel>
          <Panel stretchable style={ panelStyle }>
            { content }
          </Panel>
        </Panel>

      </Panel>
    )
  }
}

render(<Example/>, document.getElementById("content"))
