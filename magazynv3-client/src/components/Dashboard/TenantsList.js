import React, { Component } from "react";
import TenantItem from "../../components/Tenant/TenantItem";
import CreateTenantButton from "../../components/Tenant/CreateTenantButton";
import { connect } from "react-redux";
import { getTenants } from "../../actions/tenantActions";
import PropTypes from "prop-types";

class TenantsList extends Component {
  //lifecycle hook - co ma się dziać po zamontowaniu komponentu (dane z "mapStateToProps" na dole)
  componentDidMount() {
    this.props.getTenants();

  }

  render() {
    //pobieram projekty
    const { tenants } = this.props.tenant;
   
    //mapuje przycisk z linkiem do tworzenia nowego projektu a poniżej utworzone projekty
    return (
      <div>
        <div className="tenants">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Places</h1>
                <br />
                {/*przycisk do utworzenia nowego Wynajmujacego */}
                <CreateTenantButton />
                <br />
                <hr />
                {/*mapuje projekty i wyswietlam je jako projectItemy */}
                {tenants.map((tenant) => (
                  <TenantItem key={tenant.id} tenant={tenant} />
                ))}
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

TenantsList.propTypes = {
  //przekazuje funkcje, isRequired oznacza że jest niezbędna do działania componentu
  //jednocześnie określa wymagany typ uzyskanego prop
  getTenants: PropTypes.func.isRequired,
  tenant: PropTypes.object.isRequired,

};
//przyjmuje parametr state i podłącza project to state project (mappuje do componentu aplikacji)
const mapStateToProps = (state) => ({
  tenant: state.tenant,
  
});
//łączenie componentu z state
export default connect(
  //podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
  mapStateToProps,
  { getTenants}
)(TenantsList);
