import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PostList from '../component/PostList';

const Posts = (props) => {
    return (
        <div>
            포스트
            <Link to="/posts/1">1번째 포스트</Link>
            <Link to="/posts/2">2번째 포스트</Link>
            <Link to="/posts/3">3번째 포스트</Link>

            <Route path="/posts/:postId" component={PostList} />
        </div>    
    );
}

export default Posts;