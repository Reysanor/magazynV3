//pojedyncze Project taski

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class AutomatToProductItem extends Component {
 
  render() {
    const { product_to_automat } = this.props; //ten task - odnosze się do nich poprzez nawiasy
    // np {project_task.summary} - oczekuje że dostane z Backlog obiekt z props project_task

    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary`}>
          {" "}
          {/*metoda dodanie bootstrap kodu*/}
          ID product: {product_to_automat.product} -- price: {product_to_automat.price}
        </div>
        <div className="card-body bg-light">
        
        </div>
      </div>
    );
  }
}
AutomatToProductItem.propTypes = {
};
export default connect(null, {  })(AutomatToProductItem);
