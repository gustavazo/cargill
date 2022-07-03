import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import UserService from "../services/UserService";
import "./loginA.css";
import logo from "../logo.png";
import LockIcon from '@mui/icons-material/Lock';

const LoginA = ({ setCurrentUser }) => {
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [focus, setFocus] = useState(false);

  const handleFocus = (e) => {
    setFocus(true);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault()
    const res = UserService.login({
      username: user.name,
      password: user.password
    })
      .then(async (res) => {
        localStorage.setItem("token", JSON.stringify(res.data.id))
        const user = await UserService.findById(res.data.userId);
        if (user.data.type === "0") {
          window.alert("No tienes permisos para ingresar")
        } else {
          localStorage.setItem('userType', user.data.type)
          setCurrentUser(user.data);
        }
      }
      )
      .catch((error) => {
        console.log(454, error)
        setError(true)
      });
  }

  return (
    <div className="background-page">
      <form onSubmit={login} className="form-login">
      <img src={logo} width="150" height={150}></img>
        {
          error && (
            <span className="credentialerror">Credenciales incorrectas, intente de nuevo</span>
          )
        }
        <input
          placeholder="DNI/LEGAJO"
          margin="normal"
          variant="outlined"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="form-texto"
          required
          onBlur={handleFocus}
          focused={focus.toString()}
        />
        <span className="errormessage">Este campo es requerido</span>
        <input
          placeholder="Password"
          type={"password"}
          margin="normal"
          variant="outlined"
          name="password"
          value={user.password}
          onChange={handleChange}
          className="form-texto"
          required
          onBlur={handleFocus}
          focused={focus.toString()}
        />
        <span className="errormessage" style={{ marginBottom: "10px" }}>Este campo es requerido</span>
        <button
          variant="contained"
          className="form-button"
        >ACCEDER</button>
      </form>
    </div>
  );
};

export default LoginA;
