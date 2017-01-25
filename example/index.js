import React from "react"
import { render } from "react-dom"
import Split from "../src/Split"

render(
  <Split style={ { width : "100%", height : 500, backgroundColor : "#eee" } }>
    <div>Hello world</div>
    <Split vertical>
      <div>Hello Yannick</div>
      <div>Hello again</div>
    </Split>
  </Split>,
  document.getElementById("content")
)
