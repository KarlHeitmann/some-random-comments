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

const generateRowHtml = ({content, avatar, date, key}) => {
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
        <small><strong>&#x2303; <span id="upvote-${key}">Upvote</span> <span id="reply-${key}">Reply</span></strong></small>
      </div>
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
})
