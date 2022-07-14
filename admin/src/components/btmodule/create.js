// input de name
// input de mac address
// select de areas
// tenes que traer las areas del backend y que esas sean las opciones para seleccionar
// el valor del select deberia ser el id del area

{
  /* <FormControl fullWidth>
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
</FormControl> */
}
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useNotify } from "react-admin";
import AreaService from "../../services/AreaService";
import BTModuleService from "../../services/BTModuleService";

const create = (props) => {
  console.log("PROPS", props);
  const [errors, setErrors] = useState({});
  const notify = useNotify();
  const [BTmod, setBTmod] = useState({
    name: props.record.name || "",
    macAddress: props.record.macAddress || "",
    areaId: props.record.areaId || 0,
  });
  const [areas, setAreas] = useState([]);


  useEffect(() => {
    getAreas();
  }, []);

  const getAreas = async () => {
    const res = await AreaService.find({});
    setAreas(res.data);
  };

  function fieldsHasErrors() {
    let errs = {}
    var fieldsHasErrs = false;
    for (const key in BTmod) {
      if (Object.hasOwnProperty.call(BTmod, key)) {
        const element = BTmod[key];
        const error = fieldGetError({ name: key, value: element })
        errs = { ...errs, ...error }
        fieldsHasErrs |= error[key].value
      }
    } {
    }
    setErrors(errs);
    return fieldsHasErrs
  }


  //Devuelve un objeto con el nombre del campo indicando si tiene error y el mensaje
  function fieldGetError(element) {
    const error = {
      value: false,
      msg: ''
    }
    switch (element.name) {
      case 'macAddress':
        error.value = !(/^([a-fA-F0-9]{2}:){5}[a-fA-F0-9]{2}$/.test(element.value))
        error.msg = 'Debe ser una dirección BT válida'
        break;
      case 'name':
        error.value = !(element.value.length);
        error.msg = 'Este campo es requerido'
        break;
      case 'areaId':
        error.value = !element.value;
        error.msg = 'Este campo es requerido'
        break;
      default:
        break;
    }
    return { [element.name]: { ...error } }
  }

  function handleFieldError(target) {
    console.log('errors', errors)
    const error = fieldGetError(target)
    setErrors({ ...errors, ...error })

  }

  const handleChange = (e) => {
    const target = e.target
    handleFieldError(target);
    setBTmod({
      ...BTmod,
      [target.name]: target.value,
    });
  };

  const postModule = async () => {
    if (!fieldsHasErrors()) {
      const res = props.record.id
        ? await BTModuleService.update(props.record.id, {
          name: BTmod.name,
          macAddress: BTmod.macAddress.toUpperCase(),
          areaId: BTmod.areaId,
        })
        : await BTModuleService.create({
          name: BTmod.name,
          macAddress: BTmod.macAddress.toUpperCase(),
          areaId: BTmod.areaId,
        });
      notify("Creado");
      window.location.href = "/#/BTModules";
    }
  };

  return (
    <div>
      <h1 style={{ marginLeft: 15 }}>{!props.record.id ? "Crear módulo bluetooth" : "Editar módulo bluetooth"}</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Nombre"
          margin="normal"
          variant="filled"
          name="name"
          value={BTmod.name}
          onChange={handleChange}
          error={errors.name?.value}
          helperText={errors.name?.value ? errors.name?.msg : ""}
        />

        <TextField
          label="Direccion"
          margin="normal"
          value={BTmod.macAddress}
          name="macAddress"
          onChange={handleChange}
          error={errors.macAddress?.value}
          helperText={errors.macAddress?.value ? errors.macAddress?.msg : ""}
        />
        <Select
          margin="normal"
          value={BTmod.areaId}
          label="Area"
          onChange={handleChange}
          name="areaId"
          error={errors.areaId?.value}
          helperText={errors.areaId?.value ? errors.areaId?.msg : ""}
        >
          {areas.length
            ? areas.map((a) => {
              return <MenuItem value={a.id}>{a.name}</MenuItem>;
            })
            : null}
        </Select>
        <Button variant="contained" color="primary" onClick={postModule}>
          Enviar
        </Button>
      </Box>
    </div>
  );
};

export default create;
