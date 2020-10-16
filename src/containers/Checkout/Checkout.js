import React, { Component } from 'react';
import {connect} from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    /////////// comment this code after adding redux and create redux state and reducer logic
    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // UNSAFE_componentWillMount() {
    //     // passing ingredients in url
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         // ['salad','1']
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ ingredients: ingredients, totalPrice: price });
    // }

    CheckoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    CheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchsedRedirect =this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchsedRedirect}
                    <CheckoutSummary
                        CheckoutCancelled={this.CheckoutCancelledHandler}
                        CheckoutContinued={this.CheckoutContinuedHandler}
                        ingredients={this.props.ings} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        // render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}  // commented when using redux state and use component instead
                        // we added props here to be able to use history property to redirect page after order to home page 
                        component={ContactData}
                    />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);