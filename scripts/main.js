let desc = document.querySelector('#parkDescription');
let parkDetails = document.querySelector('#parkDetails');
let selectedCriteriaBox = document.querySelector('#selectedCriteria');
let naplesMap = L.map('naplesMap').setView([26.193813, -81.705949], 11.33);


// MapBox theme and attribution for Leaflet map
L.tileLayer('https://api.mapbox.com/styles/v1/zcarnell/clan79yjz002i15pfcn7imdqz/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiemNhcm5lbGwiLCJhIjoiY2xhbjZ6czZsMDVraTNvcGQ1b2h6Zjc2bCJ9.v-shyASMRnY1z_N6vrlt2w', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
}).addTo(naplesMap);

// Populates Leaflet map with markers
for (let i = 0; i < places.length; i++) {
  places[i].marker = L.marker([places[i].lat, places[i].long], {
    alt: places[i].id
  }).on('click', markerOnClick).addTo(naplesMap);
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
  let i = places.findIndex((park, i) => {
    if (park.id === park_id) {
      // How to change Leaflet marker color, presented by sil (IE not supported): https://hungchienhsiang.medium.com/super-simple-way-to-change-leaflet-marker-color-7efd0996c797
      this._icon.classList.add("huechange");
      return true
    }
  });

  // write descrip for that state into external DIV
  desc.innerHTML = '<h3><a href="' + places[i].agencyurl + '">' + places[i].placeName + '</a></h3>' + '<p>"' + places[i].desc + '" (<a href="https://hub-collierbcc.opendata.arcgis.com/datasets/CollierBCC::parks/explore?location=26.147654%2C-81.590115%2C10.92&showTable=true">Collier County GIS</a>).</p>';

  // Check if has parking
  if (places[i].numparking > 0) {
    parkingAmount = 'Yes (' + places[i].numparking + ')';
  } else {
    parkingAmount = 'No';
  }

  parkDetails.innerHTML = '<ul><li>Parking: ' + parkingAmount + '</li><li>Open: 7 days a week (Daylight)</li></ul>';
}

function parkOptionClick(event) {
  // Selected option styling
  let parkOption = event.currentTarget;
  if (parkOption.classList.contains('selectedOption')) {
    parkOption.classList.remove('selectedOption');
  } else {
    // Add styling to selevted div
    parkOption.classList.add('selectedOption');
  }

  // Add option to selectedCriteria
  selectedCriteriaBox.innerHTML += '<div>' + event.currentTarget.innerHTML + '</div>';
  console.log(parkOption.getAttribute('value'));
}

function repopulateMap() {
  parksByCriteria = [];
  let selectedParkDivs = document.querySelectorAll('.selectedOption');
  selectedParkDivs.forEach(function(i) {
    // switch-case for each button that defines certain varibles. Filter places array by those varibles
    switch (i.getAttribute('value')) {
      case 'food':
        if (parksByCriteria.length == 0) {
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
            return obj.picnic === "Yes"
          });
        } else {
          parksByCriteria = parksByCriteria.filter(obj => {
            return obj.picnic === "Yes"
          });
        }
        break;
      case 'parking':
        // Do this later after adding parking attribute to parent array
        parkingPref = "Yes";
        break;
      case 'handicapac':
        if (parksByCriteria.length == 0) {
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
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
          parksByCriteria = places.filter(obj => {
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

  console.log(parksByCriteria);


  for (let i = 0; i < places.length; i++) {
    naplesMap.removeLayer(places[i].marker);
  }

  for (let i = 0; i < parksByCriteria.length; i++) {
    naplesMap.removeLayer(parksByCriteria[i].marker);
  }

  for (let i = 0; i < parksByCriteria.length; i++) {
    parksByCriteria[i].marker = L.marker([parksByCriteria[i].lat, parksByCriteria[i].long], {
      alt: parksByCriteria[i].id
    }).on('click', markerOnClick).addTo(naplesMap);
  }

}

// Maybe do marker clusters: https://stackoverflow.com/questions/49333263/how-to-use-leaflet-markerclustergroup

// Old desc bind to marker popup
//for (let i = 0; i < places.length; i++) {
// L.marker([places[i].lat, places[i].long]).bindPopup('<h3><a href="' + places[i].agencyurl + '">' + places[i].placeName + '</a></h3>' + '<p>"' + places[i].desc + '" (<a href="https://hub-collierbcc.opendata.arcgis.com/datasets/CollierBCC::parks/explore?location=26.147654%2C-81.590115%2C10.92&showTable=true">Collier County GIS</a>).</p>').addTo(naplesMap);
// }
