import React from 'react';

// 포스트안에서 서브라우팅을 해보기 위한예제
const PostList = (props) => {
    return (
        <div>{ props.match.params.postId }번째 포스트</div>
    );
}
export default PostList;