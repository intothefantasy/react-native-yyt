export const SEARCH_RESULT = 'SEARCH_RESULT';
export const ADD_TO_CART = "ADD_TO_CART";
export const ADJUST_QUANTITY = "ADJUST_QUANTITY";
export const LOAD_MORE = "LOAD_MORE";

export function searchCard(searchURL){
	console.log("Search URL is => "+searchURL);
	return (dispatch) => {
        fetch(searchURL)
        .then((response) => response.json())
        .then((responseJson) => {
        	dispatch({type: SEARCH_RESULT, data:responseJson.result, countResult: responseJson.result_count});
        })
        .catch((error) => {
        	console.error(error);
        });

    };
}

export function addToCart(card){
	return (dispatch) => {
		card.quantity = 1;
		dispatch({type: ADD_TO_CART, data:card});
		console.log(card);
	};
}

export function adjustQuantity(quantity,item){
	return (dispatch) => {
	    item.quantity = quantity;
		dispatch({type: ADJUST_QUANTITY, data: item});
	};
}

export function loadMore(currData){
	return (dispatch) => {
        console.log("currData length => "+currData.length);
		dispatch({type: LOAD_MORE, currentData: currData});
	};
}

