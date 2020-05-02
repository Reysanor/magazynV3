import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class ListFundsDrawn extends Component {
  //lifecycle hook - co ma się dziać po zamontowaniu komponentu (dane z "mapStateToProps" na dole)
  
  

  namesOfTable() {
     return(
            <tr>
            <th>VALUE</th>
            <th>DATE</th>
            </tr>
     )
     //   return <th key={index}>{key.toUpperCase()}</th>;
   
  }

  dataOfTable() {
    const {funds_drawns_prop} = this.props;
    return funds_drawns_prop.map((funds_drawn, index) => {
      const { id, amount } = funds_drawn; //destructuring

      return (
        <tr key={id}>
          <td>{amount}</td>
          <td>date of get</td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div>
        <div className="card card-body bg-light mb-5">
          <h1 id="purchasedProductsTitle">History of automat</h1>
          <table id="purchasedProducts">
            <thead>{this.namesOfTable()}</thead>
            <tbody>{this.dataOfTable()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

ListFundsDrawn.propTypes = {
  //przekazuje funkcje, isRequired oznacza że jest niezbędna do działania componentu
  //jednocześnie określa wymagany typ uzyskanego prop
};
//przyjmuje parametr state i podłącza project to state project (mappuje do componentu aplikacji)
const mapStateToProps = (state) => ({
});
//łączenie componentu z state
export default connect(
  //podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
  mapStateToProps,
  {  }
)(ListFundsDrawn);
