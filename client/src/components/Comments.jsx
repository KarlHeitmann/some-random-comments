import Comment from "./Comment";

function Comments({comments, setComments, appendComment}) {
  console.log("comments child: ", comments)
  // console.log("config", config)
  // console.log("fetchChildren", fetchChildren("625c7050177bd4efb9c34697"))
  const setCS = (c, i) => {
    comments[i].votes = c.votes
    setComments([...comments])
  }
  return (
    <>
      {
        comments.map((comment, i) => {
          return(
            <Comment
              id={comment._id}
              i={i}
              setCS={setCS}
              appendComment={appendComment}
              comment={comment}
            />
          )
        })
      }
    </>
  )
}

export default Comments;