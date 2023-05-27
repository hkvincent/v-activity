'use client';
import { MutableRefObject, useRef } from 'react'
import classes from './newsletter-registration.module.css'

function NewsletterRegistration() {
  const emailInputRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null)

  function registrationHandler(event: { preventDefault: () => void }) {
    event.preventDefault()
    const enteredEmail = emailInputRef.current?.value
    fetch('/api/newsLetter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) =>alert(data.message))
  }

  return (
    <section className={classes.newsletter}>
      <h2>New User</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Email'
            aria-label='Email'
            ref={emailInputRef}
          />
          <button>Submit</button>
        </div>
      </form>
    </section>
  )
}

export default NewsletterRegistration
