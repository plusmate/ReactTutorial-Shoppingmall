import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { HashRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

let cartData = [];

function reducer(state = cartData, changingState) {
  let stateArray = [...state];
  /*수정된 state*/
  if (changingState.type === "addCart") {
    let found = state.findIndex(a => {
      return a.name === changingState.addToCart.name;
    });
    if (found >= 0) {
      stateArray[found].quan++;
      return stateArray;
    } else {
      stateArray.push(changingState.addToCart);
      return stateArray;
    }
  } else if (changingState.type === "addQuan") {
    var searchIdIndex = stateArray.findIndex(
      a => a.id === changingState.goodsId
    );
    if(stateArray[searchIdIndex].quan >= stateArray[searchIdIndex].stock){
      alert('수량이 너무 많습니다.');
      stateArray[searchIdIndex].quan = stateArray[searchIdIndex].quan
    } else{
      stateArray[searchIdIndex].quan++;
    return stateArray;
    }
  } else if (changingState.type === "decreaseQuan") {
    var searchIdIndex = stateArray.findIndex(
      a => a.id === changingState.goodsId
    );
    stateArray[searchIdIndex].quan--;
    if (stateArray[searchIdIndex].quan <= 0) {
      stateArray[searchIdIndex].quan = 1;
      alert("최소 1개 이상 주문 가능합니다.");
    }
    return stateArray;
  } else if (changingState.type === "deleteCart") {
    var searchIdIndex = stateArray.findIndex(
      a => a.id === changingState.goodsId
    );
    stateArray.splice(searchIdIndex, 1);
    return stateArray;
  } else {
    /*기본 state*/
    return state;
  }
}

let alertData = true;

function reducer2(state = alertData, changingState) {
  if (changingState.type === "disableAlert") {
    state = false;
  } else if (changingState.type === "undisableAlert") {
    state = true;
  }
  return state;
}

let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
