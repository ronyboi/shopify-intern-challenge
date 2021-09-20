import axios from "axios";
import React, { useState } from "react";
import setAuthToken from "../utils/setAuthToken";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../components/subcomponent/Login";
import { Redirect } from "react-router";
import Images from "./Images";

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
      <form onSubmit={(e) => handleClick(e)}>
        <label>
          Name:
          <input
            type="string"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => onChange(e)}
          />
        </label>
        <br />
        <input type="submit" value="Login" />
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
