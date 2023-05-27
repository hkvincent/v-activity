import { useRef, useState } from 'react'
import classes from './new-comment.module.css'

function NewComment(props) {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function sendCommentHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredName = nameInputRef.current?.value;
    const enteredComment = commentInputRef.current?.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@') ||
      !enteredName ||
      enteredName.trim() === '' ||
      !enteredComment ||
      enteredComment.trim() === ''
    ) {
      setIsInvalid(true);
      return;
    }

    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    });
    formRef.current?.reset();
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler} ref={formRef}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor='comment'>Comment</label>
        <textarea id='comment' rows={5} ref={commentInputRef}></textarea>
      </div>
      {isInvalid && <p>Please write your comment before submit</p>}
      <button>Submit</button>
    </form>
  );
}

export default NewComment;
