// actions for burger builder thier action creators in burgerBuilder 
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

// actions for contact data their action creators in order file
export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';
export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';

// action to redirect to home page after making order 
export const PURCHASE_INIT = 'PURCHASE_INIT';

// action to fetch orders from db
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS'
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL'

// actions for authentications
export const AUTH_START = 'AUTH_START'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'

// actions to logout 
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

// action to redirect user after authenticated
export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH'