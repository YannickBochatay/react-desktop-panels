import React from "react"
import { render } from "react-dom"
import Split from "../src/Split"
import Panel from "react-bootstrap/lib/Panel"

const style = { margin : 5 }

render(
  <Split style={ { width : "100vw", height : "100vh" } }>
    <Panel header="Panel example" style={ style }>
      Panel content
    </Panel>
    <Split vertical>
      <Panel header="Panel example" style={ style }>
        Panel content
      </Panel>
      <Split vertical>
        <Panel header="Panel example" style={ style }>
          Panel content
        </Panel>
        <Split>
          <Panel header="Panel example" style={ style }>
            Panel content
          </Panel>
          <Panel header="Panel example" style={ style }>
            Panel content
          </Panel>
        </Split>
      </Split>
    </Split>
  </Split>,
  document.getElementById("content")
)
