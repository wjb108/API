//Mapbox Static Images API
//API Documentation
// https://docs.mapbox.com/api/maps/static-images/
const basePath = "https://api.mapbox.com/styles/v1/mapbox/light-v10/static"
mapboxgl.accessToken = 'pk.eyJ1IjoicGl0YXlha2lubyIsImEiOiJja2x6Y3o3ZjQwYXNnMm9xc3d4OXZ2bDNyIn0.VGWn1lnzEKtxRkSatphaLg';
let longitude = "";
let latitude = "";
const markerIcon = `pin-s-marker`
let zoom = 15;
let rotateMap = 0; // optional parameter
let width = 300;
let height = 200;
let countryCodeTwoLetter = ""

// Mapbox Geocoding API
//API Documentation
// https://docs.mapbox.com/api/search/geocoding/

const basePathGeo = "https://api.mapbox.com/geocoding/v5/mapbox.places"
const GaProjectToken = "pk.eyJ1IjoicGl0YXlha2lubyIsImEiOiJja2x6dWU0MDUwMmJvMnZtOWFmazd3ZjFuIn0.kB1VDUkeZtQPBGc1lVtehQ"
let searchAddress = ""
let inputValues = {}

//Selectors
const inputAddress = document.querySelector('input#address')
const btn = document.querySelector('button#address')
const inputStreetNumber = document.querySelector('input#street-number')
const inputZipcode = document.querySelector('input#zipcode')
const inputCity = document.querySelector('input#city')
const inputState = document.querySelector('input#state')
const countryCode = document.querySelector('select#country-two-letters')

//Event Listeners
inputAddress.addEventListener('keyup', getText)
inputStreetNumber.addEventListener('keyup', getText)
inputZipcode.addEventListener('keyup', getText)
inputCity.addEventListener('keyup', getText)
inputState.addEventListener('keyup', getText)
btn.addEventListener('click', runGetCoordinates)

function formatAddress(address) {
  const userInputtedString = address
  formatSpacesInString = address.replaceAll(" ", "%20")
  formatCommasInString = formatSpacesInString.replaceAll(",", "%2C")
  searchAddress = formatCommasInString
}

// how to deal with input that aren't anticipated


function getText(event) {
  inputValues[event.target.id] = event.target.value
  console.dir(inputValues)
  // inputAddress.textContent = event.target.value // don't really need this for it to work
  // console.log(input.textContent = event.target.value)
  // console.log(event.target.value)
  // console.log(input.textContent);
  // formatAddress(event.target.value)
}

function runGetCoordinates(event) {
  event.preventDefault();
  // console.log(`${inputAddress.value} `); could also string interpolate by const variables on rows 24-30 and pass through to formatAddress function
  formatAddress(`${inputValues["street-number"]} ${inputValues["address"]} ${inputValues["city"]} ${inputValues["state"]} ${inputValues["zipcode"]} `)
  console.log(searchAddress);
  getCoordinates()
}

function renderDynamicMap(LongCoordinate, LatCoordinate) {
  var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [LongCoordinate, LatCoordinate], // starting position [lng, lat]
    zoom: 15 // starting zoom
  });
  var marker = new mapboxgl.Marker()
  .setLngLat([LongCoordinate, LatCoordinate])
  .addTo(map);
}



function stripGeoCoordinates(coordinates) {
  let longitude = coordinates[0];
  // console.log(longitude);
  let latitude = coordinates[1];
  // console.log(latitude);
  renderDynamicMap(longitude,latitude)
}

function addToCountryDropdown(country) {
  const newOptionValue = document.createElement('option')
  newOptionValue.value = country
  newOptionValue.innerText = country
  countryCode.appendChild(newOptionValue)
}

async function getIP() {
  const urlIP = "https://get.geojs.io/v1/ip/country.json"
  try {
    const apiIp = await axios.get(urlIP)
    countryCodeTwoLetter = apiIp.data.country
    console.log(countryCodeTwoLetter);
    addToCountryDropdown(countryCodeTwoLetter)
  } catch (error) {
    console.log(error.message);
  }
}
getIP()

function stripCountryInfo(countryLists) {
  countryLists.forEach((country) => {
    const newOptionCountry = document.createElement('option')
    newOptionCountry.value = country.alpha2Code
    newOptionCountry.innerText = country.name
    countryCode.appendChild(newOptionCountry)
  })
}
stripCountryInfo()

async function getCountriesList() {
  const urlCountryList = "https://restcountries.eu/rest/v2/all"
  try {
    const apiCountryList = await axios.get(urlCountryList)
    const apiCountryListArray = apiCountryList.data
    console.log(apiCountryListArray);
    stripCountryInfo(apiCountryListArray)
  } catch (error) {
    console.log(error.message);
  }
}
getCountriesList()

async function getCoordinates() {
  const urlCoordinates = `${basePathGeo}/${searchAddress}.json?&access_token=${GaProjectToken}&country=${countryCodeTwoLetter}`
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



// Bits of Code no longer needed below

// function renderMarker(LongCoordinate, LatCoordinate) {
//   var marker = new mapboxgl.Marker()
//   .setLngLat([LongCoordinate, LatCoordinate])
//   .addTo(map);
// }

// const divContainer = document.querySelector('.div-container')
// const bodyHTML = document.querySelector('body')

// function renderImage(staticImage) {
//   // const mapboxDiv = document.createElement('div')
//   // mapboxDiv.id.add('map')
//   // mapboxDiv.style.add('width')
//   // mapboxDiv.style.add('height')
//   // mapboxDiv.width = 400px
//   // mapboxDiv.height = 300px
//   // bodyHTML.appendChild(mapboxDiv)
//   // console.log(mapboxDiv);

//   const staticImageImg = document.createElement('img')
//   staticImageImg.src = staticImage.config.url
//   divContainer.appendChild(staticImageImg)
// }

// getCoordinates()

// const DefaultPublicToken = "pk.eyJ1IjoicGl0YXlha2lubyIsImEiOiJja2x6Y3o3ZjQwYXNnMm9xc3d4OXZ2bDNyIn0.VGWn1lnzEKtxRkSatphaLg"

// function removeImage() {
//   while (divContainer.firstChild) {
//     divContainer.removeChild(divContainer.firstChild)
//   }
// }

// async function getStaticImage(LongCoord, LatCoord) {
//   const urlImage = `${basePath}/${markerIcon}(${LongCoord},${LatCoord})/${LongCoord},${LatCoord},${zoom},${rotateMap}/${width}x${height}?access_token=${DefaultPublicToken}`
//   console.log(urlImage);
//   try {
//     const apiCall = await axios.get(urlImage)
//     // console.log(apiCall);
//     removeImage()
//     renderDynamicMap(apiCall)
//   } catch (error) {
//     // console.log(error.message);
//   }
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