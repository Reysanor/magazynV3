import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
//import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
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
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecuredRoute";
import AutomatBoard from "./components/AutomatBoard/AutomatBoard";
import AddProductToAutomat from "./components/AutomatBoard/ProductToAutomats/AddProductToAutomat";
import UpdateProductToAutomat from "./components/AutomatBoard/ProductToAutomats/UpdateProductToAutomat";
import AddInsertedProduct from "./components/AutomatBoard/InsertedProduct/AddInsertedProduct";
import TenantBoard from "./components/Tenant/TenantBoard/TenantBoard";
import AutomatsList from "./components/Dashboard/AutomatsList";
import TenantsList from "./components/Dashboard/TenantsList";
import AddPurchasedProduct from "./components/Product/ProductBoard/AddPurchasedProduct";
import RemovePurchasedProduct from "./components/Product/ProductBoard/RemovePurchasedProduct";
import AddAutomatToTenant from "./components/Tenant/TenantBoard/AddAutomatToTenant";
import PurchasedProductBoard from "./components/Product/PurchasedProduct/PurchasedProductBoard";
import ListInsertedProducts from "./components/AutomatBoard/InsertedProduct/ListInsertedProducts";
import AddFundsDrawn from "./components/Automat/AddFundsDrawn";
import UpdatePurchasedProduct from "./components/Product/ProductBoard/UpdatePurchasedProduct";
import ProductBoard from "./components/Product/ProductBoard";

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
            <Route exact path="/login" component={Login} />

            <Switch>
              <Route exact path="/register" component={Register} />
              <SecuredRoute exact path="/dashboard" component={Dashboard} />
              <SecuredRoute exact path="/automats" component={AutomatsList} />
              <SecuredRoute exact path="/products" component={ProductBoard} />
              <SecuredRoute exact path="/tenants" component={TenantsList} />

              {
                //Automat
              }
              <SecuredRoute
                exact
                path="/updateAutomat/:id"
                component={UpdateAutomat}
              />
              <SecuredRoute exact path="/addAutomat" component={AddAutomat} />

              <SecuredRoute
                exact
                path="/automatBoard/:id"
                component={AutomatBoard}
              />
              {
                //Automat to product
              }
              <SecuredRoute
                exact
                path="/addProductToAutomat/:id"
                component={AddProductToAutomat}
              />

              <SecuredRoute
                exact
                path="/updateProductToAutomat/:automat_serialNumber/:product_id"
                component={UpdateProductToAutomat}
              />

              <SecuredRoute
                exact
                path="/insertedProductsToAutomat/:automat_serialNumber/:tenant_id"
                component={ListInsertedProducts}
              />
              {
                //Automat to funds drawn
              }

              <SecuredRoute
                exact
                path="/addFundsDrawn/:automat_serialNumber/:tenant_id"
                component={AddFundsDrawn}
              />

              {
                //Product
              }

              <SecuredRoute
                exact
                path="/updateProduct/:id"
                component={UpdateProduct}
              />
              <SecuredRoute exact path="/addProduct" component={AddProduct} />

              <SecuredRoute
                exact
                path="/addPurchasedProduct/:id"
                component={AddPurchasedProduct}
              />

              <SecuredRoute
                exact
                path="/updatePurchasedProduct/:id"
                component={UpdatePurchasedProduct}
              />

              <SecuredRoute
                exact
                path="/removePurchasedProduct/:id/:amount"
                component={RemovePurchasedProduct}
              />

              <SecuredRoute
                exact
                path="/PurchasedProductBoard"
                component={PurchasedProductBoard}
              />

              {
                //Tenant
              }

              <SecuredRoute
                exact
                path="/updateTenant/:id"
                component={UpdateTenant}
              />
              <SecuredRoute exact path="/addTenant" component={AddTenant} />
              <SecuredRoute
                exact
                path="/tenantBoard/:id"
                component={TenantBoard}
              />

              <SecuredRoute
                exact
                path="/addAutomatToTenant/:id"
                component={AddAutomatToTenant}
              />

              {
                //Insert product
              }

              <SecuredRoute
                exact
                path="/insertProductToAutomat/:automat_serialNumber/:product_id"
                component={AddInsertedProduct}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
