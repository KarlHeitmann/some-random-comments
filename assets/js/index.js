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
  const r = await generateComment()
  console.log(r)
  console.log("fin")
  document.querySelector('#comments')
})