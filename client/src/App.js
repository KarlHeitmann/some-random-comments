import './css/bulma.min.css';
import './css/style.css';
import NewComment from "./components/NewComment";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Comments from './components/Comments';

function App() {
  const [comments, setComments] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3005').then(function(response) {
      const {comments} = response.data
      setComments(comments)
      // setComments(response)
    })
  }, [])
  // TODO: Use robots api to fake avatar
  return (
    <section className="container px-2">
      <h1 className="is-size-1">Discussion</h1>
      <NewComment />
      <hr />
      <Comments comments={comments}/>
    </section>
  );
}

export default App;
