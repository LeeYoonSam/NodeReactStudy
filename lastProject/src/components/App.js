import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../routes/Home';
import Posts from '../routes/Posts';
import Join from '../routes/Join';
import Login from '../routes/Login';
import NotMatch from './NotMatch';
import Header from './Header';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/posts" component={Posts} />
                        <Route path="/accounts/join" component={Join} />
                        <Route path="/accounts/login" component={Login} />
                        <Route component={NotMatch} />
                    </Switch>
                    
                </div>
            </Router>
        );
    }
}
export default App;