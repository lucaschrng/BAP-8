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
                                <img class="popup-image w-full h-[459px] object-cover desktop:w-[20vw] desktop:h-full desktop:object-contain" src="${require("../public/images/image-missing.png")}" alt="image-missing">
                                <section class="flex flex-col mt-6 mr-6 ml-5 desktop:w-full">
                                    <div class="flex justify-between items-start">
                                        <h2 class="popup-title text-[48px] desktop:text-[44px] font-sans text-colorBlueGreen leading-[90%]">${location.name}</h2>
                                        <div id="cross" class="fa-solid fa-plus flex items-center justify-center text-base w-8 h-8 rotate-[45deg] rounded-full border-[.1rem] border-soli border-black cursor-pointer"></div>
                                    </div>
                                    <p class="popup-type mt-6 text-base">${location.typesNames.join(', ')}</p>
                                    <p class="popup-address mt-2 mb-4 text-base">${location.address}</p>
                                    <div class="flex items-end justify-between">
                                        <p class="popup-horaire text-2xl font-semibold">Aucune horaire indiquée</p>
                                        <div class="flex flex-col items-end">
                                            <p class="popup-description text-xs desktop:text-base font-medium text-colorOrange mb-2">${location.description}</p>
                                            <div class="flex gap-8">
                                                <a class="popup-info 
                                                flex justify-center items-center bg-white text-base font-bold
                                                border-4 border-solid border-colorGreen rounded-lg 
                                                w-[212px] desktop:w-[241px] h-12  desktop:text-xl 
                                                " href="https://www.google.com/search?${location.info}" target="_blank">En savoir plus</a>
                                                <a class="popup-directions 
                                                flex justify-center items-center bg-colorOrange text-base font-bold rounded-lg text-white
                                                w-[150px] desktop:w-[163px] h-12  desktop:text-xl
                                                " href="https://www.google.com/maps/place/${location.address}" target="_blank">Y aller</a>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            `;                  
                            selectedLocation.classList.add('active');
                            let cross = document.getElementById('cross');
                            cross.addEventListener('click',  () => {
                                selectedLocation.classList.remove('active');
                            })
                        })
                    } else {
                        marker.on('click', () => {
                            selectedLocation.innerHTML = `
                                <img class="popup-image" src="${require("../public/images/image-missing.png")}" alt="image-missing">
                                <div class="box-middle">
                                    <h2 class="popup-title">${location.name}</h2>
                                    <p class="popup-type">${location.typesNames.join(', ')}</p>
                                    <p class="popup-address">${location.address}</p>
                                    <p class="popup-horaire">${location.horaires}</p>
                                </div>
                                <div class="box-right">
                                    <p class="popup-horaire">${location.horaires}</p>
                                    <p class="popup-description">${location.description}</p>
                                    <div class="popup-cta">
                                        <div class="container">
                                            <a class="popup-info" href="https://www.google.com/maps/place/${location.info}" target="_blank">En savoir plus</a>
                                            <a class="popup-directions" href="https://www.google.com/maps/place/${location.address}" target="_blank">Y aller</a>
                                        </div>
                                    </div>
                                </div>
                                <div id="cross" class="cross">
                                    <i class="fa-solid fa-plus"></i>
                                </div>
                            `;
                            selectedLocation.classList.add('active');
                            let cross = document.getElementById('cross');
                            cross.addEventListener('click',  () => {
                                selectedLocation.classList.remove('active');
                            })
                        })
                    }
                } else {
                    if (horaire.length == 0) {   
                        marker.on('click', () => {
                            selectedLocation.innerHTML = `
                                <img class="popup-image" src="${location.image}" alt="${location.name}">
                                <div class="box-middle">
                                    <h2 class="popup-title">${location.name}</h2>
                                    <p class="popup-type">${location.typesNames.join(', ')}</p>
                                    <p class="popup-address">${location.address}</p>
                                    <p class="popup-horaire">Aucune horaire indiquée</p>
                                </div>
                                <div class="box-right">
                                    <p class="popup-horaire">Aucune horaire indiquée</p>
                                    <p class="popup-description">${location.description}</p>
                                    <div class="popup-cta">
                                        <div class="container">
                                            <a class="popup-info" href="https://www.google.com/search?${location.info}" target="_blank">En savoir plus</a>
                                            <a class="popup-directions" href="https://www.google.com/maps/place/${location.address}" target="_blank">Y aller</a>
                                        </div>
                                    </div>
                                </div>
                                <div id="cross" class="cross">
                                    <i class="fa-solid fa-plus"></i>
                                </div>
                            `;
                            selectedLocation.classList.add('active');
                            let cross = document.getElementById('cross');
                            cross.addEventListener('click',  () => {
                                selectedLocation.classList.remove('active');
                            })
                        })
                    } else {
                        marker.on('click', () => {
                            selectedLocation.innerHTML = `
                                <img class="popup-image" src="${location.image}" alt="${location.name}">
                                <div class="box-middle">
                                    <h2 class="popup-title">${location.name}</h2>
                                    <p class="popup-type">${location.typesNames.join(', ')}</p>
                                    <p class="popup-address">${location.address}</p>
                                    <p class="popup-horaire">${location.horaires}</p>
                                </div>
                                <div class="box-right">
                                    <p class="popup-horaire">${location.horaires}</p>
                                    <p class="popup-description">${location.description}</p>
                                    <div class="popup-cta">
                                        <div class="container">
                                            <a class="popup-info" href="https://www.google.com/maps/place/${location.info}" target="_blank">En savoir plus</a>
                                            <a class="popup-directions" href="https://www.google.com/maps/place/${location.address}" target="_blank">Y aller</a>
                                        </div>
                                    </div>
                                </div>
                                <div id="cross" class="cross">
                                    <i class="fa-solid fa-plus"></i>
                                </div>
                            `;
                            selectedLocation.classList.add('active');
                            let cross = document.getElementById('cross');
                            cross.addEventListener('click',  () => {
                                selectedLocation.classList.remove('active');
                            })
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
            }
        })
    })
}

window.addEventListener('load', () => {
    fetchData();
    initMap();
})
window.addEventListener('load', initMap);

let filters = document.querySelectorAll('[id^="filter-btn-"]');
let navbars = document.querySelectorAll('[id^="navbar-"]');

for (let i = 0; i < filters.length; i++) {
    filters[i].onclick = () => {
       filters[i].classList.toggle('fa-times');
        navbars[i].classList.toggle('active');
    }
}

let menu = document.getElementById('menu-btn');
let filtre = document.getElementById('filtre')

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    filtre.classList.toggle('active');
}

let close = document.getElementById('close-filtre');

close.onclick = () => {
    filtre.classList.remove('active');
    menu.classList.remove('fa-times');
}