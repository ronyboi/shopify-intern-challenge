import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { logout } from "./subcomponent/Login";

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Rohan's Image Repo
            </Typography>
            {isAuthenticated ? (
              <div className="toolbar-right">
                <div>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {user != null && <div>{user.name}</div>}
                  </Typography>
                </div>
                <div>
                  <Button onClick={logout} color="inherit" href="/">
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="toolbar-right">
                <div>
                  <Button color="inherit" href="/">
                    Login
                  </Button>
                  <Button color="inherit" href="/register">
                    Register
                  </Button>
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
