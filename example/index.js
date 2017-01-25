import React from "react"
import { render } from "react-dom"
import Panel from "../src/Panel"

render(
  <div>
    <Panel style={ { width : 500, height : 500, backgroundColor : "pink" } }/>
    <Panel vertical style={ { width : 500, height : 500, backgroundColor : "yellow" } }/>
  </div>,
  document.getElementById("content")
)
