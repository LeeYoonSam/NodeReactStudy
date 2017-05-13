import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar , Nav , NavItem , MenuItem ,NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
 
const Menu = (props) => {
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
                    <LinkContainer to="/posts">
                        <NavItem>Posts</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/mypage">
                        <NavItem>Mypage</NavItem>
                    </LinkContainer>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem>Another action</MenuItem>
                        <MenuItem>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
 
export default Menu;