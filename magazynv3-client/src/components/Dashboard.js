import React, { Component } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Dashboard extends Component {
  //lifecycle hook - co ma się dziać po zamontowaniu komponentu (dane z "mapStateToProps" na dole)
  componentDidMount() {}

  render() {
    //pobieram projekty

    //mapuje przycisk z linkiem do tworzenia nowego projektu a poniżej utworzone projekty
    return (
      <div>
        <div className="container">
          <div className="card-deck">
            <div className="card bg-warning">
              <Link
                to="/automats"
                className="card-body text-center text-black btn"
              >
                Automaty{" "}
              </Link>
            </div>

            <div className="card bg-success">
              <Link
                to="/products"
                className="card-body text-center text-black btn"
              >
                Magazyn{" "}
              </Link>
            </div>
            <div className="card bg-danger">
              <Link
                to="/tenants"
                className="card-body text-center text-black btn"
              >
                Miejsca{" "}
              </Link>
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
};
//przyjmuje parametr state i podłącza project to state project (mappuje do componentu aplikacji)
const mapStateToProps = (state) => ({});
//łączenie componentu z state
export default connect(
  //podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
  mapStateToProps,
  {}
)(Dashboard);
