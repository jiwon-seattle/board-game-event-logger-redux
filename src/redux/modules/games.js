import data from "MOCK_DATA.json"; // getting local data

//actions

const SET_GAMES = "SET_GAMES";

//action creators

function setGames(items){
  return {
    type: SET_GAMES,
    items
  }
}

//API Actions & data fetch 
//In real project, server will be fetched too

function getGames () {
  return (dispatch, getState) => {
    fetch("MOCK_DATA.json", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response =>data) //fetch local data
    .then(json=>dispatch(setGames(json)))
    .catch(err => console.log(err));
  };
}

//Initial State

const initialState = {};

//Reducer

function reducer (state = initialState, action) {
  switch (action.type){
    case SET_GAMES:
      return applySetGames(state, action);
    default:
      return state;
  }
}

//Reducer Functions

function applySetGames(state, action){
  const { items } = action;
  return {
    ...state,
    items,
  } 
}

//Export

const actionCreators = {
  getGames
}

export {actionCreators};

export default reducer;