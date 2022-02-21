let temperatureValue = document.querySelector("temperature-value");
let locationValue = document.querySelector('#location-value');


// on window load
window.addEventListener("load", () => {

  let lat;
  let long;

  // test for location permission in browser
  if (navigator.geolocation) {
    // then get current location from browser
    navigator.geolocation.getCurrentPosition(position => {
    // read lat and long from returned position
    console.log(position);
    lat = position.coords.latitude;
    long = position.coords.longitude;
    // use the lat and long in the api call to the National Weather Service

  });
}
});
