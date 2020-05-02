import React from "react";
import { Link } from "react-router-dom";

const PurchasedProductButton = () => {
    return (
      <React.Fragment>
        <Link to="/PurchasedProductBoard" className="btn btn-lg btn-info">
          List of Purchases
        </Link>
      </React.Fragment>
    );
  };
  
  export default PurchasedProductButton;
  