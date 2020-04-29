import React, { Component } from "react";
import PropTypes from "prop-types";
//łączenie z state
import { connect } from "react-redux";
//1 - pobieram funkcje i obiekty
import {getProduct, createProduct } from "../../actions/productActions"
import classnames from "classnames";

class UpdateProduct extends Component {
    //construktor z domyślnymi wartościami
    constructor() {
        super();

        this.state = {
            id: "",
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
        
         //ustalenia wartosci this.state na dane z wybranego obiektu na starcie
         const {
            id,
            name,
            type
        } = nextProps.product;

        //ustawianie wartosci w tym projekcie (this.setState)
        //wywołanie onChange (również przy pierwszym załadowaniu strony)
        this.setState({
            id,
            name,
            type
        });
    }

    componentDidMount() {
        //id uzyskuje ze scieżki (match.params)
        const { id } = this.props.match.params;
        //pobieram z bazy danych
        this.props.getProduct(id, this.props.history);
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
        const UpdateProduct = {
            id: this.state.id,
            name: this.state.name,
            type: this.state.type

            //komponent po wyrenderowaniu za pomoca rendera przekazuje props do komponentu

        };

        //console.log(newProduct);
        this.props.createProduct(UpdateProduct, this.props.history);

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
                <h5 className="display-4 text-center">Create Product form</h5>
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
                      placeholder="Product Name"
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

                  <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="type"
                    value={this.state.type}
                    onChange={this.onChange}
                    disabled
                  >
                    <option value="">Choose a type</option>
                    <option value="cold">cold</option>
                    <option value="hot">hot</option>
                    <option value="snack">snack</option>
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
      </div>
    );
  }
}

UpdateProduct.propTypes = {
  //3 - przekazuje funkcje i obiekty do tej klasy, isRequired oznacza że jest niezbędna do działania componentu
  //jednocześnie określa wymagany typ uzyskanego prop
  createProduct: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};
//przyjmuje parametr state i podłącza errory to state errors (mappuje do componentu aplikacji)
const mapStateToProps = state => ({
  errors: state.errors,
  product: state.product.product
});
//2 - łączenie componentu z state 
export default connect(
  //podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
  mapStateToProps,
  {getProduct, createProduct }
)(UpdateProduct);


