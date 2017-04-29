import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {

    constructor() {
        super();

        this.state = {
            value: "state value"
        };
    }

    myClick() {
        alert('click test');
    }

    render() {
        return (
            <div onClick={ this.myClick }>{ this.state.value }</div>
        );
    }
}

Header.PropTypes = {
    title: PropTypes.string.isRequired
};

export default Header;