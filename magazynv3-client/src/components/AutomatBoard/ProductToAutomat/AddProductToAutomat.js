import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { createProductToAutomat } from "../../../actions/productToAutomatActions.js";
import PropTypes from "prop-types";

class AddProductToAutomat extends Component {
  //I want extract project id from path addProjectTask/12345
  constructor(props) {
    super(props);
    const { id } = this.props.match.params; //pobranie id ze ścieżki

    this.state = {
      product: "",
      automat: id,
      price: "",
      errors: {}
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

  //on change
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //on submit
  onSubmit(e) {
    // blokuje przeladowanie po submit
    e.preventDefault();
    //tworze nowy Projekt
    const newTask = {
        price: this.state.price,
        product: this.state.product
      //komponent po wyrenderowaniu za pomoca rendera przekazuje props do komponentu
    };
    //console.log(newTask);
    //przekazuje id projektu, nowy task, history do backlogActions.js
    this.props.createProductToAutomat(
      this.state.automat,
      newTask,
      this.props.history
    );
  }

  render() {
    const { id } = this.props.match.params;
    const { errors } = this.state;

    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/automatBoard/${id}`} className="btn btn-light">
                Back to Automat Board
              </Link>
              <h4 className="display-4 text-center">Add Project Task</h4>
              <p className="lead text-center">Project Name + Project Code</p>
              <form onSubmit={this.onSubmit}>
               
              <div className="form-group">
              <input
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.price
                })}
                placeholder="Product price"
                name="price"
                type="number"
                value={this.state.price}
                onChange={this.onChange}
              />
              {errors.price && (
                <div className="invalid-feedback">
                  {errors.price} 
                </div>
              )}
              </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
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
    AddProductToAutomat: PropTypes.func.isRequired,
  errors:PropTypes.object.isRequired
};

const mapStateToProps=state=>({
  errors: state.errors
})

export default connect(mapStateToProps, { AddProductToAutomat })(AddProductToAutomat);
