import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import { PhotosList } from '../photos/photos';
import {Controls} from "../controls/controls";
import {store} from "../../store";

export function App() {
  return (
      <Provider store={store}>
        <Controls/>
        <PhotosList/>
      </Provider>
  );
}
