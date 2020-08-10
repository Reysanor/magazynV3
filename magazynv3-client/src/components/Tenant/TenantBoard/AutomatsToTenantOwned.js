import React, { Component } from "react";
import Automat from "../../Automat/AutomatItemInTenant";
import { getInsertedProductsToAutomatTotalProfitAll } from "../../../actions/insertedProductActions";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { id } from "date-fns/locale";

class AutomatsToTenantOwned extends Component {
  
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }

  componentDidMount() {
    const {id_prop} = this.props;
    //console.log(id_prop);
     this.props.getInsertedProductsToAutomatTotalProfitAll(this.props.tenant_id_prop);
  }
  
  render() {
    const { automats_prop } = this.props;
    const { inserted_products } = this.props.inserted_product;

    //musze mapować, nie moge wyświetlnić odrazu z props

    let merged2 = [];
    for(let i=0; i<automats_prop.length; i++) {
     // let temp  = ;
     if(automats_prop[i].id!==null ){
      //if((inserted_products.find((itmInner) => itmInner.automat.id === automats_prop[i].id))){
        if(inserted_products.length>0 && inserted_products[0].product===null){
        //  console.log(inserted_products)
        automats_prop[i].profit = (inserted_products.find((itmInner) => itmInner.automat.id === automats_prop[i].id)).profit;
        merged2.push(automats_prop[i]);
        }
      }
    }
   
    const pta2 = merged2.map((automat) => (
      <Automat
        key={(automat.id)}
        automat={automat}
        
      />
    ));


    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card text-center mb-2">
                <div className="card-header bg-secondary text-white">
                  <h3>Automaty w tym miejscu</h3>
                </div>
              </div>
              {pta2}
            </div>
          </div>
        </div>
      </div>
    );
  }
}



AutomatsToTenantOwned.propTypes = {
  getInsertedProductsToAutomatTotalProfitAll: PropTypes.func.isRequired,
  inserted_product: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  inserted_product: state.inserted_product,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getInsertedProductsToAutomatTotalProfitAll,
})(AutomatsToTenantOwned);
