// https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-77.0397,38.8974,5,0/300x200?access_token=pk.eyJ1IjoicGl0YXlha2lubyIsImEiOiJja2x6Y3o3ZjQwYXNnMm9xc3d4OXZ2bDNyIn0.VGWn1lnzEKtxRkSatphaLg
// as per
// https://docs.mapbox.com/playground/static/

//Static Image API

const basePath = "https://api.mapbox.com/styles/v1/mapbox/light-v10/static"
const DefaultPublicToken = "pk.eyJ1IjoicGl0YXlha2lubyIsImEiOiJja2x6Y3o3ZjQwYXNnMm9xc3d4OXZ2bDNyIn0.VGWn1lnzEKtxRkSatphaLg"
let longitude = -73.982272;
let latitude = 40.778538;
let zoom = 15;
let rotateMap = 0; // optional parameter
let width = 300;
let height = 200;
// let tiltMap = ; // optional parameter
29.12420795709416, -110.96018299693372
// selector
const divContainer = document.querySelector('.div-container')


function renderImage(staticImage) {
  const staticImageHTML = document.createElement('img')
  staticImageHTML.src = staticImage.config.url
  divContainer.appendChild(staticImageHTML)
  
}

async function getStaticImage() {
  const urlImage = `${basePath}/${longitude},${latitude},${zoom},${rotateMap}/${width}x${height}?access_token=${DefaultPublicToken}`
  // console.log(url);
  try {
    const apiCall = await axios.get(urlImage)
    // console.log(apiCall);
    renderImage(apiCall)
  } catch (error) {
    console.log(error.message);
  }
}
getStaticImage()

// https://api.mapbox.com/{endpoint}?access_token={your_access_token}


//Geocoding API
// https://docs.mapbox.com/api/search/geocoding/

const basePathGeo = "https://api.mapbox.com/geocoding/v5/mapbox.places"
const GaProjectToken = "pk.eyJ1IjoicGl0YXlha2lubyIsImEiOiJja2x6dWU0MDUwMmJvMnZtOWFmazd3ZjFuIn0.kB1VDUkeZtQPBGc1lVtehQ"
let searchAddress = "2073%20broadway%2C%20new%20york%2C%20new%20york%2C%2010023"

// //selectors
// const input = document.querySelector('input')
// const btn = document.querySelector('#address')
// // event listeners
// input.addEventListener('keypress', getText)
// btn.addEventListener('click', addTextToApiUrl)

// function getText(event) {
//   console.dir(event)
// }

// function addTextToApiUrl(event) {
//   event.preventDefault();
//   searchAddress = event.value.toLowerCase()
//   getCoordinates()
  
// }

//pricing page and limits of free
// https://www.mapbox.com/pricing/#search

// search playground
// https://docs.mapbox.com/help/getting-started/geocoding/

//address syntax
// https://api.mapbox.com/geocoding/v5/mapbox.places/103%20constituyentes%20hermosillo%20sonora%20mexico.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1615161939168&autocomplete=true

//135 Park Avenue, Greenwich, Connecticut 06830
// https://api.mapbox.com/geocoding/v5/mapbox.places/hermosilo.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1615161975915&autocomplete=true


//2073 Broadway, New York, New York 10023
// https://api.mapbox.com/geocoding/v5/mapbox.places/2073%20broadway%2C%20new%20york%2C%20new%20york%2C%2010023.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1615165101319&autocomplete=true

//city syntax
// https://api.mapbox.com/geocoding/v5/mapbox.places/hermosilo.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1615161975915&autocomplete=true

// function getCountryInput() {
//   const promptOne = window.prompt("What country are you in?")
//   input.innerText = promptOne
// }
async function getCoordinates() {
  const urlCoordinates = `${basePathGeo}/${searchAddress}.json?&access_token=${GaProjectToken}`
  console.log(urlCoordinates);
  try {
    const apiGeoCall = await axios.get(urlCoordinates)
    const apiGeoCallArray = apiGeoCall.data.features
    console.log(apiGeoCallArray);
  } catch (error) {
    console.log(error.message);
  }
}

getCoordinates()
