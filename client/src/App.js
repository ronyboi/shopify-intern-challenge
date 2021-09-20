import logo from "./logo.svg";
import "./App.css";

import { useEffect, Fragment } from "react";
import { connect, Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import Upload from "./components/Upload";
import Login from "./components/Login";
import store from "./store";

import PrivateRoute from "./components/routing/PrivateRoute";

import { loadUser } from "./components/subcomponent/Login";

import setAuthToken from "./utils/setAuthToken";

import Register from "./components/Register";
import Navbar from "./components/Navbar";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className="App">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/images" component={Upload} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

// App.contextType = CloudinaryContext.contextType;

// App.propTypes = {
//   photos: PropTypes.array,
//   onPhotosUploaded: PropTypes.func,
// };

// const PhotoListContainer = connect((state) => ({ photos: state.photos }), {
//   onPhotosUploaded: photosUploaded,
// })(App);

export default App;
