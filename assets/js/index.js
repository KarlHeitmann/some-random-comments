const generateComment = async () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin':'*'
    }
  };
  
  return fetch("http://localhost:3000/sample", requestOptions)
    .then(response => response.json())
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log("Hello World");
  const { comments } = await generateComment()
  console.table(comments)
  comments.forEach(comment => {
    /*
    // console.log(comment)
    // const row = '<div class="column">' +
    //   `<figure class="image is-64x64"><img src="./assets/images/${comment.avatar}.jpg" class="is-rounded"></figure>` +
    //   `${comment.content}` +
    // '</div>'

    const row = '' +
      `<figure class="image is-64x64"><img src="./assets/images/${comment.avatar}.jpg" class="is-rounded"></figure>` +
      `${comment.content}` +
    '</div>'

    // const row = '' +
    //   `<div><figure class=" image is-64x64"><img src="./assets/images/${comment.avatar}.jpg" class="is-rounded"></figure></div class="column is-one-fifth">` +
    //   `<p class="column is-four-fifth">${comment.content}</p>`
    // ''
    console.log(row)
    */
  //   const row = `<div class="columns">    <figure class="image is-64x64">
  //   <img src="./assets/images/${comment.avatar}.jpg" alt="person 1" class="is-rounded">
  // </figure>
  // <p>${comment.content}</p></div>`
    const row = `<div class="columns">
      <figure class="image is-64x64 column is-1">
      <img src="./assets/images/${comment.avatar}.jpg" alt="person 1" class="is-rounded">
      </figure>
      <p>${comment.content}</p></div>
    `
    document.querySelector('#comments').innerHTML += row
  });
  // console.log(comments)
  console.log("fin")
  document.querySelector('#comments')
})