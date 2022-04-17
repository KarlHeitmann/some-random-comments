import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config.json"
import { timeSince } from "../utils/index";
import NewComment from "./NewComment";

function Comment({comment, setCS, appendComment, id, i}) {
  const [comments, setComments] = useState([])
  const onReply = async (e) => {
    console.log(e)
    console.log("onReply");
    // axios.get('http://localhost')
    axios.post(config['domain'] + `/reply?id=${id}`, {
      content: "dummy"
    }).then(function(response) {
      const {comments} = response
      console.log("comments", comments)
    })
  }
  const onUpVote = (e) => {
    console.log(e)
    console.log("onUpVote", id);
    axios.post(config['domain'] + `/upvote?id=${id}`)
      .then(function(response) {
        const {comment} = response.data
        console.log("comment", response, comment)
        console.log("i", i)
        setCS(comment, i)
      })
  }

  useEffect(() => {
    console.log("comment init", id)
    if (id != null) {
      fetchChildren(id)
    }
  }, [])
  const fetchChildren = async(id) => {
    const cs = await axios.get(config['domain'] + `?id=${id}`)
    console.log("cs", cs.data.comments)
    setComments([...cs.data.comments])
    return cs.data.comments
  }
  return (
    <div
      className="columns px-2">
      <figure className="image is-64x64 column is-1">
        <img
          src={`https://robohash.org/${comment._id}.png`}
          className="is-rounded"
          alt="robohash avatar" />
      </figure>
      <div className="mx-5">
        <h5>
          <strong>{comment.avatar.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</strong>
          <span>
            {timeSince(new Date(comment.date))}
          </span>
        </h5>
        <p>{comment.content.replace('</p>', '').replace('<p>', '')}</p>
        {
          comments.map(c => {
            return(<div><small>{c.content}</small></div>)
          })
        }
        <small>
          <strong>&#x2303;
            <span
              onClick={(e) => onUpVote(e, comment._id)}>{comment.votes} - Upvote</span>
            <span
              onClick={(e) => onReply(e,  comment._id)}
            >Reply</span>
          </strong>
        </small>
        <NewComment
          appendComment={appendComment}
          parentCommentId={comment._id}
        />
      </div>
    </div>
  )
}

export default Comment