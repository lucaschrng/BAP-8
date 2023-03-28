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

let selectedLocation = document.querySelector('#location-content');
let locations;
let markers = [];
let markersHtml;

function fetchData() {
    fetch('http://127.0.0.1:8000/api/locations')
        .then((response) => response.json())
        .then((data) => {
            locations = data['hydra:member']
            locations.forEach((location) => {
                let image = Location.image
                let name = location.name
                let address = location.address
                let horaire = location.horaires
                let popupContent = "<b>" + name + "</b><br><a href='https://www.google.com/maps/place/" + address + "'>Itinéraire</a>";
                let popup = L.popup().setContent(popupContent);
                let marker = L.marker([location.latitude, location.longitude]);
                markers.push(marker);
                marker.addTo(map);
                marker.bindPopup(popup).openPopup();
                if (image == null) {
                    if (horaire.length == 0) {                
                        marker.on('click', () => {
                            selectedLocation.innerHTML = `
                                <img class="popup-image" src="${require("../public/images/image-missing.png")}" alt="image-missing">
                                <div class="box-popup">
                                    <h2 class="popup-title">${location.name}</h2>
                                    <p class="popup-type">${location.typesNames.join(', ')}</p>
                                    <p class="popup-address">${location.address}</p>
                                    <p class="popup-horaire">Aucune horaire indiquée</p>
                                </div>
                                <p class="popup-description">${location.description}</p>
                                <div class="popup-cta">
                                    <a class="popup-directions" href="https://www.google.com/maps/place/${location.address}" target="_blank">Y aller</a>
                                </div>
                                <div id="cross" class="cross">
                                    <i class="fa-solid fa-plus"></i>
                                </div>
                                
                            `;
                            selectedLocation.classList.add('active');
                        })
                    } else {
                        marker.on('click', () => {
                            selectedLocation.innerHTML = `
                                <img class="popup-image" src="${require("../public/images/image-missing.png")}" alt="image-missing">
                                <div class="box-popup">
                                    <h2 class="popup-title">${location.name}</h2>
                                    <p class="popup-type">${location.typesNames.join(', ')}</p>
                                    <p class="popup-address">${location.address}</p>
                                    <p class="popup-horaire">${location.horaires}</p>
                                </div>
                                <p class="popup-description">${location.description}</p>
                                <div class="popup-cta">
                                    <a class="popup-directions" href="https://www.google.com/maps/place/${location.address}" target="_blank">Y aller</a>
                                </div>
                                <div id="cross" class="cross">
                                    <i class="fa-solid fa-plus"></i>
                                </div>
                            `;
                            selectedLocation.classList.add('active');
                        })
                    }
                } else {
                    if (horaire.length == 0) {   
                        marker.on('click', () => {
                            selectedLocation.innerHTML = `
                                <img class="popup-image" src="${location.image}" alt="${location.name}">
                                <div class="box-popup">
                                    <h2 class="popup-title">${location.name}</h2>
                                    <p class="popup-type">${location.typesNames.join(', ')}</p>
                                    <p class="popup-address">${location.address}</p>
                                    <p class="popup-horaire">Aucune horaire indiquée</p>
                                </div>
                                <p class="popup-description">${location.description}</p>
                                <div class="popup-cta">
                                    <a class="popup-directions" href="https://www.google.com/maps/place/${location.address}" target="_blank">Y aller</a>
                                </div>
                                <div id="cross" class="cross">
                                    <i class="fa-solid fa-plus"></i>
                                </div>
                            `;
                            selectedLocation.classList.add('active');
                        })
                    } else {
                        marker.on('click', () => {
                            selectedLocation.innerHTML = `
                                <img class="popup-image" src="${location.image}" alt="${location.name}">
                                <div class="box-popup">
                                    <h2 class="popup-title">${location.name}</h2>
                                    <p class="popup-type">${location.typesNames.join(', ')}</p>
                                    <p class="popup-address">${location.address}</p>
                                    <p class="popup-horaire">${location.horaires}</p>
                                </div>
                                <p class="popup-description">${location.description}</p>
                                <div class="popup-cta">
                                    <a class="popup-directions" href="https://www.google.com/maps/place/${location.address}" target="_blank">Y aller</a>
                                </div>
                                <div id="cross" class="cross">
                                    <i class="fa-solid fa-plus"></i>
                                </div>
                            `;
                            selectedLocation.classList.add('active');
                        })
                    }
            } })
        })
}

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
                let popupContent = "<b>" + name + "</b><br><a href='https://www.google.com/maps/place/" + address + "'>Itinéraire</a>";
                let popup = L.popup().setContent(popupContent);
                let marker = L.marker([location.latitude, location.longitude]);
                markers.push(marker);
                marker.addTo(map);
                marker.bindPopup(popup).openPopup();
                marker.on('click', () => {
                    selectedLocation.innerHTML = `
                        <h2 class="popup-title">${location.name}</h2>
                        <p class="popup-address">${location.address}</p>
                        <a class="popup-directions" href="https://www.google.com/maps/place/${location.address}" target="_blank">Directions</a>
                    `;
                    selectedLocation.classList.add('active');
                })
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
                let popupContent = "<b>" + name + "</b><br><a href='https://www.google.com/maps/place/" + address + "'>Itinéraire</a>";
                let popup = L.popup().setContent(popupContent);
                let marker = L.marker([location.latitude, location.longitude]);
                markers.push(marker);
                marker.addTo(map);
                marker.bindPopup(popup).openPopup();
                marker.on('click', () => {
                    selectedLocation.innerHTML = `
                        <h2 class="popup-title">${location.name}</h2>
                        <p class="popup-address">${location.address}</p>
                        <a class="popup-directions" href="https://www.google.com/maps/place/${location.address}" target="_blank">Directions</a>
                    `;
                    selectedLocation.classList.add('active');
                })
            }
        })
    })
}

window.addEventListener('load', () => {
    fetchData();
    initMap();
})
window.addEventListener('load', initMap);

let menus = document.querySelectorAll('[id^="menu-btn-"]');
let navbars = document.querySelectorAll('[id^="navbar-"]');

for (let i = 0; i < menus.length; i++) {
    menus[i].onclick = () => {
        menus[i].classList.toggle('fa-times');
        navbars[i].classList.toggle('active');
    }
}