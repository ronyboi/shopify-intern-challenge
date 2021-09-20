import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Navbar = ({ auth: { isAuthenticated, user } }) => {
  //   const [auth, setAuth] = React.useState(true);
  //   const [anchorEl, setAnchorEl] = React.useState(null);

  //   const handleChange = (event) => {
  //     setAuth(event.target.checked);
  //   };

  //   const handleMenu = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   };

  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Rohan's Image Repo
            </Typography>
            {isAuthenticated && (
              <div>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {user.name}
                </Typography>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Navbar);
