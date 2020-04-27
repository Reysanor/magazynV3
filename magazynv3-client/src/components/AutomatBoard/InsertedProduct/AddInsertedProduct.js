import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import { createInsertedProduct } from "../../../actions/insertedProductActions";

class AddInsertedProduct extends Component {
  constructor(props) {
    super(props);
    const { automat_serialNumber, product_id } = this.props.match.params;

    this.state = {
      number: "",
      product: product_id,
      automat: automat_serialNumber,
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
    const { automat_serialNumber, product_id } = this.props.match.params;
   

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
    const newInsertedProduct = {
      number:this.state.number
      //product: this.state.product
      //komponent po wyrenderowaniu za pomoca rendera przekazuje props do komponentu
    };
    //console.log(this.state.automat);
    //console.log(newTask);
    //przekazuje id projektu, nowy task, history do backlogActions.js

    this.props.createInsertedProduct(
        this.state.automat,
        this.state.product, //tu wstawić wybrany z listy product
        newInsertedProduct,
        this.props.history
      );
  
  }
  render() {
    const { automat_serialNumber, product_id } = this.props.match.params;
    const { errors } = this.state;
 //iteracja przez project_task_propsy i wrzucanie do mapy ProjectTask o nazwie project_task

    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/automatBoard/${automat_serialNumber}`} className="btn btn-light">
                Back to Automat Board
              </Link>
              <h4 className="display-4 text-center">Number of inserted products</h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                  className={classnames("form-control form-control-lg",{
                    "is-invalid":errors.number
                  })}
                    placeholder="Number of inserted products"
                    name="number"
                    type="number"
                    min="1"
                    step="1"
                    value={this.state.number}
                    onChange={this.onChange}
                  />
                  {
                    errors.number && (
                      <div className="invalid-feedback"> {errors.number}</div>
                    )
                  }
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

AddInsertedProduct.propTypes = {

  createInsertedProduct: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  errors:state.errors

});
export default connect(mapStateToProps, { createInsertedProduct })(
    AddInsertedProduct
);