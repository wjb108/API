//Mapbox Static Images API
//API Documentation
// https://docs.mapbox.com/api/maps/static-images/
const basePath = "https://api.mapbox.com/styles/v1/mapbox/light-v10/static"
const DefaultPublicToken = "pk.eyJ1IjoicGl0YXlha2lubyIsImEiOiJja2x6Y3o3ZjQwYXNnMm9xc3d4OXZ2bDNyIn0.VGWn1lnzEKtxRkSatphaLg"
let longitude = "";
let latitude = "";
const markerIcon =`pin-s-l+000`
let zoom = 15;
let rotateMap = 0; // optional parameter
let width = 300;
let height = 200;

// Mapbox Geocoding API
//API Documentation
// https://docs.mapbox.com/api/search/geocoding/

const basePathGeo = "https://api.mapbox.com/geocoding/v5/mapbox.places"
const GaProjectToken = "pk.eyJ1IjoicGl0YXlha2lubyIsImEiOiJja2x6dWU0MDUwMmJvMnZtOWFmazd3ZjFuIn0.kB1VDUkeZtQPBGc1lVtehQ"
let searchAddress = ""

//Selectors
const divContainer = document.querySelector('.div-container')
const input = document.querySelector('input#address')
const btn = document.querySelector('button#address')

//Event Listeners
input.addEventListener('keypress', getText)
btn.addEventListener('click', runGetCoordinates)

function formatAddress(address) {
  const userInputtedString = address
  formatSpacesInString = address.replaceAll(" ", "%20")
  formatCommasInString = formatSpacesInString.replaceAll(",", "%2C")
  searchAddress = formatCommasInString
}

function getText(event) {
  // console.dir(event)
  input.textContent = event.target.value
  // console.log(input.textContent = event.target.value)
  // console.log(event.target.value)
  // console.log(input.textContent);
  formatAddress(event.target.value)
}

function runGetCoordinates(event) {
  event.preventDefault();
  console.log(searchAddress);
  getCoordinates()
}

function renderImage(staticImage) {
  const staticImageHTML = document.createElement('img')
  staticImageHTML.src = staticImage.config.url
  divContainer.appendChild(staticImageHTML)
}

function removeImage() {
  while (divContainer.firstChild) {
    divContainer.removeChild(divContainer.firstChild)
  }
}

async function getStaticImage(LongCoord, LatCoord) {
  const urlImage = `${basePath}/${markerIcon}(${LongCoord},${LatCoord})/${LongCoord},${LatCoord},${zoom},${rotateMap}/${width}x${height}?access_token=${DefaultPublicToken}`
  // console.log(url);
  try {
    const apiCall = await axios.get(urlImage)
    // console.log(apiCall);
    removeImage()
    renderImage(apiCall)
  } catch (error) {
    console.log(error.message);
  }
}

function stripGeoCoordinates(coordinates) {
  let longitude = coordinates[0];
  // console.log(longitude);
  let latitude = coordinates[1];
  // console.log(latitude);
  getStaticImage(longitude,latitude)
}

async function getCoordinates() {
  const urlCoordinates = `${basePathGeo}/${searchAddress}.json?&access_token=${GaProjectToken}`
  console.log(urlCoordinates);
  try {
    const apiGeoCall = await axios.get(urlCoordinates)
    const apiGeoCallArray = apiGeoCall.data.features[0].center
    console.log(apiGeoCallArray);
    stripGeoCoordinates(apiGeoCallArray)
  } catch (error) {
    console.log(error.message);
  }
}

// getCoordinates()


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