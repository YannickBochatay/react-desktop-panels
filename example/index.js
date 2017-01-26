import React from "react"
import { render } from "react-dom"
import Split from "../src/Split"
import Panels from "../src/Panels"

class PanelExample extends React.Component {

  render() {

    const { style, ...rest } = this.props

    return (
      <Panels { ...rest } style={ { margin : 5, ...style } }>
        <div label="panel 1">
          This is the content of panel 1
        </div>
        <div label="panel 2">
          And now this is the content of panel 2
        </div>
        <div label="panel 3">
          Look, this is the content of panel 3
        </div>
      </Panels>
    )

  }
}

render(
  <Split style={ { width : "100vw", height : "100vh" } }>
    <PanelExample/>
    <Split vertical>
      <PanelExample/>
      <Split vertical>
        <PanelExample/>
        <Split>
          <PanelExample/>
          <PanelExample/>
        </Split>
      </Split>
    </Split>
  </Split>,
  document.getElementById("content")
)
