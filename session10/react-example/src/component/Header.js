import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div>
                내용입력 : <input type="text" onChange={this.props.changeValue} name="" />
            </div>
        );
    }
}
export default Header;