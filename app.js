// https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-77.0397,38.8974,5,0/300x200?access_token=pk.eyJ1IjoicGl0YXlha2lubyIsImEiOiJja2x6Y3o3ZjQwYXNnMm9xc3d4OXZ2bDNyIn0.VGWn1lnzEKtxRkSatphaLg
// as per
// https://docs.mapbox.com/playground/static/

const basePath = "https://api.mapbox.com/styles/v1/mapbox/light-v10/static"
const DefaultPublicToken = "pk.eyJ1IjoicGl0YXlha2lubyIsImEiOiJja2x6Y3o3ZjQwYXNnMm9xc3d4OXZ2bDNyIn0.VGWn1lnzEKtxRkSatphaLg"
let longitude = -110.96018299693372;
let latitude = 29.12420795709416;
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
  const url = `${basePath}/${longitude},${latitude},${zoom},${rotateMap}/${width}x${height}?access_token=${DefaultPublicToken}`
  // console.log(url);
  try {
    const apiCall = await axios.get(url)
    console.log(apiCall);
    renderImage(apiCall)
  } catch (error) {
    console.log(error.message);
  }
}
getStaticImage()

// https://api.mapbox.com/{endpoint}?access_token={your_access_token}



