import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

// fetching ingredients from db by asynch code after adding redux thunk

export const setIngredients = (ingredients) => {
    return { // fetch action which will dispatch to fetch ingredients
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

// fetch ingredients load error
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

// asynch code here
export const initialIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-11ba8.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            }).catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    }
}