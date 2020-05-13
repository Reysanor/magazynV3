import React from "react";
import { Link } from "react-router-dom";

const CreateTenantButton = () => {
    return (
      <React.Fragment>
        <Link to="/addTenant" className="btn btn-lg btn-info">
          Stwórz miejsce
        </Link>
      </React.Fragment>
    );
  };
  
  export default CreateTenantButton;
  