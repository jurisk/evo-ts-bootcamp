import React from 'react';
import './App.css';
import {randomArray} from "./util";

function App() {
    const count = 20
    const array = randomArray(20, 200)

    return (
        <main className="app"><h1>Bubble sort 🛁</h1>
            <div className="array" style={{height: (count * 10) + "px"}}>
                {
                    array.map((x) => (
                        <div className="element" style={{height: x + "px"}}/>
                    ))
                }
            </div>
            <div className="buttons">
                <button>New set</button>
                <button>Start or Pause</button>
            </div>
            <pre>Not solved</pre>
        </main>
    );
}

export default App;
