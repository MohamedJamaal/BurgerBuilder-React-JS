import React, { Component } from 'react';
import {connect} from 'react-redux'

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHanlder';
import * as actions from '../../../store/actions/index'
import { updateObject, checkValidity } from '../../../shared/utility';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elemetType: 'input', // this from input.js
                elementConfig: {// this is the attriputes of input element which declared in input.js
                    type: 'text',
                    placeholder:'Your Name'
                },
                value:'', // mohamed gamal
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elemetType: 'input', // this from input.js
                elementConfig: {// this is the attriputes of input element which declared in input.js
                    type: 'text',
                    placeholder:'Your Street'
                },
                value:'' ,// haram
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elemetType: 'input', // this from input.js
                elementConfig: {// this is the attriputes of input element which declared in input.js
                    type: 'text',
                    placeholder:'Your Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength:5
                },
                valid: false,
                touched: false
            },
            email: {
                elemetType: 'input', // this from input.js
                elementConfig: {// this is the attriputes of input element which declared in input.js
                    type: 'email',
                    placeholder:'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            country:{
                elemetType: 'input', // this from input.js
                elementConfig: {// this is the attriputes of input element which declared in input.js
                    type: 'text',
                    placeholder:'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elemetType: 'select', // this from input.js
                elementConfig: {// this is the attriputes of input element which declared in input.js
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {}, // this empty because we dont have validation on selection but we may access it so will throw error if not found
                valid: true
            },
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();// inside the form the defaul is reload the page to send request which remove the ingredients of burger 
        // checking for loading or spinner
        // this.setState({ loading: true });

        // get value from input 
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        // send request to store in database
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId:this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token); // this instead el code ele t7teh b3d redux

        // this commented after adding action creator asynch code by redux thunk
        // axios.post('/orders.json', order) // this create table orders and database wrote with json        
        //     .then(response => {
        //         this.setState({ loading: false });
        //         this.props.history.push('/');
        //     })
        //     .catch(error =>
        //         this.setState({ loading: false})
        //     );
    }

    inputChangedHandler = (event, inputIdentifier) => {
        
        // get nested object like (elementConfig) // improved in improving module
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        })
        
        // get input from user and update the state and show in form
        // get the main objects of orderForm state (name, street, zipcode)
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        // set inputs from user in form  // updated in improved part from improve module
        // updatedFormElement.value = event.target.value;
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        // updatedFormElement.touched = true;
        // updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid});
    }
    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elemetType={formElement.config.elemetType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event)=>this.inputChangedHandler(event, formElement.id)}// formElement.id from formElementArray
                    />
                ))}
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}
                    disabled={!this.state.formIsValid}
                >Order</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4> Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

// connecting to burger builder reducer
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

//connecting to dispatched actions 
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));