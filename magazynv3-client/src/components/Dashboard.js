import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Dashboard extends Component {
  //lifecycle hook - co ma się dziać po zamontowaniu komponentu (dane z "mapStateToProps" na dole)
  componentDidMount() {}

  render() {
    //pobieram projekty

    //mapuje przycisk z linkiem do tworzenia nowego projektu a poniżej utworzone projekty
    return (
      <div>
        <div className="container">
          <Link to="/automats" className="btn btn-lg btn-info">
            Automaty{" "}
          </Link>

          <div className="card-deck">
            <div className="card">
              <img
                className="bd-placeholder-img card-img-top"
                height="400"
                src="pList.jpg"
                alt="image"
              />
              <div className="card-body">
                <h5 className="card-title">Magazyn</h5>
                <p className="card-text">Zakładka z produktami</p>
                <Link to="/products" className="stretched-link" />
              </div>
            </div>
            <div className="card">
              <img
                className="bd-placeholder-img card-img-top"
                height="400"
                src="tList.jpg"
                alt="image"
              />
              <div className="card-body">
                <h5 className="card-title">Miejsca</h5>
                <p className="card-text">Zakładka z miejscami</p>
                <Link to="/tenants" className="stretched-link" />
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
};
//przyjmuje parametr state i podłącza project to state project (mappuje do componentu aplikacji)
const mapStateToProps = (state) => ({});
//łączenie componentu z state
export default connect(
  //podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
  mapStateToProps,
  {}
)(Dashboard);
