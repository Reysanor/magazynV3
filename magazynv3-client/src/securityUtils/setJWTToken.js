import React, { Component } from 'react'
import axios from "axios"

const setJWTToken = token => {
    if(token){
        //wstawiam header do żądzania np. post
        axios.defaults.headers.common["Authoriation"] = token;
    } else {
        delete axios.defaults.headers.common["Authoriation"];
    }
}

export default setJWTToken;