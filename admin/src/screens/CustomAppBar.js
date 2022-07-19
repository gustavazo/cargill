import React from 'react'
import "./appbar.css"
import { AppBar } from 'react-admin'
import instalros from "../images/logo-instalros-400.png"
import Typography from '@mui/material/Typography';

const CustomAppBar = (props) => {
  console.log("que llega para la appbar", props)
  return (
    <AppBar {...props} color={'secondary'} userMenu={false} 
      sx={{
        "& .RaAppBar-title": {
          flex: 1,
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        },
      }}>
      <Typography
        sx={{ flex: 1 }}
        variant="h6"
        color="inherit"
        id='react-admin-title' />
      <img src={instalros} className="logo-img" />

    </AppBar>
  )
}

export default CustomAppBar