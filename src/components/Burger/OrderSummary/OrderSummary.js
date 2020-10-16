import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

// this component could be functional component , Dosen't have to be a class 
    render() {
        const IngredientSummary = Object.keys(this.props.ingredients).map(ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>:{this.props.ingredients[ingKey]}
                </li>);
        });
        return (
           
                <Aux>
                    <h3>Your Order</h3>
                    <p> The Delicious Burger With The Following Ingredients :</p>
                    <ul>
                        {IngredientSummary}
                    </ul>
                    <p><strong>Total Price : {this.props.price.toFixed(2)} $</strong></p>
                    <p> Continue to Checkout</p>
                    <Button btnType="Danger" clicked={this.props.purchaseCancelled}> Cancel </Button>
                    <Button btnType="Success" clicked={this.props.purchaseContinued}> Continue </Button>
                </Aux>
        )
    }

};
export default OrderSummary;