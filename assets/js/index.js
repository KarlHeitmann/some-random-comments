const requestComments = async () => {
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

const generateRowHtml = ({content, avatar}) => {
  return `
    <div class="columns">
      <figure class="image is-64x64 column is-1">
        <img src="./assets/images/${avatar}.jpg" alt="person 1" class="is-rounded">
      </figure>
      <p>${content}</p>
    </div>
    `
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log("Hello World");
  const { comments } = await requestComments()
  console.table(comments)
  comments.forEach(comment => {
    const row = generateRowHtml(comment)
    document.querySelector('#comments').innerHTML += row
  });
  // console.log(comments)
  console.log("fin")
  document.querySelector('#comments')
})