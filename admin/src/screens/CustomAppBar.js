import React from 'react'
import "./appbar.css"
import { AppBar } from 'react-admin'
import instalros from  "../images/logo-instalros-1.png"

const CustomAppBar = (props) => {
  console.log(props,"que llega para la appbar")
  return (
        <AppBar {...props} style={{ background: "lightblue"}}>
            <img src={instalros} className="logo-img" />
        </AppBar>
  )
}

export default CustomAppBar