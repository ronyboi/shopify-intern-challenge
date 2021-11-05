import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../components/subcomponent/Login";
import { Redirect } from "react-router";
import Images from "./Images";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const { name, password } = formData;

  const onChange = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("hi");
    login(name, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/images" />;
  }
  return (
    <div>
      <form onSubmit={(e) => handleClick(e)} className="form-login">
        <label>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            name="name"
            onChange={(e) => onChange(e)}
          />
        </label>
        <br />
        <label>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            name="password"
            onChange={(e) => onChange(e)}
          />
        </label>
        <br />
        <Button variant="contained" type="submit" value="Login">
          Login
        </Button>
      </form>
      <Images />
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
