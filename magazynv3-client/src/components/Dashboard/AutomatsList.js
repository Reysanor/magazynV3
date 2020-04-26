import React, { Component } from "react";
import AutomatItem from "../../components/Automat/AutomatItem";
import CreateAutomatButton from "../../components/Automat/CreateAutomatButton";
import { connect } from "react-redux";
import { getAutomats } from "../../actions/automatActions";
import PropTypes from "prop-types";

class AutomatsList extends Component {
  //lifecycle hook - co ma się dziać po zamontowaniu komponentu (dane z "mapStateToProps" na dole)
  componentDidMount() {
    this.props.getAutomats();
  }

  render() {
    //pobieram projekty
    const { automats } = this.props.automat;
   
    //mapuje przycisk z linkiem do tworzenia nowego projektu a poniżej utworzone projekty
    return (
      <div>


        <div className="automats">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Automats</h1>
                <br />
                {/*przycisk do utworzenia nowego Wynajmujacego */}
                <CreateAutomatButton />
                <br />
                <hr />
                {/*mapuje projekty i wyswietlam je jako projectItemy */}
                {automats.map((automat) => (
                  <AutomatItem key={automat.id} automat={automat} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

AutomatsList.propTypes = {
  //przekazuje funkcje, isRequired oznacza że jest niezbędna do działania componentu
  //jednocześnie określa wymagany typ uzyskanego prop
 
  getAutomats: PropTypes.func.isRequired,
  automat: PropTypes.object.isRequired,
};
//przyjmuje parametr state i podłącza project to state project (mappuje do componentu aplikacji)
const mapStateToProps = (state) => ({
  automat: state.automat,

});
//łączenie componentu z state
export default connect(
  //podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
  mapStateToProps,
  { getAutomats}
)(AutomatsList);
