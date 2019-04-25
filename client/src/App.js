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
import AdminSignUp from './components/auth/Signup-Admin';
import Login from './components/auth/Login';
import LoginAdmin from './components/auth/Login-Admin';
import Forgot from './components/auth/Forgot';
import Reset from './components/auth/Reset';
import DashboardSponsor from './components/dashboard/DashboardSponsor';
import DashboardProfessor from './components/dashboard/DashboardProfessor';
import DashboardAdmin from './components/dashboard/DashboardAdmin';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProject from './components/creat-project/CreateProject';
import TeamAssignment from './components/team-assignment/Team-Assignment';
import TeamView from './components/team-assignment/TeamView';
import EditProject from './components/edit-project/EditProject';
import ProjectDetail from './components/projects/ProjectDetail';
import AccountDetail from './accounts/accountDetail';
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
              <Route exact path="/adminsignUp" component={AdminSignUp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/login-admin" component={LoginAdmin} />
              <Route exact path="/forgot" component={Forgot} />
              <Route exact path="/reset/:token" component={Reset} />
              <Switch>
                <PrivateRoute exact path = "/sponsor" component={ DashboardSponsor } />
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/professor" component={ DashboardProfessor } />
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/admin" component={ DashboardAdmin } />
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/upload" component={ CreateProject } />
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/teams" component={ TeamAssignment } />
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/teams-view" component={ TeamView } />
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/edit-project/:id" component={ EditProject } />
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/professor/:id" component={ ProjectDetail } />
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/admin/:id" component={ AccountDetail } />
              </Switch>
              
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
