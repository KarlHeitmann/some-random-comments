const requestComments = async () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin':'*'
    }
  };
  
  return fetch("http://localhost:3000/comments", requestOptions)
    .then(response => response.json())
}

function timeSince(timeStamp) {
  // origin: https://gist.github.com/patrickmooney/7060259d11ac6281ce1c
  var now = new Date(),
      secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  if(secondsPast < 60){
      return parseInt(secondsPast) + 's';
  }
  if(secondsPast < 3600){
      return parseInt(secondsPast/60) + 'm';
  }
  if(secondsPast <= 86400){
      return parseInt(secondsPast/3600) + 'h';
  }
  if(secondsPast > 86400){
      day = timeStamp.getDate();
      month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
      year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
      return day + " " + month + year;
  }
}

const generateRowHtml = ({content, avatar, date, key, votes}) => {
  console.log(date)
  // debugger
  return `
    <div class="columns px-2">
      <figure class="image is-64x64 column is-1">
        <img src="./assets/images/${avatar}.jpg" alt="person 1" class="is-rounded">
      </figure>
      <div class="mx-5">
        <h5>
          <strong>${avatar.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</strong>
          <span>
            ·
            ${timeSince(new Date(date))}
          </span>
        </h5>
        <p>${content}</p>
        <small>
          <strong>&#x2303;
            <span
              data-key="${key}"
              id="upvote-${key}">
              ${votes} - Upvote</span>
            <span
              data-key="${key}"
              id="reply-${key}"
              >Reply</span>
          </strong>
        </small>
      </div>
    </div>
    `
}

function upvoteClick(e) {
  const {key} = e.target.dataset
  console.log("---- upvoteClick")
  console.log(e)
  console.log("upvoteClick comment_key: ", key)
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  return fetch(`http://localhost:3000/upvote?key=${key}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      document.querySelector(`#upvote-${key}`).innerHTML = `${result.votes} - Upvote`
    })
    .catch(error => console.log('error', error));
}

function replyClick(e) {
  const {key} = e.target.dataset
  console.log("REPLY click")
  console.log(e)
  console.log("upvoteClick comment_key: ", key)
  document.querySelector('#modalContainer').classList.add('is-active')
}

function closeModal() {
  console.log("click")
  document.querySelector('#modalContainer').classList.remove('is-active')
}

document.addEventListener('DOMContentLoaded', async () => {
  const { comments } = await requestComments()
  console.table(comments)
  document.querySelector('.modal-close').addEventListener('click', closeModal)
  comments.forEach(comment => {
    const row = generateRowHtml(comment)
    document.querySelector('#comments').innerHTML += row
    setTimeout(() => { // XXX // BUG // HACK: By some strange reason, it is not binding the eventListener click without this setTimeout. It appears that when DOMContentLoaded is fired, attaching events to these recently added events are not attached. Maybe I should wait for another event to bind these event listener, or maybe I should use 'document.createElement' instead of 'document.innerHTML'
      const strUpvote = `#upvote-${comment.key}`
      const el = document.querySelector(strUpvote)
      el.addEventListener('click', upvoteClick)
      document.querySelector(`#reply-${comment.key}`).addEventListener('click', replyClick)
    }, 1000);
  });
  console.log("fin")
})
