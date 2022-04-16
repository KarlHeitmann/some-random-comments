import { useState } from "react";
import ph1 from './images/person_ph_1.jpg'
import './css/bulma.min.css';
import './css/style.css';

function App() {
  const [comment, setComment] = useState('')

  const sendComment = (e) => {
    console.log("sendComment", comment)
  }
  return (
    <section className="container px-2">
      <h1 className="is-size-1">Discussion</h1>
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
      <hr />
    </section>
  );
}

export default App;
