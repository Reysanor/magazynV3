import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import { addProductToAutomat } from "../../../actions/productToAutomatActions";
import {getFreeProducts} from "../../../actions/productActions";
class AddProductToAutomat extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;


    this.state = {
      price: "",
      product: "",
      automat: id,
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
    this.props.getFreeProducts(id);

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
    const newProductToAutomat = {
      price:this.state.price
      //product: this.state.product
      //komponent po wyrenderowaniu za pomoca rendera przekazuje props do komponentu
    };
    //console.log(this.state.automat);
    //console.log(newTask);
    //przekazuje id projektu, nowy task, history do backlogActions.js

    this.props.addProductToAutomat(
        this.state.automat,
        this.state.product, //tu wstawić wybrany z listy product
         newProductToAutomat,
        this.props.history
      );
  
  }
  render() {
    const { id } = this.props.match.params;
    const { products} = this.props.product;
    const { errors } = this.state;
 //iteracja przez project_task_propsy i wrzucanie do mapy ProjectTask o nazwie project_task

    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/automatBoard/${id}`} className="btn btn-light">
                Back to Automat Board
              </Link>
              <h4 className="display-4 text-center">Add Product to automat</h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                  className={classnames("form-control form-control-lg",{
                    "is-invalid":errors.price
                  })}
                    placeholder="Automat price"
                    name="price"
                    type="number"
                    min="1"
                    max="5"
                    step="any"
                    value={this.state.price}
                    onChange={this.onChange}
                  />
                  {
                    errors.price && (
                      <div className="invalid-feedback"> {errors.price}</div>
                    )
                  }
                </div>


                <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="product"
                  value={this.state.product}
                  onChange={this.onChange}
                >
                <option value="">Select option</option>
                {products.map((item,i) =>
                  <option key={i}  value={item.id}>
                   {item.name}
                  </option>
                 )}
                </select>
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
  getFreeProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,

  addProductToAutomat: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  product: state.product,
  errors:state.errors

});
export default connect(mapStateToProps, { addProductToAutomat,getFreeProducts })(
  AddProductToAutomat
);
