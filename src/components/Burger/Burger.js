import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {
    // transforming given ingredient in state into an array with the number of given ingredients
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])].map((_, i) => {
                return <BurgerIngredient key={ingKey + i} type={ingKey} />;
            });
        })//for here we return array with arrays contains ingredients with its numbers (2cheese , 2 meat )
        .reduce((prevArr, newArr) => { // to make all arrays in an array 
            return prevArr.concat(newArr)
        }, []);
    // console.log(transformedIngredients);
    
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p> Please Start Adding Ingredients </p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>

    );
};

export default burger;