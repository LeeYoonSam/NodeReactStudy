import React, { Component } from 'react';
import axios from 'axios';
import getDate from '../libs/getDate';
import PostDetail from '../components/PostDetail';
import { Route, Link } from 'react-router-dom';

class Posts extends Component {

    constructor() {
        super();

        this.state = {
            posts : []
        };

        this.removePost = this.removePost.bind(this);
    }

    componentDidMount() {
        axios.get('/v1/posts/list', {
        }).then( (res) => {

            this.setState({
                posts: res.data.posts
            });

        }).catch( (error) => {
            console.log(error);
        });
    }

    removePost(event) {
        // href 태그로 바로 넘어가지 않음 / 다음이벤트 블럭
        event.preventDefault();

        let url = event.target.href;
        if(confirm('삭제하시겠습니까?')) {
            document.location.href = url;
        }
    }

    render() {
        return (
            <div>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>작성일</th>
                            <th>삭제</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.posts.map( (post, key) => {
                            var created_at = getDate(post.created_at);
                            return(
                                <tr key={key}>
                                    <td>
                                        {/* 서브 라우팅 링크*/}
                                        <Link to={`/posts/${post.id}`}>
                                            {post.title}
                                        </Link>
                                    </td>
                                    <td>{`${created_at.year}-${created_at.month}-${created_at.date}`}</td>
                                    <td>
                                        <a href={`/v1/posts/delete/${post.id}`}
                                            className="btn btn-danger"
                                            onClick={ this.removePost }>삭제</a>
                                    </td>    
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <Link to="/write" className="btn btn-primary">글작성하기</Link>
                
                {/* 서브 라우팅 */}
                <Route path='/posts/:id' component={PostDetail} />
            </div>
        );
    }
}

export default Posts;