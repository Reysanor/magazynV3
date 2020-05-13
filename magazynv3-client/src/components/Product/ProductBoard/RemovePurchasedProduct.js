import React, { Component } from "react";
import PropTypes from "prop-types";
//łączenie z state
import { connect } from "react-redux";
//1 - pobieram funkcje i obiekty
import { removePurchasedProduct } from "../../../actions/purchasedProductActions";
import classnames from "classnames";
import ProductBoardButton from "./ProductBoardButton"

class RemovePurchasedProduct extends Component {
  //construktor z domyślnymi wartościami
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.state = {
      amount: "",
      price: "0",
      product: id,
      errors: {},
    };
    //bind pobiera i manipuluje stanem
    this.onChange = this.onChange.bind(this);
    //funkcja bind  przesyła stan
    this.onSubmit = this.onSubmit.bind(this);
  }

  //life cycle hooks - po każdym renderowaniu
  componentWillReceiveProps(nextProps) {
    //jeżeli mamy zmiany w state (jakieś errory nie null)
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  //wymaga bind w formularzu aby wprowadzać dane
  //dluższe rozwiązanie dla każdej zmiennej -> this.setState({projectName: e.target.value});
  //e.target - setState ustawia value wybranego elementu po evencie na danym name
  onChange(e) {
   
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    // blokuje przeladowanie po submit
    e.preventDefault();
    //tworze nowy Projekt
    const newPurchasedProduct = {
      amount: this.state.amount*(-1),
      price: this.state.price,

      //komponent po wyrenderowaniu za pomoca rendera przekazuje props do komponentu
    };

    //console.log(newProduct);
    this.props.removePurchasedProduct(
      this.state.product,
      newPurchasedProduct,
      this.props.history
    );
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
   if(Number(this.props.match.params.amount<=0)){
    return (
      <div className="alert alert-info text-center" role="alert">
       No available products
      </div>
    );
   }else{
    return (
      <div>

        <div className="product">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">
                  Pobierz produkt z magazynu
                </h5>
                <ProductBoardButton/>

                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.amount,
                      })}
                      placeholder="amount"
                      name="amount"
                      type="number"
                      max={this.props.match.params.amount}
                      min="1"
                      step="1"
                      value={this.state.amount}
                      onChange={this.onChange}
                    />
                    {errors.amount && (
                      <div className="invalid-feedback">{errors.amount}</div>
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
}

RemovePurchasedProduct.propTypes = {
  //3 - przekazuje funkcje i obiekty do tej klasy, isRequired oznacza że jest niezbędna do działania componentu
  //jednocześnie określa wymagany typ uzyskanego prop
  removePurchasedProduct: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
//przyjmuje parametr state i podłącza errory to state errors (mappuje do componentu aplikacji)
const mapStateToProps = (state) => ({
  errors: state.errors,
});
//2 - łączenie componentu z state
export default connect(
  //podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
  mapStateToProps,
  { removePurchasedProduct }
)(RemovePurchasedProduct);
