import React, { Component } from "react";
import PropTypes from "prop-types";
//łączenie z state
import { connect } from "react-redux";
//1 - pobieram funkcje i obiekty
import { getAutomat, createAutomat } from "../../actions/automatActions";
import classnames from "classnames";

class UpdateAutomat extends Component {
  //construktor z domyślnymi wartościami
  constructor() {
    super();

    this.state = {
      id: "",
      name: "",
      serialNumber: "",
      type: "",
      capacity: "",
      status: "",
      productionDate: "",
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

    const {
      id,
      name,
      serialNumber,
      type,
      capacity,
      status,
      productionDate,
    } = nextProps.automat;

    this.setState({
      id,
      name,
      serialNumber,
      type,
      capacity,
      status,
      productionDate,
    });
  }
  componentDidMount() {
    //id uzyskuje ze scieżki (match.params)
    const { id } = this.props.match.params;
    //pobieram z bazy danych
    this.props.getAutomat(id, this.props.history);
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
    const UpdateAutomat = {
      id: this.state.id,
      name: this.state.name,
      serialNumber: this.state.serialNumber,
      type: this.state.type,
      capacity: this.state.capacity,
      status: this.state.status,
      productionDate: this.state.productionDate,
      //komponent po wyrenderowaniu za pomoca rendera przekazuje props do komponentu
    };

    //console.log(newAutomat);
    this.props.createAutomat(UpdateAutomat, this.props.history);
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
                        "is-invalid": errors.name,
                      })}
                      placeholder="Automat Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    {errors.name && (
                      //Bootstrap klasa do zwracania informacji o błędzie na czerwono
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.serialNumber,
                      })}
                      placeholder="Unique Automat Serial number"
                      name="serialNumber"
                      value={this.state.serialNumber}
                      onChange={this.onChange}
                      disabled
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
                      name="priority"
                      value={this.state.type}
                      onChange={this.onChange}
                      disabled
                    >
                      <option value={0}>Choose a type</option>
                      <option value={1}>cold</option>
                      <option value={2}>hot</option>
                      <option value={3}>snack</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <input
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.capacity,
                      })}
                      placeholder="Automat capacity"
                      name="capacity"
                      type="number"
                      min="50"
                      max="150"
                      value={this.state.capacity}
                      onChange={this.onChange}
                      disabled
                    />
                    {errors.capacity && (
                      <div className="invalid-feedback">{errors.capacity}</div>
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
                        "is-invalid": errors.productionDate,
                      })}
                      placeholder="productionDate of automat"
                      name="productionDate"
                      required
                      pattern="\d{4}-\d{2}-\d{2}"
                      value={this.state.productionDate}
                      onChange={this.onChange}
                      disabled
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

UpdateAutomat.propTypes = {
  //3 - przekazuje funkcje i obiekty do tej klasy, isRequired oznacza że jest niezbędna do działania componentu
  //jednocześnie określa wymagany typ uzyskanego prop
  createAutomat: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getAutomat: PropTypes.func.isRequired,
  automat: PropTypes.object.isRequired,
};
//przyjmuje parametr state i podłącza errory to state errors (mappuje do componentu aplikacji)
const mapStateToProps = (state) => ({
  errors: state.errors,
  automat: state.automat.automat,
});
//2 - łączenie componentu z state
export default connect(
  //podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
  mapStateToProps,
  { getAutomat, createAutomat }
)(UpdateAutomat);
