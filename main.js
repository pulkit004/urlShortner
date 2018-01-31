//Include data for accessing Google APIs.
const apiKey = 'AIzaSyA20Yf99DGhvyfpJ1pTN21ZcxzILBnFC5w';
const url = 'https://www.googleapis.com/urlshortener/v1/url';


//Page Elements

const $inputField = $('#input');
const $expandButton = $('#btnExpand');
const $shortenButton = $('#btnShorten');
const $responseField = $('#responseField');

//AJAX Function

async function expandUrl() {
  const urlToExpand = url + '?shortUrl=' + $inputField.val() + '&key=' + apiKey;
  try{
    let response = await fetch(urlToExpand);
    if(response.ok){
      let jsonResponse = await response.json();
      $responseField.append('<p>Your expanded URL is: </p><p>' + jsonResponse.longUrl + '</p>');
      return jsonResponse;
    }
    throw new Error('Request Failed!');
  }
  catch(error){
    console.log(error);
  }
}

async function shortenUrl() {
  const urlToShorten = $inputField.val();
  const urlWithKey = url + '?key=' + apiKey;
  try{
    let response = await fetch(urlWithKey, {
      method: 'POST',
      body: JSON.stringify({longUrl: urlToShorten}),
      headers: {
        'Content-type': 'application/json'
      } 
    });
    if(response.ok){
      let jsonResponse  = await response.json();
      $responseField.append('<p>Your shortened URL is: </p><p>' + jsonResponse.id + '</p>');
      return jsonResponse;
    }
  }
  catch(error){
    console.log(error);
  }
}


function expand() {

  $responseField.empty();
  expandUrl();
  return false;
  
}

function shorten() {
  $responseField.empty();
  shortenUrl();
  return false;
}

$expandButton.click(expand);
$shortenButton.click(shorten);