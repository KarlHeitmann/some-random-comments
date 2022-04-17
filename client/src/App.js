import axios from 'axios';
import './css/bulma.min.css';
import './css/style.css';
import NewComment from "./components/NewComment";
import { useEffect, useState } from 'react';
import Comments from './components/Comments';
import config from "./config.json"

function App() {
  const [comments, setComments] = useState([])
  useEffect(() => {
    axios.get(config['domain']).then(function(response) {
      const {comments} = response.data
      setComments(comments)
      // setComments(response)
    })
  }, [])

  const appendComment = async (comment) => {
    comments.push(comment)
    await setComments([...comments])
  }

  // TODO: Use robots api to fake avatar
  return (
    <section className="container px-2">
      <h1 className="is-size-1">Discussion</h1>
      <NewComment
        appendComment={appendComment}
        parentComment={null}
        />
      <hr />
      <Comments
        appendComment={appendComment}
        setComments={setComments}
        comments={comments}/>
    </section>
  );
}

export default App;
