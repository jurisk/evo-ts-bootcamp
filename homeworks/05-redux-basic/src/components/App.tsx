import React from 'react';
import {Counter} from "./counter/Counter";
import Balance from "./balance/Balance";
import {store} from "../store";
import {Provider} from "react-redux";

export function App() {
  return (
      <Provider store={store}>
        <Balance/>
        <Counter/>
      </Provider>
  );
}
