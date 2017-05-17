import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import getDate from '../libs/getDate';

class PostDetail extends Component {
    constructor() {
        super();
        this.state = { 
            post : []
        };

        this.historyBack = this.historyBack.bind(this);
    }

    componentDidMount() {
        axios.get(`/v1/posts/detail/${this.props.match.params.id}`, {
        }).then( (res) => {
            this.setState({
                post: res.data.post
            });
        }).catch( (error) => {
            console.log(error);
        });
    }

    historyBack(){
        this.props.history.push('/posts');
    }
    
    render(){
        let created_at = getDate(this.state.post.created_at); 
        return (
            <Modal show={true} onHide={ this.historyBack }>
                <Modal.Header>
                    <Modal.Title>
                        {this.state.post.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        작성일 : 
                        {` ${created_at.year}-${created_at.month}-${created_at.date}`}
                    </div>
                    <img src={`/uploads/${this.state.post.thumbnail}`} alt=""/>
                    <div>{this.state.post.content}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={ this.historyBack }>Close</Button>
                <Button bsStyle="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default PostDetail;


