import React, { Component } from 'react';
import { Navbar , Nav , NavItem , MenuItem ,NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
    render() {
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

                        <LinkContainer to="/accounts/join">
                            <NavItem>Join</NavItem>
                        </LinkContainer>

                        <LinkContainer to="/accounts/login">
                            <NavItem>Login</NavItem>
                        </LinkContainer>

                        <LinkContainer to="/chat">
                            <NavItem>Chat</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default Header;