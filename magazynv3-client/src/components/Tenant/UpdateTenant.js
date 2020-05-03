import React, { Component } from "react";
import PropTypes from "prop-types";
//łączenie z state
import { connect } from "react-redux";
//1 - pobieram funkcje i obiekty
import {getTenant, createTenant } from "../../actions/tenantActions"
import classnames from "classnames";

class UpdateTenant extends Component {
    //construktor z domyślnymi wartościami
    constructor() {
        super();

        this.state = {
            id: "",
            name: "",
            nip: "",
            street: "",
            zipCode: "",
            city: "",
            phoneNumber: "",
            emailAddress: "",
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
            nip,
            street,
            zipCode,
            city,
            phoneNumber,
            emailAddress
        } = nextProps.tenant;

        //ustawianie wartosci w tym projekcie (this.setState)
        //wywołanie onChange (również przy pierwszym załadowaniu strony)
        this.setState({
            id,
            name,
            nip,
            street,
            zipCode,
            city,
            phoneNumber,
            emailAddress
        });
    }

    componentDidMount() {
        //id uzyskuje ze scieżki (match.params)
        const { id } = this.props.match.params;
        //pobieram z bazy danych
        this.props.getTenant(id, this.props.history);
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
        const UpdateTenant = {
            id: this.state.id,
            name: this.state.name,
            nip: this.state.nip,
            street: this.state.street,
            zipCode: this.state.zipCode,
            city: this.state.city,
            phoneNumber: this.state.phoneNumber,
            emailAddress: this.state.emailAddress
            //komponent po wyrenderowaniu za pomoca rendera przekazuje props do komponentu

        };

        //console.log(newTenant);
        this.props.createTenant(UpdateTenant, this.props.history);

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
                <div className="tenant">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Update Tenant form</h5>
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
                                            placeholder="Tenant Name"
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
                                            className="form-control form-control-lg"
                                            placeholder="Unique Project NIP"
                                            name="nip"
                                            value={this.state.nip}
                                            onChange={this.onChange}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.street
                                            })}
                                            placeholder="Tenant street"
                                            name="street"
                                            value={this.state.street}
                                            onChange={this.onChange}
                                        />
                                        {errors.street && (
                                            <div className="invalid-feedback">
                                                {errors.street}
                                            </div>
                                        )}
                                    </div>
                                   

                                    <div className="form-group">
                                        <textarea
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.zipCode
                                            })}
                                            placeholder="Tenant zip code"
                                            name="zipCode"
                                            type="number"
                                            min="10000" max="99999"
                                            value={this.state.zipCode}
                                            onChange={this.onChange}
                                        />
                                        {errors.zipCode && (
                                            <div className="invalid-feedback">
                                                {errors.zipCode}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <textarea
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.city
                                            })}
                                            placeholder="Tenant city"
                                            name="city"
                                            value={this.state.city}
                                            onChange={this.onChange}
                                        />
                                        {errors.city && (
                                            <div className="invalid-feedback">
                                                {errors.city}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <textarea
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.phoneNumber
                                            })}
                                            placeholder="Tenant phoneNumber"
                                            name="phoneNumber"
                                            type="text"
                                            maxLength="9" minLength="9" size="9"
                                            value={this.state.phoneNumber}
                                            onChange={this.onChange}
                                        />
                                        {errors.phoneNumber && (
                                            <div className="invalid-feedback">
                                                {errors.phoneNumber}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <textarea
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.emailAddress
                                            })}
                                            placeholder="Tenant emailAddress"
                                            name="emailAddress"
                                            type="email"
                                            value={this.state.emailAddress}
                                            onChange={this.onChange}
                                        />
                                        {errors.emailAddress && (
                                            <div className="invalid-feedback">
                                                {errors.emailAddress}
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

UpdateTenant.propTypes = {
    //3 - przekazuje funkcje i obiekty do tej klasy, isRequired oznacza że jest niezbędna do działania componentu
    //jednocześnie określa wymagany typ uzyskanego prop
    createTenant: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    getTenant: PropTypes.func.isRequired,
    tenant: PropTypes.object.isRequired
};
//przyjmuje parametr state i podłącza errory to state errors (mappuje do componentu aplikacji)
const mapStateToProps = state => ({
    errors: state.errors,
    tenant: state.tenant.tenant
});
//2 - łączenie componentu z state 
export default connect(
    //podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
    mapStateToProps,
    {getTenant, createTenant }
)(UpdateTenant);


