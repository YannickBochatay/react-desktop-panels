import React from "react"
import { render } from "react-dom"
import Resizable from "../src/Resizable"
import Stretchable from "../src/Stretchable"
import Splitter from "../src/Splitter"

const PanelExample = ({ style, ...rest }) => (
  <div { ...rest } style={ { padding : 15, border : "1px solid gray", ...style } }>Hello world</div>
)

render(

  <Splitter style={ { width : "100vw", height : "100vh", padding : 5 } }>

    <Resizable style={ { width : "20%" } }>
      <PanelExample/>
    </Resizable>

    <Resizable>
      <Splitter orientation="horizontal">
        <Resizable orientation="horizontal">
          <PanelExample/>
        </Resizable>
        <Stretchable>
          <PanelExample/>
        </Stretchable>
      </Splitter>
    </Resizable>

    <Stretchable>
      <Splitter orientation="horizontal">
        <Resizable orientation="horizontal" style={ { height : "60%" } }>
          <PanelExample/>
        </Resizable>
        <Stretchable>
          <Splitter>
            <Resizable>
              <PanelExample/>
            </Resizable>
            <Stretchable>
              <Splitter orientation="horizontal">
                <Resizable orientation="horizontal">
                  <PanelExample/>
                </Resizable>
                <Stretchable>
                  <PanelExample/>
                </Stretchable>
              </Splitter>
            </Stretchable>
          </Splitter>
        </Stretchable>
      </Splitter>
    </Stretchable>

    <Resizable resizerPos="before" style={ { width : "20%" } }>
      <PanelExample/>
    </Resizable>

  </Splitter>,

  document.getElementById("content")
)
