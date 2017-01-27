import React from "react"
import { render } from "react-dom"
import Splitter from "../src/Splitter"
import Resizer from "../src/Resizer"
import Panels from "../src/Panels"
import Menubar from "react-desktop-menus/lib/Menubar"
import Menu from "react-desktop-menus/lib/Menu"
import Item from "react-desktop-menus/lib/MenuItem"

const action = () => console.log("action executed")

const MenubarExample = () => (
  <Menubar>
    <Menu label="File">
      <Item action={ action } label="Simple item"/>
      <Item action={ action } icon={ <i className="glyphicon glyphicon-road"/> } label="Item with icon"/>
      <Item action={ action } icon={ <img src="build/icon.svg"/> } label="Item with any kind of icon"/>
      <Item icon={ <i className="fa fa-bar-chart"/> } label="Submenu again">
        <Menu>
          <Item action={ action } label="Simple item"/>
          <Item action={ action } icon={ <i className="glyphicon glyphicon-road"/> } label="Item with icon"/>
          <Item action={ action } icon={ <img src="build/icon.svg"/> } label="Item with any kind of icon"/>
        </Menu>
      </Item>
    </Menu>
    <Menu label="Edit">
      <Item action={ action } label="Simple item"/>
      <Item action={ action } icon={ <i className="glyphicon glyphicon-road"/> } label="Item with icon"/>
      <Item action={ action } icon={ <img src="build/icon.svg"/> } label="Item with any kind of icon"/>
      <Item icon={ <i className="fa fa-bar-chart"/> } label="Submenu again">
        <Menu>
          <Item action={ action } label="Simple item"/>
          <Item action={ action } icon={ <i className="glyphicon glyphicon-road"/> } label="Item with icon"/>
          <Item action={ action } icon={ <img src="build/icon.svg"/> } label="Item with any kind of icon"/>
        </Menu>
      </Item>
    </Menu>
    <Menu label="View">
      <Item action={ action } label="Simple item"/>
      <Item action={ action } icon={ <i className="glyphicon glyphicon-road"/> } label="Item with icon"/>
      <Item action={ action } icon={ <img src="build/icon.svg"/> } label="Item with any kind of icon"/>
      <Item icon={ <i className="fa fa-bar-chart"/> } label="Submenu again">
        <Menu>
          <Item action={ action } label="Simple item"/>
          <Item action={ action } icon={ <i className="glyphicon glyphicon-road"/> } label="Item with icon"/>
          <Item action={ action } icon={ <img src="build/icon.svg"/> } label="Item with any kind of icon"/>
        </Menu>
      </Item>
    </Menu>
  </Menubar>
)

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
  <div style={ { width : "100vw", height : "100vh", display : "flex" } }>

    <Splitter style={ { width : 300 } }>
      <PanelExample/>
      <Resizer/>
      <PanelExample/>
    </Splitter>

    <div style={ { flex : 1, display : "flex", flexDirection : "column" } }>
      <MenubarExample/>
      <div style={ { flex : 1, backgroundColor : "#eee" } }/>
    </div>

    <Splitter style={ { width : 300 } }>
      <PanelExample/>
      <Resizer/>
      <PanelExample/>
    </Splitter>

  </div>,
  document.getElementById("content")
)
