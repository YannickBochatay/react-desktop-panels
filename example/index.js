import React from "react"
import { render } from "react-dom"
import Split from "../src/Split"
import Panels from "../src/Panels"

const style = { margin : 5 }

render(
  <Split style={ { width : "100vw", height : "100vh" } }>
    <Panels style={ style }>
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
    <Split vertical>
      <Panels style={ style }>
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
      <Split vertical>
        <Panels style={ style }>
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
        <Split>
          <Panels style={ style }>
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
          <Panels style={ style }>
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
        </Split>
      </Split>
    </Split>
  </Split>,
  document.getElementById("content")
)
