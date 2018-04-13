import React from 'react';

export default class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            time: new Date().toLocaleString()
        };
    }
    componentDidMount(){
        this.intervalID = setInterval(
            () => this.tick(),
            500
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        this.setState({
            time: new Date().toLocaleString()
        });
    }

    render() {
        return (
            <i>
                {this.state.time}.
            </i>
        );
    }
}