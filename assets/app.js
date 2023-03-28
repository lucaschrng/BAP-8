/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

let map = L.map('map').setView([48.780718, 2.266203], 19);

function initMap() {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('../public/images/marker-icon-2x.png'),
        iconUrl: require('../public/images/marker-icon.png'),
        shadowUrl: require('../public/images/marker-shadow.png')
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let marker = L.marker([48.780718, 2.266203]).addTo(map);
    marker.bindPopup("<b>Hello world!</b><br><a href='#'>I am a popup</a>.").openPopup();
}

let locations;
let markers = [];
function fetchData(){
    fetch('http://127.0.0.1:8000/api/locations')
        .then((response) => response.json())
        .then((data) => {
            locations = data['hydra:member']
            locations.forEach((location) => {
                let name = location.name
                let address = location.address
                let popupContent = "<b>" + name + "</b><br><a href='https://www.google.com/maps/place/"+ address + "'>Itinéraire</a>";
                let popup = L.popup().setContent(popupContent);
                let marker = L.marker([location.latitude, location.longitude]);
                markers.push(marker);
                marker.addTo(map);
                marker.bindPopup(popup).openPopup();
            })
        })
}

// <!-- ======= Need a fix ======= -->
function createPopupContent(location) {
    let name = location.name;
    let address = location.address;
  
    // Create the popup HTML content
    let content = document.createElement('div');
    content.innerHTML = `
      <div class="popup-trigger" onclick="showPopup()"></div>
      <div class="popup-container" id="popup-container">
        <h2 class="popup-title">${name}</h2>
        <p class="popup-address">${address}</p>
        <a class="popup-directions" href="https://www.google.com/maps/place/${address}" target="_blank">Directions</a>
      </div>
    `;
  
    return content;
  }
  
  // Function to show the popup-container
  function showPopup() {
    document.getElementById("popup-container").classList.add('active');
  }
  
  // Add click event listener to each marker
  markers.forEach((marker, index) => {
    marker.on('click', () => {
      // Get the location data for this marker
      let location = locations[index];
  
      // Create the popup content
      let popupContent = createPopupContent(location);
  
      // Create the popup and bind it to the marker
      let popup = L.popup().setContent(popupContent);
      marker.bindPopup(popup);
  
      // Show the popup container
      let popupContainer = popupContent.querySelector('.popup-container');
      document.body.appendChild(popupContainer);
    });
  });
//                   <!-- ======= Need a fix ======= -->
  
let select = document.getElementById("type");
if (select) {
    function addOptions() {
        fetch("http://127.0.0.1:8000/api/types")
            .then((response) => response.json())
            .then((data) => {
                const types = data['hydra:member'];
                types.forEach((type) => {
                    let option = document.createElement("option");
                    option.value = type.id;
                    option.text = type['type_name'];
                    select.add(option);
                })
            })
    }

    select.addEventListener('change', (event) => {
        let typeId = event.target.value;
        markers.forEach((marker) => {
            map.removeLayer(marker);
        })
        markers = [];
        locations.forEach((location) => {
            if (location.typesIds.includes(parseInt(typeId)) || typeId === 'all') {
                let name = location.name
                let address = location.address
                let popupContent = "<b>"  + name + "</b><br><a href='https://www.google.com/maps/place/"+ address + "'>Itinéraire</a>";
                let popup = L.popup().setContent(popupContent);
                let marker = L.marker([location.latitude, location.longitude]);
                markers.push(marker);
                marker.addTo(map);
                marker.bindPopup(popup).openPopup();
            }
        })
    })

    window.addEventListener('load', addOptions);
}

let search = document.getElementById("search");
if (search) {
    console.log(search)
    search.addEventListener('keyup', (event) => {
        let searchValue = event.target.value;
        markers.forEach((marker) => {
            map.removeLayer(marker);
        })
        markers = [];
        locations.forEach((location) => {
            if (location.name.toLowerCase().includes(searchValue.toLowerCase())) {
                let name = location.name
                let address = location.address
                let popupContent = "<b>" + name + "</b><br><a href='https://www.google.com/maps/place/"+ address + "'>Itinéraire</a>";
                let popup = L.popup().setContent(popupContent);
                let marker = L.marker([location.latitude, location.longitude]);
                markers.push(marker);
                marker.addTo(map);
                marker.bindPopup(popup).openPopup();
            }
        })
    })
}

window.addEventListener('load', () => {
    fetchData();
    initMap();
})
window.addEventListener('load', initMap);
