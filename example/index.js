import React from "react"
import { render } from "react-dom"
import Panel from "../src/Panel"

const content = "Hello world"

const panelStyle = { padding : 10, border : "1px solid #ddd" }

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

  handleChangeWidth(dim) {
    this.setState({ width : dim.width })
  }

  handleChangeHeight(dim) {
    this.setState({ height : dim.height })
  }

  render() {

    return (
      <Panel style={ { width : "100vw", height : "100vh", padding : 5 } }>

        <Panel
          resizable
          width={ this.state.width }
          onDrag={ this.handleChangeWidth }
          style={ panelStyle }
        >
          { content }
        </Panel>

        <Panel stretchable splitDirection="column">
          <Panel
            resizable
            style={ panelStyle }
            height={ this.state.height }
            onDrag={ this.handleChangeHeight }
          >
            { content }
          </Panel>
          <Panel stretchable>
            <Panel resizable style={ panelStyle }>
              { content }
            </Panel>
            <Panel stretchable style={ panelStyle }>
              { content }
            </Panel>
          </Panel>
        </Panel>

        <Panel resizable defaultSize="20%" style={ panelStyle }>
          { content }
        </Panel>

      </Panel>
    )
  }
}

render(<Example/>, document.getElementById("content"))
