import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
//import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
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
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addProject" component={AddProject} />
                              {/* z parametrem */}
            <Route exact path="/updateProject/:id" component={UpdateProject} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
