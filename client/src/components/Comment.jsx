import axios from "axios";
import config from "../config.json"
import { timeSince } from "../utils/index";
import NewComment from "./NewComment";

function Comment({comment, setCS, appendComment, id, i}) {
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
        // const comment = comments.find(comment => comment.key == key)
        console.log("i", i)
        setCS(comment, i)
        // comments[i].votes = comment.votes
        // setComments([...comments])

      })
  }

  const fetchChildren = async(id) => {
    // axios.get(config['domain'] + `?id=${id}`).then(function(response) {
    //   const {comments} = response.data
    //   console.log("children", comments)
    //   // setComments(comments)
    //   // setComments(response)
    // })
      
    // return []
    const cs = await axios.get(config['domain'] + `?id=${id}`)
    return cs.data.comments
  }
  return (
    <div
      key={comment._id}
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