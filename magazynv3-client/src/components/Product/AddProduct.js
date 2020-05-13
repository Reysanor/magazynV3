import React, { Component } from "react";
import PropTypes from "prop-types";
//łączenie z state
import { connect } from "react-redux";
import ProductBoardButton from "./ProductBoard/ProductBoardButton"
//1 - pobieram funkcje i obiekty
import { createProduct } from "../../actions/productActions"
import classnames from "classnames";

class AddProduct extends Component {
    //construktor z domyślnymi wartościami
    constructor() {
        super();

        this.state = {
            name: "",
            type: "",
         
            errors: {}
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
        const newProduct = {
            name: this.state.name,
            type: this.state.type,

            //komponent po wyrenderowaniu za pomoca rendera przekazuje props do komponentu

        };

        //console.log(newProduct);
        this.props.createProduct(newProduct, this.props.history);

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
                <h5 className="display-4 text-center">Dodaj produkt</h5>
                <ProductBoardButton/>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      //https://getbootstrap.com/docs/4.3/components/forms/#how-it-works
                      //           () = zbiór ciągów znaków dzięki classnames, 
                      //wewnetrzny {} = zbiór zmiennych wartości, tutaj klasa bootstrapa invalid class dla errorów,
                      //zewnetrzny {} = opakowanie dla className
                      //is-invalid - kolor obwodu pola w formularzu na czerwony
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.name
                      })}
                      placeholder="Nazwa produktu"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    {errors.name && (
                                    //Bootstrap klasa do zwracania informacji o błędzie na czerwono
                      <div className="invalid-feedback">
                        {errors.name}
                      </div>
                    )}
                  </div>
{/*
                  <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="type"
                    value={this.state.type}
                    onChange={this.onChange}
                  >
                    <option value="">Choose a type</option>
                    <option value="cold">cold</option>
                    <option value="hot">hot</option>
                    <option value="snack">snack</option>
                  </select>
                                </div>
*/}
                
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

AddProduct.propTypes = {
  //3 - przekazuje funkcje i obiekty do tej klasy, isRequired oznacza że jest niezbędna do działania componentu
  //jednocześnie określa wymagany typ uzyskanego prop
  createProduct: PropTypes.func.isRequired,
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
  { createProduct }
)(AddProduct);


