import React, { Component } from "react";
import Automat from "../../Automat/AutomatItemInTenant";

class AutomatsToTenantOwned extends Component {
  render() {
    const { automats_prop } = this.props;
    //musze mapować, nie moge wyświetlnić odrazu z props
    const atp = automats_prop.map((automat) => (
      <Automat
        key={automat.serialNumber}
        automat={automat}
      />
    ));

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <div className="card text-center mb-2">
                <div className="card-header bg-secondary text-white">
                  <h3>Automats in this tenant</h3>
                </div>
              </div>
              {atp}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AutomatsToTenantOwned;
