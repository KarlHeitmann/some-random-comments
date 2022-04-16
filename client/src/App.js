import './css/bulma.min.css';
import './css/style.css';
import NewComment from "./components/NewComment";
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [comments, setComments] = useState([])
  useEffect(() => {
    console.log("It works!")
    axios.get('http://localhost:3005').then(function(response) {
      console.log(response)
      console.log("data", response.data)
      const {comments} = response.data
      console.log("comments asddsa", comments)
      setComments(comments)
      // setComments(response)
    })
  }, [])
  console.log("comments", comments)
  return (
    <section className="container px-2">
      <h1 className="is-size-1">Discussion</h1>
      <NewComment />
      <hr />
      {
        comments.map(comment => {
          return(
            <h1>{comment.content}</h1>
          )
        })
      }
    </section>
  );
}

export default App;
