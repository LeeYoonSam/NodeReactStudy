import React, { Component } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

class App extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="container">
                <Header title="제목 설정"/>
                <Content />
                <Footer />
                App
            </div>
        );
    }
}
export default App;