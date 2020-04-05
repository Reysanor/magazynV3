import React from "react";
import { Link } from "react-router-dom";

const CreateProductButton = () => {
    return (
      <React.Fragment>
        <Link to="/addProduct" className="btn btn-lg btn-info">
          Create a Product
        </Link>
      </React.Fragment>
    );
  };
  
  export default CreateProductButton;
  