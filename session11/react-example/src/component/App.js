import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../routes/Home';
import Posts from '../routes/Posts';
import Menu from './Menu';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Menu />
                    <Route exact path="/" component={Home} />
                    <Route path="/posts" component={Posts} />
                </div>
                
            </Router>
        );
    }
}
export default App;