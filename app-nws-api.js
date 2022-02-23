// let temperatureValue = document.querySelector("temperature-value");
let locationValue = document.querySelector('#location-value');
let temperatureValue = document.querySelector("#temperature-value");
let currentTemp;
let currentTempHtml;


// on window load
window.addEventListener("load", () => {
  let lat;
  let long;
  let forecast;
  // test for location permission in browser
  if (navigator.geolocation) {
    // then get current location from browser
    navigator.geolocation.getCurrentPosition(position => {
    console.log(position); //check
    lat = position.coords.latitude;
    long = position.coords.longitude;
    // use the lat and long in the api call to the National Weather Service
    const api = `https://api.weather.gov/points/${lat},${long}`;
    // query NWS for lat long forecast link, convert, log
    fetchJson(api)
    .then(getLocationData)
      // get the forecast data and display that shit
    .then(getForecast);
  }); // end navigator position function
  } // end if
}); // end listener


// ---------- FUNCTIONS ---------- //

// basic fetch function
async function fetchJson(url) {
    return await fetch(url)
        .then(response => {
          return response.json()
        });
}

// get location from browser and display in html
async function getLocationData(data) {
  console.log(data);
  locationJson = data;
  const locationData = data.properties.relativeLocation.properties;
  let cityText = locationData.city;
  let stateText = locationData.state;
  let location = cityText + ', ' + stateText;
  locationValue.innerText = location;
  forecast = data.properties.forecast; // new url for next fetch
  return forecast;
}

// use forecast url to retrieve weather data and display in html
async function getForecast(url) {
  fetchJson(url)
  .then(data => {
    console.log(data); // check
    // NWS returns an array of 1 week 12-hour weather forecasts, 14 forecasts in total, hence the 0 below
    currentTemp = data.properties.periods[0].temperature;
    currentTempUnit = data.properties.periods[0].temperatureUnit;
    console.log(currentTemp);
    temperatureValue.innerText = currentTemp + ' ' + currentTempUnit; // add temp to html
  });
};

// async function postTemp(currentTemp) {
//   temperatureValue.innerText = currentTemp;
// }
