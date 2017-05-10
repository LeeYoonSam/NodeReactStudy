import React, { Component } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

class App extends Component {
    constructor() {
        super();

        this.state = {
            value: ""
        };

        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(event) {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        return (
            <div>
                <Header changeValue={ this.changeValue }/>
                <Content />
                <Footer value={this.state.value} />
            </div>
        );
    }
}
export default App;