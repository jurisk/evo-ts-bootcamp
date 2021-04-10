import React from 'react';
import './App.css';
import {randomArray} from "./util";
import {bubbleSort} from "./sorting";
import {ord, ordNumber} from "fp-ts/Ord";

interface Element {
    value: number
    id: string
}

function App() {
    const count = 20
    const max = 200

    const array: ReadonlyArray<Element> = randomArray(count, max)
        .map((x, idx) =>
            ({
                value: x,
                id: `element-${idx}`,
            })
        )

    const sortedArray = bubbleSort(array, ord.contramap(ordNumber, (x) => x.value))

    return (
        <main className="app"><h1>Bubble sort 🛁</h1>
            <div className="array" style={{height: (count * 10) + "px"}}>
                {
                    sortedArray.map((x) => (
                        <div className="element" style={{height: x.value + "px"}} key={x.id}/>
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
