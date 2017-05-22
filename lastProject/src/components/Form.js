import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    constructor() {
        super();

        this.state = {
            title: '',
            content: '',
            thumbnail:'',
            isLogin: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.loginCheck = this.loginCheck.bind(this);
    }

    componentDidMount() {
        axios.get('/v1/accounts/status', {
        }).then( (res) => {
            this.setState({
                isLogin: res.data.isLogin
            }, this.loginCheck);
        }).catch( (error) => {
            console.log(error);
        });
    }

    handleChange(event) {
        let result = {};
        result[event.target.name] = event.target.value;
        this.setState(result);
    }

    handleSubmit(event) {

        event.preventDefault();

        if(!this.state.title) {
            alert("이름을 입력하세요");
            this.refs.titleRef.focus();
            return;
        }

        if(!this.state.content) {
            alert("내용을 입력하세요.");
            this.refs.contentRef.focus();
            return;
        }
    

        // 내장함수 FormData를 사용해서 파라미터 세팅 (IE 10 이하에서는 안된다고 함 / iframe을 사용해서 우회해야함.)
        const formData = new FormData();
        formData.append('thumbnail', this.state.thumbnail);
        formData.append('title', this.state.title);
        formData.append('content', this.state.content);
    
        // 헤더세팅
        const config = {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        };
    
        axios.post('/v1/posts/write', formData, config).then( (res) => {
            alert('작성되었습니다.');
            this.props.history.push('/posts');
        }).catch( (error) => {
            console.log(error);
        });
    }

    handleFile(event) {
        this.setState( {
            thumbnail: event.target.files[0]
        });
    }

    loginCheck() {
        if(!this.state.isLogin) {
            this.props.history.push('/accounts/login');
        }
    }
    
    render() {
        return (
            <form action="" method="post" onSubmit={this.handleSubmit}>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td><input type="text" name="title" ref="titleRef"
                                value={this.state.title} onChange={this.handleChange}
                                className="form-control"  /></td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td><input type="text" name="content" ref="contentRef"
                                value={this.state.content} onChange={this.handleChange}
                                className="form-control" /></td>
                        </tr>
                        <tr>
                            <th>섬네일</th>
                            <td>
                                <input type="file" name="thumbnail" onChange={this.handleFile} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn btn-primary">작성하기</button>
            </form>
        );
    }
}
export default Form;