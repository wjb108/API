const basePath = "https://api.mapbox.com/styles/v1/mapbox/light-v10/static"
const DefaultPublicToken = "pk.eyJ1IjoicGl0YXlha2lubyIsImEiOiJja2x6Y3o3ZjQwYXNnMm9xc3d4OXZ2bDNyIn0.VGWn1lnzEKtxRkSatphaLg"
let longitude = -76.9816;
let latitude = 38.8695;
let zoom = 5;
let rotateMap = 0; // optional parameter
let width = 300;
let height = 200;
let tiltMap = ; // optional parameter

async function getStaticImage() {
  const url = `${basePath}/${longitude},${latitude},${zoom},${rotateMap}/${width}x${height}?access_token=${DefaultPublicToken}`
  try {
    const apiCall = await axios.get(url)
    console.log(apiCall);
  } catch (error) {
    console.log(error.message);
  }
}

// https://api.mapbox.com/{endpoint}?access_token={your_access_token}


// const DOMAIN_2 = "https://api.thecatapi.com/v1/images/search?category_ids="
// const BASE_URL_API_1 = `${DOMAIN_1}?api_key=${API_KEY}`
// const BASE_URL_API_2 = `${DOMAIN_2}`

// https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-77.0397,38.8974,5,0/300x200?access_token=pk.eyJ1IjoicGl0YXlha2lubyIsImEiOiJja2x6Y3o3ZjQwYXNnMm9xc3d4OXZ2bDNyIn0.VGWn1lnzEKtxRkSatphaLg