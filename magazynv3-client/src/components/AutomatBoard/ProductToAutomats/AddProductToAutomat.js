import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import { addProductToAutomat } from "../../../actions/productToAutomatActions";

//import ProductItem from "../../Product/ProductItem";
//import { getProducts } from "../../../actions/productActions";

class AddProductToAutomat extends Component {
  componentDidMount() {
    //this.props.getProducts();
  }

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
      price:this.state.price,
      //product: this.state.product
      //komponent po wyrenderowaniu za pomoca rendera przekazuje props do komponentu
    };
    console.log(this.state.automat);
    //console.log(newTask);
    //przekazuje id projektu, nowy task, history do backlogActions.js

    this.props.addProductToAutomat(
        this.state.automat,
         2, //tu wstawić wybrany z listy product
         newProductToAutomat,
        this.props.history
      );
  
  }
  render() {
    const { id } = this.props.match.params.id;
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
                    className={classnames("form-control form-control-lg")}
                    placeholder="Automat price"
                    name="price"
                    type="number"
                    min="1"
                    max="5"
                    value={this.state.price}
                    onChange={this.onChange}
                  />
                </div>

                {/*products.map((product) => ( <ProductItem key={product.id} product={product} /> )) */}

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
  // getProducts: PropTypes.func.isRequired,
  // product: PropTypes.object.isRequired,
  addProductToAutomat: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  //product: state.product
});
export default connect(mapStateToProps, { addProductToAutomat })(
  AddProductToAutomat
);
