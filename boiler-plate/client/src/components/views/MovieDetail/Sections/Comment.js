import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

function Comment(props) {
  //   const movieId = props.movieId;
  const user = useSelector((state) => state.user)
  const [commentValue, setcommentValue] = useState('')
  const handleClick = (event) => {
    setcommentValue(event.currentTarget.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const variables = {
      content: commentValue,
      writer: user.userData._id,
      movieId: props.movieId,
    }

    axios.post('/api/comment/saveComment', variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result)
        // MovieDetail의 Comments를 update
        props.refreshFunction(response.data.result)
        setcommentValue('')
      } else {
        alert('댓글을 저장하는데 실패했습니다..!')
      }
    })
  }

  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />

      {/* Comment Lists */}
      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment
                  movieId={props.movieId}
                  refreshFunction={props.refreshFunction}
                  comment={comment}
                  key={index}
                />
                <ReplyComment
                  movieId={props.movieId}
                  refreshFunction={props.refreshFunction}
                  parentCommentId={comment._id}
                  commentLists={props.commentLists}
                />
              </React.Fragment>
            ),
        )}

      {/* Root Comment Form */}

      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleClick}
          value={commentValue}
          placeholder="영화에 대한 댓글을 달아주세요."
        />
        <br />
        <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Comment
