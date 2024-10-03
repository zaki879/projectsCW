const options = {
    method: 'GET',
    mode:'cors',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer d7e37134a6d22a78fcf076431c2c1d3ef73c606801b976fed1e2e16359717610'
    }
  };
  
  fetch('https://api.webflow.com/v2/collections/66fd0fe543d4d200a323a9fe/items', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));