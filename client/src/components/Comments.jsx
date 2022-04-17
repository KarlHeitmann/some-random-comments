import axios from "axios";
import config from "../config.json"

function Comments({comments}) {
  console.log("comments child: ", comments)
  console.log("config", config)
  const onReply = async (e) => {
    console.log(e)
    console.log("onReply");
    // axios.get('http://localhost')
    axios.post(config['domain'] + '/reply', {
      content: "dummy"
    }).then(function(response) {
      const {comments} = response
      console.log("comments", comments)
    })
  }
  const onUpVote = (e) => {
    console.log(e)
    console.log("onUpVote");
  }
  return (
    <>
      <h1>COMMENTS - COMMENTS</h1>
      {
        comments.map(comment => {
          return(
            <div
              key={comment.key}
              className="columns px-2">
              <figure className="image is-64x64 column is-1">
                <img
                  src={`https://robohash.org/${comment.key}.png`}
                  className="is-rounded"
                  alt="robohash avatar" />
              </figure>
              <div className="mx-5">
                <p>{comment.content.replace('</p>', '').replace('<p>', '')}</p>
                <small>
                  <strong>&#x2303;
                    <span
                      onClick={onUpVote}>{comment.votes} - Upvote</span>
                    <span
                      onClick={onReply}
                    >Reply</span>
                  </strong>
                </small>
              </div>
            </div>
          )
        })
      }
      <h1>========================</h1>
    </>
  )
}

export default Comments;