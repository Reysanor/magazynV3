import React from "react";
import { Link } from "react-router-dom";

const CreateProductButton = () => {
    return (
      <React.Fragment>
        <Link to="/addProduct" className="btn btn-lg btn-info">
          Dodaj Produkt
        </Link>
      </React.Fragment>
    );
  };
  
  export default CreateProductButton;
  