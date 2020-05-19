import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import { createInsertedProduct } from "../../../actions/insertedProductActions";
import { getPurchasesPer } from "../../../actions/purchasedProductActions";
import ListInsertedProductToAutomat from "./ListInsertedProductToAutomat";

class AddInsertedProduct extends Component {
  constructor(props) {
    super(props);
    const { automat_serialNumber, product_id } = this.props.match.params;

    this.state = {
      number: "",
      profit: 0,
      total_profit: 0,
      currentPrice: 0,
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
    this.props.getPurchasesPer(product_id);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });

    this.state.total_profit =
      Math.round((e.target.value * this.state.profit + Number.EPSILON) * 100) /
      100;
  }

  //on submit
  onSubmit(e) {
    // blokuje przeladowanie po submit
    e.preventDefault();
    //tworze nowy Projekt
    const newInsertedProduct = {
      number: this.state.number,
      profit: this.state.profit,
      currentPrice: this.props.location.state.sell_price
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
    const { sell_price } = this.props.location.state;
    const { price } = this.props.purchased_product.purchased_product;
    this.state.profit = String(sell_price - price);
    //iteracja przez project_task_propsy i wrzucanie do mapy ProjectTask o nazwie project_task

    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/automatBoard/${automat_serialNumber}`}
                className="btn btn-dark"
              >
                Back to Automat Board
              </Link>

              
              <h4 className="display-4 text-center">
                {this.props.location.state.product_name}
              </h4>
              <form onSubmit={this.onSubmit}>
              <div className="form-group form-inline">
              <label className="form-label" style={{marginRight: '77px'}}>Ilość: </label>

                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.number,
                    })}
                    placeholder="Liczba wstawianch"
                    name="number"
                    type="number"
                    min="1"
                    step="1"
                    value={this.state.number}
                    onChange={this.onChange}
                  />

                  {errors.number && (
                    <div className="invalid-feedback"> {errors.number}</div>
                  )}
                </div>

                <div className="form-group form-inline">
                <label className="form-label" style={{marginRight: '9px'}}>Zysk za sztukę: </label>

                  <input
                    className="form-control form-control-lg"
                    placeholder="profit per"
                    name="profit"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={this.state.profit}
                    disabled
                  />
                </div>

                <div className="form-group form-inline">
                <label className="form-label" style={{marginRight: '16px'}}> Zysk w sumie: </label>
                  <input
                    className="form-control form-control-lg"
                    placeholder="total profit"
                    name="total_profit"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={this.state.total_profit}
                    disabled
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  value="akceptuj"
                />
              </form>

              <ListInsertedProductToAutomat
                automat_serialNumber_prop={automat_serialNumber}
                product_id_prop={product_id}
                product_name_prop={this.props.location.state.product_name}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddInsertedProduct.propTypes = {
  createInsertedProduct: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getPurchasesPer: PropTypes.func.isRequired,
  purchased_product: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
  purchased_product: state.purchased_product,
});
export default connect(mapStateToProps, {
  createInsertedProduct,
  getPurchasesPer,
})(AddInsertedProduct);
