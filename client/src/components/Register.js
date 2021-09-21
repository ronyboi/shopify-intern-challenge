import React, { Fragment, useState } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "./subcomponent/Register";
import Images from "./Images";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    password2: "",
  });

  const { name, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("The passwords are not a match!");
    } else {
      register({ name, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Fragment>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              name="name"
              onChange={(e) => onChange(e)}
            />
            {/* <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              //required
            /> */}
          </div>
          <div className="form-group">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              name="password"
              onChange={(e) => onChange(e)}
            />
            {/* <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              //minLength="6"
            /> */}
          </div>
          <div className="form-group">
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={password2}
              name="password2"
              onChange={(e) => onChange(e)}
            />
            {/* <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={(e) => onChange(e)}
              //minLength="6"
            /> */}
          </div>
          <Button type="submit" value="Register" variant="contained">
            Register
          </Button>
        </form>
      </Fragment>
      <Images />
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
