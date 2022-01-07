import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0)
  const [OpenReplyComments, setOpenReplyComments] = useState(false)
  useEffect(() => {
    let commentNumber = 0

    props.commentLists.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++
      }
    })

    setChildCommentNumber(commentNumber)
  }, [props.commentLists])

  const renderReplyComment = (parentCommentId) =>
    props.commentLists.map((comment, index) => (
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: '80%', marginLeft: '40px' }}>
            <SingleComment
              movieId={props.movieId}
              refreshFunction={props.refreshFunction}
              comment={comment}
              key={index}
            />
            <ReplyComment
              commentLists={props.commentLists}
              refreshFunction={props.refreshFunction}
              movieId={props.movieId}
              parentCommentId={comment._id}
            />
          </div>
        )}
      </React.Fragment>
    ))

  const onHandleChange = () => {
    setOpenReplyComments(!OpenReplyComments)
  }

  return (
    <div>
      {ChildCommentNumber > 0 && (
        <a
          style={{ fontSize: '14px', margin: 0, color: 'gray' }}
          onClick={onHandleChange}
        >
          View {ChildCommentNumber} more comment(s)
        </a>
      )}

      {OpenReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  )
}

export default ReplyComment
