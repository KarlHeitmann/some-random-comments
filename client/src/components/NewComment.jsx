import { useState } from "react";
import ph1 from '../images/person_ph_1.jpg'

function NewComment() {
  const [comment, setComment] = useState('')

  const sendComment = (e) => {
    console.log("sendComment", comment)
  }
  return (
    <div className="is-flex is-align-items-center">
      <figure className="image is-64x64">
        <img src={ph1} alt="person 1" className="is-rounded" />
      </figure>
      <input
        className="input is-primary mx-4"
        id="comment-content"
        name="comment"
        value={comment}
        onChange={e => setComment(e.target.value)}
        type="text"
        placeholder="What are your thoughts?"
        />
      <div className="buttons">
        <button
          onClick={sendComment}
          className="button is-primary" id="create-comment"
          >Comment</button>
      </div>
    </div>
  )
}

export default NewComment;