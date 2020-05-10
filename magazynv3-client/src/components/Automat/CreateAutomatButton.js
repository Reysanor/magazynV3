import React from "react";
import { Link } from "react-router-dom";

const CreateAutomatButton = () => {
    return (
      <React.Fragment>
        <Link to="/addAutomat" className="btn btn-lg btn-info">
          Dodaj Automat
        </Link>
      </React.Fragment>
    );
  };
  
  export default CreateAutomatButton;
  