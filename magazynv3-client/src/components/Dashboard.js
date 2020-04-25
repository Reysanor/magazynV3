import React, { Component } from "react";

import ProjectItem from "./Project/ProjectItem";
import AutomatItem from "./Automat/AutomatItem";
import ProductItem from "./Product/ProductItem";
import TenantItem from "./Tenant/TenantItem";

import CreateProjectButton from "./Project/CreateProjectButton";
import CreateAutomatButton from "./Automat/CreateAutomatButton";
import CreateProductButton from "./Product/CreateProductButton";
import CreateTenantButton from "./Tenant/CreateTenantButton";

import { connect } from "react-redux";

import { getProjects } from "../actions/projectActions";
import { getAutomats } from "../actions/automatActions";
import { getProducts } from "../actions/productActions";
import { getTenants } from "../actions/tenantActions";
import { getFundsDrawns } from "../actions/fundsDrawnActions";
import { getInsertedProducts } from "../actions/insertedProductActions";
import { getPurchasedProducts } from "../actions/purchasedProductActions";
import PropTypes from "prop-types";

class Dashboard extends Component {
  //lifecycle hook - co ma się dziać po zamontowaniu komponentu (dane z "mapStateToProps" na dole)
  componentDidMount() {
    this.props.getProjects();
    this.props.getTenants();
    this.props.getAutomats();
    this.props.getProducts();
    this.props.getFundsDrawns();
    this.props.getInsertedProducts();
    this.props.getPurchasedProducts();
  }

  render() {
    //pobieram projekty
    const { projects } = this.props.project;
    const { tenants } = this.props.tenant;
    const { automats } = this.props.automat;
    const { products} = this.props.product;
    const { funds_drawns } = this.props.funds_drawn;
    const { inserted_products} = this.props.inserted_product;
    const { purchased_products } = this.props.purchased_product;
    //mapuje przycisk z linkiem do tworzenia nowego projektu a poniżej utworzone projekty
    return (
      <div>
        <div className="tenants">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Miejsce</h1>
                <br />
                {/*przycisk do utworzenia nowego Wynajmujacego */}
                <CreateTenantButton />
                <br />
                <hr />
                {/*mapuje projekty i wyswietlam je jako projectItemy */}
                {tenants.map((tenant) => (
                  <TenantItem key={tenant.id} tenant={tenant} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="automats">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Automats</h1>
                <br />
                {/*przycisk do utworzenia nowego Wynajmujacego */}
                <CreateAutomatButton />
                <br />
                <hr />
                {/*mapuje projekty i wyswietlam je jako projectItemy */}
                {automats.map((automat) => (
                  <AutomatItem key={automat.id} automat={automat} />
                ))}
              </div>
            </div>
          </div>
        </div>


        
        <div className="products">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Products</h1>
                <br />
                {/*przycisk do utworzenia nowego Wynajmujacego */}
                <CreateProductButton />
                <br />
                <hr />
                {/*mapuje projekty i wyswietlam je jako projectItemy */}
                {products.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />

        <h1 className="display-4 text-center">DEVELOPER ONLY CODE</h1>
        <br />
        <br />
        <br />


        <div className="projects">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Projects</h1>
                <br />
                {/*przycisk do utworzenia nowego projektu */}
                <CreateProjectButton />
                <br />
                <hr />
                {/*mapuje projekty i wyswietlam je jako projectItemy */}
                {projects.map((project) => (
                  <ProjectItem key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        </div>
                

      </div>
    );
  }
}

Dashboard.propTypes = {
  //przekazuje funkcje, isRequired oznacza że jest niezbędna do działania componentu
  //jednocześnie określa wymagany typ uzyskanego prop
  getProjects: PropTypes.func.isRequired,
  getTenants: PropTypes.func.isRequired,
  getAutomats: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  tenant: PropTypes.object.isRequired,
  automat: PropTypes.object.isRequired,

  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,

  getFundsDrawns: PropTypes.func.isRequired,
  funds_drawn: PropTypes.object.isRequired,
  getInsertedProducts: PropTypes.func.isRequired,
  inserted_product: PropTypes.object.isRequired,
  getPurchasedProducts: PropTypes.func.isRequired,
  purchased_product: PropTypes.object.isRequired,

};
//przyjmuje parametr state i podłącza project to state project (mappuje do componentu aplikacji)
const mapStateToProps = (state) => ({
  project: state.project,
  tenant: state.tenant,
  automat: state.automat,
  product: state.product,
  funds_drawn: state.funds_drawn,
  inserted_product: state.inserted_product,
  purchased_product: state.purchased_product



});
//łączenie componentu z state
export default connect(
  //podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
  mapStateToProps,
  { getTenants, getProjects, getAutomats,getProducts,getFundsDrawns,getInsertedProducts,getPurchasedProducts }
)(Dashboard);
