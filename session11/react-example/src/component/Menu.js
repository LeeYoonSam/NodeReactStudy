import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => {
    return (
        <div>
            <Link to="/">홈으로</Link>
            <Link to="/posts">Posts</Link>
        </div>
    );
}

export default Menu;