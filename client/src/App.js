import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import DashboardSponsor from './components/dashboard/DashboardSponsor';
import DashboardProfessor from './components/dashboard/DashboardProfessor';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProject from './components/creat-project/CreateProject';
import EditProject from './components/edit-project/EditProject';
import ProjectDetail from './components/projects/ProjectDetail';
import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path = "/sponsor" component={ DashboardSponsor } />
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/professor" component={ DashboardProfessor } />
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/upload" component={ CreateProject } />
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/edit-project/:id" component={ EditProject } />
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/professor/:id" component={ ProjectDetail } />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;