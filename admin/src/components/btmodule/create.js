// input de name
// input de mac address
// select de areas
// tenes que traer las areas del backend y que esas sean las opciones para seleccionar
// el valor del select deberia ser el id del area


{/* <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Area</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={areaId}
    label="Age"
    onChange={handleChangeArea}
  >
    {
        areas.map(a => (
            <MenuItem value={a.id}>{a.name}</MenuItem>
        ))
    }
  </Select>
</FormControl> */}
import { Box, Button, MenuItem, Select, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNotify } from "react-admin";
import AreaService from '../../services/AreaService'
import BTModuleService from '../../services/BTModuleService'

const create = (props) => {
  const notify = useNotify();
  const [BTmod, setBTmod] = useState({
    name: '',
    adress: '',
    id: 0
  })

  const [areas, setAreas] = useState([])

  useEffect(() => {
    getAreas()
  }, [])

  const getAreas = async () => {
    const res = await AreaService.find({})
    setAreas(res.data)
  }

  const handleChange = (e) => {
    setBTmod({
      ...BTmod,
      [e.target.name]: e.target.value
    }) 
  }

  const postModule = async () => {
    const res = await BTModuleService.create({
      name: BTmod.name,
      macAddress: BTmod.adress,
      areaId: BTmod.id
    })
    notify("Creado");
    window.location.href = "/btmodules";
  }

  return (
    <div>
      <h1 style={{marginLeft: 15 }}>Crear módulo bluetooth</h1>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          flexDirection: "column"
        }}
        noValidate
        autoComplete="off">
        <TextField
          label="Nombre"
          margin="normal"
          variant="filled"
          name='name'
          onChange={handleChange} />
        <TextField
          label="Direccion"
          margin="normal"
          name='adress'
          onChange={handleChange} />
        <Select
          margin='normal'
          value={BTmod.id}
          label="Area"
          onChange={handleChange}
          name='id'>
            {
              areas.length? areas.map(a => {
                return (
                  <MenuItem value={a.id}>{a.name}</MenuItem>
                )
              }) : null
            }
        </Select>
        <Button variant='contained' color='primary' onClick={postModule}>Enviar</Button>
      </Box>
    </div>
  )
}

export default create
