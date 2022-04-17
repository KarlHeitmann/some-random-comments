function Comments({comments}) {
  console.log("comments child: ", comments)
  return (
    <>
      <h1>COMMENTS - COMMENTS</h1>
      {
        comments.map(comment => {
          return(
            <div key={comment.key}>
              <h1>{comment.content}</h1>
            </div>
          )
        })
      }
      <h1>========================</h1>
    </>
  )
}

export default Comments;