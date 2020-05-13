import React from "react";
import { Link } from "react-router-dom";

const ProductBoardButton = () => {
    return (
      <React.Fragment>
        <Link to="/products" className="btn btn-lg btn-info">
          Anuluj
        </Link>
      </React.Fragment>
    );
  };
  
  export default ProductBoardButton;
  