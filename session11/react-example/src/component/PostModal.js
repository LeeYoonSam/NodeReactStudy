import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class PostModal extends Component {

    constructor(props) {
        super(props);
        this.historyBack = this.historyBack.bind(this);
    }

    historyBack() {
        this.props.history.push('/posts');
    }

    render() {
        return (
            <Modal show={true} onHide={ this.historyBack }>
                <Modal.Header>
                    <Modal.Title>
                        {this.props.match.params.id}
                    </Modal.Title>
                </Modal.Header>
 
                <Modal.Body>
                One fine body...
                </Modal.Body>
 
                <Modal.Footer>
                    <Button onClick={ this.historyBack }>Close</Button>
                <Button bsStyle="primary">Save changes</Button>
                </Modal.Footer>
 
            </Modal>
        );
    }
}
export default PostModal;