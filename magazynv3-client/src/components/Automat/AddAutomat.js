import React, { Component } from "react";
import PropTypes from "prop-types";
//łączenie z state
import { connect } from "react-redux";
//1 - pobieram funkcje i obiekty
import { createAutomat } from "../../actions/automatActions"
import classnames from "classnames";

class AddAutomat extends Component {
    //construktor z domyślnymi wartościami
    constructor() {
        super();

        this.state = {
            name: "",
            serialNumber: "",
            type: "",
            capacity: "",
            status: "",
            productionDate: "",
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
        const newAutomat = {
            name: this.state.name,
            serialNumber: this.state.serialNumber,
            type: this.state.type,
            capacity: this.state.capacity,
            status: this.state.status,
            productionDate: this.state.productionDate,
            //komponent po wyrenderowaniu za pomoca rendera przekazuje props do komponentu

        };

        //console.log(newAutomat);
        this.props.createAutomat(newAutomat, this.props.history);

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
        <div className="automat">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Create Automat form</h5>
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
                      placeholder="Automat Name"
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
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.serialNumber
                      })}
                      placeholder="Unique Automat Serial number"
                      name="serialNumber"
                      value={this.state.serialNumber}
                      onChange={this.onChange}
                    />
                    {errors.serialNumber && (
                      <div className="invalid-feedback">
                        {errors.serialNumber}
                      </div>
                    )}
                  </div>

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

                    <div className="form-group">
                    <input
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.capacity
                      })}
                      placeholder="Automat capacity"
                      name="capacity"
                      type="number"
                      min="50" max="150"
                      value={this.state.capacity}
                      onChange={this.onChange}
                    />
                    {errors.capacity && (
                      <div className="invalid-feedback">
                        {errors.capacity} 
                      </div>
                    )}
                    </div>


                    <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="status"
                      value={this.state.status}
                      onChange={this.onChange}
                    >
                      <option value="">Choose a status</option>
                      <option value="w magazynie">w magazynie</option>
                      <option value="naprawiany">naprawiany</option>
                      <option value="zepsuty">zepsuty</option>
                      <option value="wynajmowany">wynajmowany</option>
                    </select>
                  </div>



                  <div className="form-group">
                  <input
                    type="date"
                    
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.productionDate
                    })}
                    placeholder="productionDate of automat"
                    name="productionDate"
                    required pattern="\d{4}-\d{2}-\d{2}"
                    value={this.state.productionDate}
                    onChange={this.onChange}
                  />
                  {errors.productionDate && (
                    <div className="invalid-feedback">
                      {errors.productionDate}
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
      </div>
    );
  }
}

AddAutomat.propTypes = {
  //3 - przekazuje funkcje i obiekty do tej klasy, isRequired oznacza że jest niezbędna do działania componentu
  //jednocześnie określa wymagany typ uzyskanego prop
  createAutomat: PropTypes.func.isRequired,
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
  { createAutomat }
)(AddAutomat);


