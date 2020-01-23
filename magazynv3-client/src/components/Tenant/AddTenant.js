import React, { Component } from "react";
import PropTypes from "prop-types";
//łączenie z state
import { connect } from "react-redux";
//1 - pobieram funkcje i obiekty
import { createTenant } from "../../actions/tenantActions"
import classnames from "classnames";

class AddTenant extends Component {
    //construktor z domyślnymi wartościami
    constructor() {
        super();

        this.setState = {

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
        const newTenant = {
            nip: this.state.nip,
            street: this.state.street,
            zipCode: this.state.zipCode,
            city: this.state.city,
            phoneNumber: this.state.phoneNumber,
            emailAddress: this.state.emailAddress,
            //komponent po wyrenderowaniu za pomoca rendera przekazuje props do komponentu

        };

        //console.log(newTenant);
        this.props.createTenant(newTenant, this.props.history);


    }

}