import axios from 'axios';
import './css/bulma.min.css';
import './css/style.css';
import NewComment from "./components/NewComment";
import { useEffect, useState } from 'react';
import Comments from './components/Comments';
import config from "./config.json"
// small utilities that we need
// handle json messages
// function formatMessage = (data) => {
const formatMessage = (data) => {
  try {
    const parsed = JSON.parse(data);
    return parsed;
  } catch (err) {
    return data;
  }
};
// get epoch timestamp
function getTimestamp() {
  return new Date().getTime();
}


function App({
  retry: defaultRetry = 3,
  retryInterval = 1500
}) {
  const [comments, setComments] = useState([])
  const [readyState, setReadyState] = useState(false);
  const [send, setSend] = useState(() => () => undefined);
  const [data, setData] = useState();
  const [retry, setRetry] = useState(defaultRetry);
  useEffect(() => {
    axios.get(config['domain']).then(function(response) {
      const {comments} = response.data
      setComments(comments)
      // setComments(response)
    })
    const socketUrl = 'ws://localhost:3005/?key=1'
    const ws = new WebSocket(socketUrl);
    ws.onopen = () => {
      console.log('Connected to socket');
      setReadyState(true);

      // function to send messages
      setSend(() => {
        return (data) => {
          try {
            const d = JSON.stringify(data);
            ws.send(d);
            return true;
          } catch (err) {
            return false;
          }
        };
      });

      // receive messages
      ws.onmessage = (event) => {
        const msg = formatMessage(event.data);
        const {comments} = msg
        console.log("msg", comments)
        console.table(comments)
        setComments([...comments])
        setData({ message: msg, timestamp: getTimestamp() });
      };
    };

    // on close we should update connection state
    // and retry connection
    ws.onclose = () => {
      setReadyState(false);
      // retry logic
      if (retry > 0) {
        setTimeout(() => {
          setRetry((retry) => retry - 1);
        }, retryInterval);
      }
    };
     // terminate connection on unmount
    return () => {
      ws.close();
    };
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
