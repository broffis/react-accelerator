import React, { useReducer, useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch(action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};

const httpReducer = (curHttpState, action) => {
  switch(action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...curHttpState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
        return { ...curHttpState, error: null };
    default:
        throw new Error('Should not be reached!');
  }
}

const Ingredients = () => {
  const [ userIngredients, dispatchIngredients ] = useReducer(ingredientReducer, []);
  const [ httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });
  // const [ userIngredients, setUserIngredients ] = useState([]);
  // const [ isLoading, setIsLoading ] = useState(false);
  // const [ error, setError ] = useState('');

  // Runs after every render cycle
  // useEffect(() => {
  //   fetch('https://react-edc39.firebaseio.com/ingredients.json').then(
  //     response => response.json()
  //   ).then(responseData => {
  //     const loadedIngredients = [];
  //     for (const key in responseData) {
  //       loadedIngredients.push({
  //         id: key,
  //         title: responseData[key].title,
  //         amount: responseData[key].amount
  //       });
  //     }
  //     setUserIngredients(loadedIngredients);
  //   })
  // }, []); // => array is the dependencies useEffect is attached to

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients);
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => { // => useCallback prevents the constant re-render when useEffect is set on function
    // setUserIngredients(filteredIngredients)
    dispatchIngredients({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = ingredient => {
    // setIsLoading(true);
    dispatchHttp({  type: 'SEND'});
    fetch('https://react-edc39.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      // setIsLoading(false);
      dispatchHttp({ type: 'RESPONSE' });
      return response.json(); // => Pulls body from response
    }).then(responseData => {
      // setUserIngredients(prevIngredients => [
      //   ...prevIngredients,
      //   // { id: Math.random().toString(), ...ingredient },
      //   { id: responseData.name, ...ingredient }  // => name is the id auto-generated by Firebase
      // ]);
      dispatchIngredients({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient } })
    }).catch(error => {
      // setError('Something went wrong');
      // setIsLoading(false);
      dispatchHttp({ type: 'ERROR', error: error.message })
    });
  }

  const removeIngredientHandler = ingredientId => {
    // setIsLoading(true);
    dispatchHttp({  type: 'SEND'});
    fetch(`https://react-edc39.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
    }).then(response => {
      // setIsLoading(false);
      dispatchHttp({ type: 'RESPONSE' });
      // setUserIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== id))
      dispatchIngredients({ type: 'DELETE', id: ingredientId })
    }).catch(error => {
      // setError(error.message);
      // setError('Something went wrong');
      // setIsLoading(false);
      dispatchHttp({ type: 'ERROR', errorMessage: error.message })
    });
  }

  const clearError = () => {
    // setError(null);
    dispatchHttp({ type: 'CLEAR' })
  }

  return (
    <div className="App">
      { httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal> }
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ userIngredients } onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;