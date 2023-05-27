'use client';
import { useEffect, useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'

function Comments(props: { eventId: any; }) {
  const { eventId } = props

  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<any>([])

  useEffect(() => {
    if (showComments && typeof window !== 'undefined') {
      fetch('/api/comments/' + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments)
        })
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  function addCommentHandler(commentData: any) {

    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        setComments((prevStatus: any) => [data.comment, ...prevStatus])
      })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'HIDE' : 'SHOW'}Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  )
}

export default Comments
