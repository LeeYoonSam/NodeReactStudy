import React, { Component } from 'react';
import { Navbar , Nav , NavItem , MenuItem ,NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';

class Header extends Component {

    constructor() {
        super();
        this.state = { 
            isLogin : false
        };
    }
    
    componentDidMount() {
        axios.get('/v1/accounts/status', {
        }).then( (res) => {
            this.setState({
                isLogin: res.data.isLogin
            });
        }).catch( (error) => {
            console.log(error);
        });
    }

    render() {
        const Login = () => {
            return (
                <LinkContainer to="/accounts/login">
                    <NavItem>LOGIN</NavItem>
                </LinkContainer>
            );
        };
        const Join = () => {
            return (
                <LinkContainer to="/accounts/join">
                    <NavItem>JOIN</NavItem>
                </LinkContainer>
            );
        };
        const Logout = () => {
            return (
                <li>
                    <a href="/v1/accounts/logout">LOGOUT</a>
                </li>
            );
        };

        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Nodejs</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/">
                            <NavItem>Home</NavItem>
                        </LinkContainer>
                        
                        <LinkContainer to="/posts">
                            <NavItem>Posts</NavItem>
                        </LinkContainer>

                        <li><a href="/chat">Chat</a></li>

                        {
                            this.state.isLogin ?
                                <Logout /> : <Join />
                        }
                        
                        { this.state.isLogin ? "" : <Login /> }

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default Header;