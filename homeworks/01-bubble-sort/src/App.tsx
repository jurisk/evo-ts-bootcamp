import React from 'react';
import './App.css';
import {bubbleSortStep, isFinished, newSortingState, SortingState} from "./sorting";
import {SortStatus, SortVisualization} from "./SortVisualization";

interface AppProps {
    count: number
    height: number
}

interface AppState {
    state: SortingState
    interval: null | ReturnType<typeof setTimeout>
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = this.newState()
    }

    tick() {
        const newState = bubbleSortStep(this.state.state)

        this.setState({
            state: newState,
            interval: this.state.interval,
        })
    }

    start() {
        const interval = setInterval(() => this.tick(),100);

        this.setState({
            state: this.state.state,
            interval: interval,
        });
    }

    pause() {
        if (this.state.interval) {
            clearInterval(this.state.interval);
        }

        this.setState({
            state: this.state.state,
            interval: null
        });
    }

    newState() {
        return {
            state: newSortingState(this.props.count, this.props.height),
            interval: null,
        }
    }

    recreate() {
        this.pause()
        this.setState(this.newState())
    }

    render() {
        const status = isFinished(this.state.state)
            ? SortStatus.Finished
            : (this.state.interval ? SortStatus.Running : SortStatus.Paused)

        return (
            this.state
                ? <SortVisualization
                    state={this.state.state}
                    status={status}
                    height={this.props.height}
                    newSet={() => this.recreate()}
                    start={() => this.start()}
                    pause={() => this.pause()}
                />
                : null
        );
    }
}

export default App;
