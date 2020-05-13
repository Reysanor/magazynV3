import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import {getTenantsToAutomatFree} from "../../../actions/automatActions";
import {addAutomatToTenant} from "../../../actions/automatActions";
class AddProductToAutomat extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;

    this.state = {
      tenant: id,
      errors: {},
    };
        //bind pobiera i manipuluje stanem
        this.onChange = this.onChange.bind(this);
        // //funkcja bind  przesyła stan
        this.onSubmit = this.onSubmit.bind(this);
  }

  //life cycle hooks - po każdym renderowaniu
  componentWillReceiveProps(nextProps) {
    //jeżeli mamy zmiany w state (jakieś errory nie null)
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getTenantsToAutomatFree();

  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  //on submit
  onSubmit(e) {
    // blokuje przeladowanie po submit
    e.preventDefault();
    //tworze nowy Projekt
    const newAutomatToTenant = {
      //price:this.state.price
      //product: this.state.product
      //komponent po wyrenderowaniu za pomoca rendera przekazuje props do komponentu
    };
    //console.log(this.state.automat);
    //console.log(newTask);
    //przekazuje id projektu, nowy task, history do backlogActions.js

    this.props.addAutomatToTenant(
        this.state.tenant,
        this.state.automat, //tu wstawić wybrany z listy product
         newAutomatToTenant,
        this.props.history
      );
  
  }
  render() {
    const { id } = this.props.match.params;
    const { automats} = this.props.automat;
    const { errors } = this.state;
 //iteracja przez project_task_propsy i wrzucanie do mapy ProjectTask o nazwie project_task

    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/tenantBoard/${id}`} className="btn btn-lg btn-info">
                Wróc no automatu
              </Link>
              <h4 className="display-4 text-center">Dodaj automat do miejsca</h4>
              <form onSubmit={this.onSubmit}>
            

                <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="automat"
                  value={this.state.automat}
                  onChange={this.onChange}
                >
                <option value="">Wybierz</option>
                {automats.map((item,i) =>
                  <option key={i}  value={item.serialNumber}>
                   {item.name}
                  </option>
                 )}
                </select>
              </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4" value="akceptuj"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProductToAutomat.propTypes = {
    getTenantsToAutomatFree: PropTypes.func.isRequired,
  automat: PropTypes.object.isRequired,

  addAutomatToTenant: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    automat: state.automat,
  errors:state.errors

});
export default connect(mapStateToProps, { addAutomatToTenant,getTenantsToAutomatFree })(
  AddProductToAutomat
);
