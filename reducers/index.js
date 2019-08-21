import { combineReducers } from 'redux';

import { SEARCH_RESULT,
	ADD_TO_CART,
	ADJUST_QUANTITY,
	LOAD_MORE
		} from "../actions/" //Import the actions types constant we defined in our actions

		let dataState = { data: [], currViewData: [], loading:true, resultCount: 0 };
		let cartState = { data: [], totalPrice: 0};
		var dotProp = require('dot-prop-immutable');

		const dataReducer = (state = dataState, action) => {
			switch (action.type) {
				case SEARCH_RESULT:
					if(action.countResult == 0){
						console.log("no result");
						state = Object.assign({}, state, { data: action.data, currViewData: action.data, loading:false, resultCount: action.countResult });
					} else {
						state = Object.assign({}, state, { data: action.data, currViewData: action.data.slice(0,25) ,loading:false, resultCount: action.countResult });
					}
					console.log("curreVIew => "+JSON.stringify(state.currViewData));
				return state;
				case LOAD_MORE:
					state = Object.assign({}, state, { data: state.data, currViewData: action.currentData.concat( state.data.slice(action.currentData.length,action.currentData.length+25)) ,loading:false, resultCount: action.countResult });
				return state;
				default:
				return state;
			}
		};

		const cartReducer = (state = cartState, action) => {
			switch (action.type) {
				case ADD_TO_CART:
				let totalPriceCart = 0;
				let checkforDuplicate = state.data.some(function (a){
					if(a.sno === action.data.sno && a.cid === action.data.cid){
						return true;
					}
				});

				console.log("check => "+checkforDuplicate);
				if(checkforDuplicate){
					
					for(let v=0;v<state.data.length;v++){
						if(state.data[v].sno === action.data.sno && state.data[v].cid === action.data.cid){
							state = dotProp.set(state, `data.${v}.quantity`, state.data[v].quantity+1);
							console.log(JSON.stringify(state));
							break;
						}
					}
					for(let t=0;t<state.data.length;t++){
						totalPriceCart = totalPriceCart + (state.data[t].price*state.data[t].quantity);
					}
					return {data: state.data, totalPrice: totalPriceCart};
				}

				let cloneArr = state.data.concat(action.data);
                for(let i in cloneArr){
                    totalPriceCart = totalPriceCart+(cloneArr[i].price*cloneArr[i].quantity);
                }
				return {...state, data : cloneArr, totalPrice: totalPriceCart};

				case ADJUST_QUANTITY:
					let updateTotalCartPrice = 0;
					if(action.data.quantity == 0){
						console.log("quantity = 0");
						for(let v=0;v<state.data.length;v++){
							if(state.data[v].sno === action.data.sno && state.data[v].cid === action.data.cid){
								state = dotProp.delete(state, `data.${v}`);
								console.log(JSON.stringify(state));
								break;
							}
						}
					} else {
						for(let v=0;v<state.data.length;v++){
							if(state.data[v].sno === action.data.sno && state.data[v].cid === action.data.cid){
								state = dotProp.set(state, `data.${v}.quantity`, action.data.quantity);
								console.log(JSON.stringify(state));
								break;
							}
						}
					}
					
					for(let t=0;t<state.data.length;t++){
						updateTotalCartPrice = updateTotalCartPrice + (state.data[t].price*state.data[t].quantity);
					}
					return {data: state.data, totalPrice: updateTotalCartPrice};
				default:
				return state;
			}
		};

const rootReducer = combineReducers({
	dataReducer,
	cartReducer,
})

export default rootReducer;