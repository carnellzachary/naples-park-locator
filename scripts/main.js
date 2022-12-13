let naplesMap = L.map('naplesMap').setView([26.194720, -81.696345], 12.33);

// jsMediaQuery code from W3Schools: https://www.w3schools.com/howto/howto_js_media_queries.asp
function jsMediaQuery(x) {
  if (x.matches && naplesMap.getZoom() == 12 ) { // If media query matches
    // Changes view for phone
    naplesMap.zoomOut();
  }
}

let mqPhone = window.matchMedia("(max-width: 750px)");
jsMediaQuery(mqPhone); // Call listener function at run time
mqPhone.addListener(jsMediaQuery); // Attach listener function on state changes

// MapBox theme and attribution for Leaflet map
L.tileLayer('https://api.mapbox.com/styles/v1/zcarnell/clan79yjz002i15pfcn7imdqz/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiemNhcm5lbGwiLCJhIjoiY2xhbjZ6czZsMDVraTNvcGQ1b2h6Zjc2bCJ9.v-shyASMRnY1z_N6vrlt2w', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
}).addTo(naplesMap);

// Populates Leaflet map with markers
for (let i = 0; i < allParks.length; i++) {
  allParks[i].marker = L.marker([allParks[i].lat, allParks[i].long], {
    alt: allParks[i].id
  }).on('click', markerOnClick);

  allParks[i].marker.bindPopup('<h3><a href="' + allParks[i].agencyurl + '">' + allParks[i].placeName + '</a></h3>' + '<p>"' + allParks[i].desc + '" (<a href="https://hub-collierbcc.opendata.arcgis.com/datasets/CollierBCC::parks/explore?location=26.147654%2C-81.590115%2C10.92&showTable=true">Collier County GIS</a>).</p><p>Open: ' + allParks[i].operdays + ', ' + allParks[i].operhours + '</p>').addTo(naplesMap);
}

function markerOnClick() {
  let allMarkers = document.querySelectorAll(".leaflet-marker-icon");

  // removes all huechange classes before adding a new one
  allMarkers.forEach(marker => {
    marker.classList.remove("huechange");
  });

  // Marker click code from Professor Mindy McAdams: https://jsfiddle.net/macloo/xvrhtfw9/
  // this refers to the marker that was clicked
  let park_id = this.options.alt;

  // get the index of the park object
  let i = allParks.findIndex((park, i) => {
    if (park.id === park_id) {
      // How to change Leaflet marker color, presented by sil (IE not supported): https://hungchienhsiang.medium.com/super-simple-way-to-change-leaflet-marker-color-7efd0996c797
      this._icon.classList.add("huechange");
    }
  });
}

function parkOptionClick(event) {
  // Selected option styling
  let parkOption = event.currentTarget;

  // Maybe just use toggle?
  if (parkOption.classList.contains('selectedOption')) {
    parkOption.classList.remove('selectedOption');
  } else {
    parkOption.classList.add('selectedOption');
  }

  repopulateMap();
}

function repopulateMap() {
  parksByCriteria = [];
  let selectedParkDivs = document.querySelectorAll('.selectedOption');

  if (selectedParkDivs.length == 0) {
    parksByCriteria = allParks;
  } else {
    // Filter parks by each criteria selected
    selectedParkDivs.forEach(function(i) {
      switch (i.getAttribute('id')) {
        case 'food':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.food === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.food === "Yes"
            });
          }
          break;
        case 'bathroom':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.restroom === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.restroom === "Yes"
            });
          }
          break;
        case 'picnic':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.picnic === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.picnic === "Yes"
            });
          }
          break;
        case 'parking':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.numparking > 0
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.numparking > 0
            });
          }
          break;
        case 'handicapac':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.handicapac === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.handicapac === "Yes"
            });
          }
          break;
        case 'baseball':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.baseball === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.baseball === "Yes"
            });
          }
          break;
        case 'basketball':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.basketball === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.basketball === "Yes"
            });
          }
          break;
        case 'pickleball':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.pickleball === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.pickleball === "Yes"
            });
          }
          break;
        case 'soccer':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.soccer === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.soccer === "Yes"
            });
          }
          break;
        case 'tennis':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.tennis === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.tennis === "Yes"
            });
          }
          break;
        case 'volleyball':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.volleyball === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.volleyball === "Yes"
            });
          }
          break;
        case 'fishing':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.fishing === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.fishing === "Yes"
            });
          }
          break;
        case 'boating':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.boating === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.boating === "Yes"
            });
          }
          break;
        case 'swimming':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.swimming === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.swimming === "Yes"
            });
          }
          break;
        case 'waterfeature':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.waterfeature === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.waterfeature === "Yes"
            });
          }
          break;
        case 'beach':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.beach === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.beach === "Yes"
            });
          }
          break;
        case 'playground':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.playground === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.playground === "Yes"
            });
          }
          break;
        case 'hiking':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.hiking === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.hiking === "Yes"
            });
          }
          break;
        case 'biking':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.bike === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.bikingPref === "Yes"
            });
          }
          break;
        case 'fitness':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.fitness === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.fitness === "Yes"
            });
          }
          break;
        case 'shuffleboard':
          if (parksByCriteria.length == 0) {
            parksByCriteria = allParks.filter(obj => {
              return obj.shuffleboard === "Yes"
            });
          } else {
            parksByCriteria = parksByCriteria.filter(obj => {
              return obj.shuffleboard === "Yes"
            });
          }
          break;
      }
    });
  }

  // Remove markers presently on map
  for (let i = 0; i < allParks.length; i++) {
    naplesMap.removeLayer(allParks[i].marker);
  }

  // Remove markers presently on map
  for (let i = 0; i < parksByCriteria.length; i++) {
    naplesMap.removeLayer(parksByCriteria[i].marker);
  }

  // Add the newly filtered markers
  for (let i = 0; i < parksByCriteria.length; i++) {
    parksByCriteria[i].marker = L.marker([parksByCriteria[i].lat, parksByCriteria[i].long], {
      alt: parksByCriteria[i].id
    }).on('click', markerOnClick);

    parksByCriteria[i].marker.bindPopup('<h3><a href="' + allParks[i].agencyurl + '">' + allParks[i].placeName + '</a></h3>' + '<p>"' + allParks[i].desc + '" (<a href="https://hub-collierbcc.opendata.arcgis.com/datasets/CollierBCC::parks/explore?location=26.147654%2C-81.590115%2C10.92&showTable=true">Collier County GIS</a>).</p><p>Open: ' + allParks[i].operdays + ', ' + allParks[i].operhours + '</p>').addTo(naplesMap);
  }
}
