import React, { Component } from "react";
import PropTypes from "prop-types";
//łączenie z state
import { connect } from "react-redux";
//1 - pobieram funkcje i obiekty
import { createPurchasedProduct } from "../../../actions/purchasedProductActions"
import classnames from "classnames";

class AddPurchasedProduct extends Component {
    constructor(props) {
        super(props);
        const { id } = this.props.match.params;

        this.state = {
            amount: "",
            price: "",
            product: id,
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const newPurchasedProduct = {
            amount: this.state.amount,
            price: this.state.price,
        };
        this.props.createPurchasedProduct(this.state.product,newPurchasedProduct, this.props.history);

    }


render() {
    //pobieram errory 
    //https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Operatory/Destructuring_assignment
    const { errors } = this.state;
    //“controlled component” - Is an input form element whose value is controlled by React.
    // ma handlery i stany do przekazania przy submit
    // form ma strukture przy uzyciu bootstrapa
    //check name attribute input fields - name takie jak nazwa zmiennej w springu
    //create constructor - super() wzywa rodzica
    //set state - initializacja zmiennych wybranymi wartosciami
    //set value on input fields - powiazanie value ze zmienna
    //create onChange function - pozwala zmieniac zmienne (immutable)
    return (
      <div>
        <div className="product">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Add products to storage</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.amount
                    })}
                    placeholder="amount"
                    name="amount"
                    type="number"
                    min="1" 
                    step="1"
                    value={this.state.amount}
                    onChange={this.onChange}
                  />
                  {errors.amount && (
                    <div className="invalid-feedback">
                      {errors.amount} 
                    </div>
                  )}
                  </div>

                  <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.price
                    })}
                    placeholder="cena/1szt."
                    name="price"
                    type="number"
                    min="0.1"
                    step="any"
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
                    className="btn btn-primary btn-block mt-4" value="akceptuj"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddPurchasedProduct.propTypes = {
  //3 - przekazuje funkcje i obiekty do tej klasy, isRequired oznacza że jest niezbędna do działania componentu
  //jednocześnie określa wymagany typ uzyskanego prop
  createPurchasedProduct: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
//przyjmuje parametr state i podłącza errory to state errors (mappuje do componentu aplikacji)
const mapStateToProps = state => ({
  errors: state.errors
});
//2 - łączenie componentu z state 
export default connect(
  //podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
  mapStateToProps,
  { createPurchasedProduct }
)(AddPurchasedProduct);


