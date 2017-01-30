import React from "react"
import { render } from "react-dom"
import Panel from "../src/Panel"

const content = "Hello world"

const panelStyle = { padding : 10, border : "1px solid #ddd" }

render(

  <Panel splittable style={ { width : "100vw", height : "100vh", padding : 5 } }>

    <Panel resizable defaultSize="20%" style={ panelStyle }>
      { content }
    </Panel>

    <Panel splittable stretchable direction="column">
      <Panel resizable direction="column" style={ panelStyle }>
        { content }
      </Panel>
      <Panel splittable stretchable>
        <Panel resizable style={ panelStyle }>
          { content }
        </Panel>
        <Panel stretchable style={ panelStyle }>
          { content }
        </Panel>
      </Panel>
    </Panel>

    <Panel resizable resizerPos="before" defaultSize="20%" style={ panelStyle }>
      { content }
    </Panel>

  </Panel>,

  document.getElementById("content")
)
