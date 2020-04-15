import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
//import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import AddTenant from "./components/Tenant/AddTenant";
import AddProduct from "./components/Product/AddProduct";
import AddAutomat from "./components/Automat/AddAutomat";
import UpdateTenant from "./components/Tenant/UpdateTenant";
import UpdateProduct from "./components/Product/UpdateProduct";
import UpdateAutomat from "./components/Automat/UpdateAutomat";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER, GET_ERRORS } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecuredRoute";
import AutomatBoard from "./components/AutomatBoard/AutomatBoard";
import AddProductToAutomat from "./components/AutomatBoard/ProductToAutomats/AddProductToAutomat";

//every time I load other path I again set token
const jwtToken = localStorage.jwtToken;
if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  //logout after time
  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

//definiowanie store uzywanego w aplikacji

class App extends Component {
  //exact - ignoruje sciezki niepelne
  //class is a keyword in javascript and JSX is an extension of javascript.
  //That's the principal reason why React uses className instead of class.
  //path pokrywa się z tym od aplikacji serwera
  render() {
    return (
      //Provider definuje sposób w jaki store jest rozumiany przez reacta i reduxa
      //Provider przyjmuje atrybut prop: store
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />

            {
              //Public Routes
            }

            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {
              //Private Routes
            }
            <Switch>
              <SecuredRoute exact path="/dashboard" component={Dashboard} />
              <SecuredRoute exact path="/addProject" component={AddProject} />
              <SecuredRoute
                exact
                path="/updateProject/:id"
                component={UpdateProject}
              />
              <SecuredRoute
                exact
                path="/projectBoard/:id"
                component={ProjectBoard}
              />
              <SecuredRoute
                exact
                path="/addProjectTask/:id"
                component={AddProjectTask}
              />

              <SecuredRoute
                exact
                path="/updateProjectTask/:id"
                component={UpdateProjectTask}
              />


              <SecuredRoute
                exact
                path="/updateAutomat/:id"
                component={UpdateAutomat}
              />
              <SecuredRoute exact path="/addAutomat" component={AddAutomat} />

              <SecuredRoute
                exact
                path="/updateProduct/:id"
                component={UpdateProduct}
              />
              <SecuredRoute exact path="/addProduct" component={AddProduct} />
              <SecuredRoute
                exact
                path="/automatBoard/:id/"
                component={AutomatBoard}
              />

              <SecuredRoute
                exact
                path="/addProductToAutomat/:id/"
                component={AddProductToAutomat}
              />


              <SecuredRoute
                exact
                path="/updateTenant/:id"
                component={UpdateTenant}
              />
              <SecuredRoute exact path="/addTenant" component={AddTenant} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
