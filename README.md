### App Title: Map Your Business
### [Link](https://wjb108.github.io/API/)
---
### App Description: Generates *interactive* map
---
### API: Uses the following APIs:
### - GeoJS *(Free)*
### - REST COUNTRIES *(Free)* 
### - Mapbox Geocoding API *(Generous Free Tier)*
### - Mapbox GL JS *(Generous Free Tier)*
---
### MVP: Performs the following: 
### - GeoJS takes your IP address and sets country as default value to country dropdown.
### - REST COUNTRIES populates all countries and appends them to the country dropdown. Should you be using a VPN you can select the appropriate country for your search. The country dropdown improves the relevancy of address search results in *that* country. If you search for an address in New York, the country **must** be set to the United States. 
### - Input validation of intended data types of the input fields increases the relevancy of address search results.
### - Mapbox Geocoding API takes a properly formatted address and converts it into longitude and latitude coordinates. 
### - Mapbox GL JS takes longitude and latitude coordinates as an input, generates an interactive map and places a marker on the location.
---
### Post-MVP: 
### - Use phone GPS location to generate longitude and latitude coordinates to render *interactive* map
### - Add multiple addresses 
### - Use Mapbox Navigation APIs, in particular, optimization and directions to optimize best delivery route for multiple addresses
