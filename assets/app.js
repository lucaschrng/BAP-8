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

let selectedLocation = document.getElementById('location-content');
let filtre = document.getElementById('filtre')
let menu = document.getElementById('menu-btn');
let locations;
let markers = [];

function displayLocation(image, name, typesNames, address, horaires, description, info) {
    selectedLocation.innerHTML = `
        <img class="popup-image w-[100vw] h-[218px] tablet:h-[459px] object-cover desktop:w-[20vw] desktop:h-full desktop:object-contain" src="${image ? require(`${image}`) : require("../public/images/image-missing.png")}" alt="${location.name}">
        <section class="flex flex-col mt-3 mr-5 ml-5 tablet:mt-6 tablet:mr-6 desktop:w-full">
            <div class="flex justify-between items-start">
                <h2 class="popup-title text-[32px] tablet:text-5xl desktop:text-[44px] font-sans text-colorBlueGreen leading-[90%]">${name}</h2>
                <div id="cross" class="flex items-center justify-center ml-[5px] w-8 h-8 rounded-full border-[.1rem] border-solid border-black cursor-pointer aspect-square">
                    <i class="fa-solid fa-plus text-base rotate-45"></i>
                </div>
            </div>
            <p class="popup-type mt-6 text-base">${typesNames}</p>
            <p class="popup-address mt-2 mb-4 text-base">${address}</p>
            <div class="flex flex-col tablet:flex-row tablet:items-end tablet:justify-between">
                <p class="popup-horaire text-xl tablet:text-2xl font-semibold mb-3">${horaires ? horaires : 'Aucune horaire indiquée'}</p>
                <div class="flex flex-col items-start tablet:items-end">
                    <p class="popup-description text-base font-medium text-colorOrange mb-3 desktop:mb-2">${description}</p>
                    <div class="flex flex-col justify-center w-full tablet:flex-row gap-4 tablet:gap-8">    
                        <a class="popup-info 
                        flex justify-center items-center bg-white text-base font-bold
                        border-4 border-solid border-colorGreen rounded-lg 
                        tablet:w-[212px] desktop:w-[241px] h-12  desktop:text-xl 
                        " href="https://www.google.com/search?${info}" target="_blank">En savoir plus</a>
                        <a class="popup-directions 
                        flex justify-center items-center bg-colorOrange text-base font-bold rounded-lg text-white
                        tablet:w-[150px] desktop:w-[163px] h-12  desktop:text-xl
                        " href="https://www.google.com/maps/place/${address}" target="_blank">Y aller</a>
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
    menu.onclick = () => {
        selectedLocation.classList.remove('active');
        menu.classList.toggle('fa-times');
        filtre.classList.toggle('active');
    }
    filtre.classList.remove('active');
    menu.classList.remove('fa-times');
}

function fetchData() {
    fetch('http://127.0.0.1:8000/api/locations')
        .then((response) => response.json())
        .then((data) => {
            locations = data['hydra:member']
            locations.forEach((location) => {
                let image = location.image
                let name = location.name
                let typesNames = location.typesNames.join(', ')
                let address = location.address
                let horaire = location.horaires
                let description = location.description
                let info = location.info
                let popupContent = "<b>" + name + "</b><br><a href='https://www.google.com/maps/place/" + address + "'>Itinéraire</a>";
                let popup = L.popup().setContent(popupContent);
                let marker = L.marker([location.latitude, location.longitude]);
                markers.push(marker);
                marker.addTo(map);
                marker.bindPopup(popup).openPopup();            
                marker.on('click', () => {
                        displayLocation(image, name, typesNames, address, horaire, description, info)
                        map.setView(marker.getLatLng(), 16);
                })
            })
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
                let image = location.image
                let name = location.name
                let typesNames = location.typesNames.join(', ')
                let address = location.address
                let horaire = location.horaires
                let description = location.description
                let info = location.info
                let popupContent = "<b>" + name + "</b><br><a href='https://www.google.com/maps/place/" + address + "'>Itinéraire</a>";
                let popup = L.popup().setContent(popupContent);
                let marker = L.marker([location.latitude, location.longitude]);
                markers.push(marker);
                marker.addTo(map);
                marker.bindPopup(popup).openPopup();
                marker.on('click', () => {
                    displayLocation(image, name, typesNames, address, horaire, description, info)
                    map.setView(marker.getLatLng(), 16);
                })
            }
        })
    })
    window.addEventListener('load', addOptions);
}

let search = document.getElementById("search");
let locationInfo = document.getElementById("locations-info");
let count = 0;

if (search) {
    console.log(search)
    search.addEventListener('keyup', (event) => {
        let searchValue = event.target.value;
        markers.forEach((marker) => {
            map.removeLayer(marker);
        })
        markers = [];
        locationInfo.classList.remove('active');
        locationInfo.innerHTML = "";
        let searchResults = count > 1 ? "Résultat trouvé" : "Résultats trouvés";
        count = 0;

        locations.forEach((location, index) => {
            if (location.name.toLowerCase().includes(searchValue.toLowerCase())) {
                let image = location.image
                let name = location.name
                let typesNames = location.typesNames.join(', ')
                let address = location.address
                let horaire = location.horaires
                let description = location.description
                let info = location.info
                let popupContent = "<b>" + name + "</b><br><a href='https://www.google.com/maps/place/" + address + "'>Itinéraire</a>";
                let popup = L.popup().setContent(popupContent);
                let marker = L.marker([location.latitude, location.longitude]);
                markers.push(marker);
                marker.addTo(map);
                marker.bindPopup(popup).openPopup();
                marker.on('click', () => {
                    displayLocation(image, name, typesNames, address, horaire, description, info);
                    map.setView(marker.getLatLng(), 16);
                })
                if (!searchValue.trim()) {
                    return;  
                } else {
                    const div = document.createElement('div');
                    div.classList.add('result','flex', 'flex-col', 'mx-[24px]', 'bg-colorBlueGreen', 'rounded-lg', 'cursor-pointer');
                    div.setAttribute('data-index', index);
                    div.innerHTML = `
                            <img class="popup-image w-full h-[141px] object-cover rounded-t-lg" src="${image ? image : require("../public/images/image-missing.png")}" alt="${location.name}">
                            <div class="flex ml-4 mt-3">
                                <p class="mr-4 text-5xl font-sans">${++count}</p>
                                <div class="flex flex-col pr-3 pb-3">
                                    <h2 class="text-xl mb-2">${name}</h2>
                                    <p class="text-base">${typesNames}</p>
                                    <a href="https://www.google.com/maps/place/${address}" target="_blank"class="text-base">${address}</a>
                                </div>
                            </div>
                            `
                    locationInfo.appendChild(div);
                    locationInfo.classList.add('active');
                    div.addEventListener('click', () => {
                        let divs = document.querySelectorAll('.result');
                        divs.forEach((div) => {
                            div.style.backgroundColor = null;
                        })
                        div.style.backgroundColor = '#FC6B3B';
                    })
                }
            }
        })
        if (count === 0) {
            locationInfo.innerHTML = `<div class="font-semibold">Aucun résultat trouvé</div>`;
            locationInfo.classList.add('active');
        } else {
            const countMention = document.createElement('div');
            countMention.classList.add('font-semibold');
            countMention.innerHTML = `${count} ${searchResults}`;
            locationInfo.insertBefore(countMention, locationInfo.firstChild);
        }
        locationInfo.addEventListener('click', (event) => {
            const markerIndex = event.target.closest('[data-index]')?.getAttribute('data-index');
            if (markerIndex !== null) {
              markers[markerIndex].openPopup();
              map.setView(markers[markerIndex].getLatLng(), 16);
              filtre.classList.remove('active');
              menu.classList.remove('fa-times');
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
let check = document.querySelectorAll('[id^="isCheck-"]');
for (let i = 0; i < filters.length; i++) {
    filters[i].onclick = () => {
       filters[i].classList.toggle('active');
        navbars[i].classList.toggle('active');
        check[i].classList.toggle('active');
    }
}

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    filtre.classList.toggle('active');
}

let close = document.getElementById('close-filtre');

close.onclick = () => {
    filtre.classList.remove('active');
    menu.classList.remove('fa-times');
}

const subtypes = document.querySelectorAll('.subtype');
const subtypesQueries = [
    ['Services municipaux'],
    ['Hopitaux'],
    ['Lieux de culte', 'Equipements culturels'],
    [
        'Crèche',
        'Lycée',
        'Ecole maternelle et élémentaire',
        'Ecole maternelle',
        'Collèges',
        'Ecole élémentaire',
        'Centre de loisirs maternel',
        'Accueil périscolaire maternel',
        'Enfance'
    ],
    ['Installations sportives']];

subtypes.forEach((subtype, index) => {
  subtype.addEventListener('click', () => {
      markers.forEach((marker) => {
          map.removeLayer(marker);
      })
      markers = [];
      locations.forEach((location) => {
          if (location.typesNames.some((type) => subtypesQueries[index].includes(type))) {
                let image = location.image
                let name = location.name
                let typesNames = location.typesNames.join(', ')
                let address = location.address
                let horaire = location.horaires
                let description = location.description
                let info = location.info
                let popupContent = "<b>" + name + "</b><br><a href='https://www.google.com/maps/place/" + address + "'>Itinéraire</a>";
                let popup = L.popup().setContent(popupContent);
                let marker = L.marker([location.latitude, location.longitude]);
                markers.push(marker);
                marker.addTo(map);
                marker.bindPopup(popup).openPopup();
                marker.on('click', () => {
                    displayLocation(image, name, typesNames, address, horaire, description, info)
                    map.setView(marker.getLatLng(), 16);
                })
          }
      })
  })
})

const filtersDiv = document.querySelectorAll('.filter-div');
subtypes.forEach((subtype, index) => {
  subtype.addEventListener('click', () => {
        filtersDiv.forEach((filterDiv) => {
            if (filterDiv.children[0].classList.contains('active')) filterDiv.children[0].click();
        })
      filtersDiv.forEach((filterDiv) => {
          if (subtypesQueries[index].includes(filterDiv.children[1].textContent)) filterDiv.children[0].click();
      })
  })
})

console.log("JavaScript file loaded!");

const titleMain = document.querySelector(".mainTitle");
const filterSelect = document.querySelector(".selectFilter");
const stepTwo = document.querySelector(".filterImg");
const stepMenu = document.querySelector("#stepMenu");
const backStep = document.querySelector(".stepBack");
const stepThree = document.querySelector("#stepThree");

function goToStep1() {
    titleMain.innerText = "Que recherchez-vous ?";
    filterSelect.innerHTML = `
        {% for subtype in subtypes %}
            <div class="subtype filter flex flex-col justify-start items-center desktop:mx-[56px] px-16 tablet:mx-0 px-[39px]">
                <div class="bg-red-500 w-[132px] h-[132px] rounded-tr-[30px] rounded-bl-[30px]">
                    <img class="w-[132px] h-[132px] rounded-tr-[30px] rounded-bl-[30px] object-cover desktop:opacity-50 hover:opacity-100 tablet:opacity-100" src="{{ subtype.imageUrl }}" alt="{{ subtype.name }}" onclick="goToStep2()">
                    <p class="font-txt text-center desktop:text-[32px] text-white tablet:text-[16px]">{{ subtype.name }}</p>
                </div>
            </div>
        {% endfor %}
    `;
    stepMenu.innerHTML = `
        <div class="stepMenu flex flex-row items-center justify-center m-5" id="stepMenu">
            <div class="selectedStep items-center justify-center">
                <p class="stepText font-txt text-center text-white tablet:text-[16px]">Etape</p>
                <div class="someClass pt-2"></div>
                <div class="stepBall flex items-center justify-center w-20 h-20 bg-[#FC6B3B] rounded-full text-white text-5xl font-bold">1</div>
                <div class="someOtherClass pb-7"></div>
            </div>
            <div class="seperator flex items-center justify-center text-white text-xl">------</div>
            <div class="ball flex items-center justify-center w-14 h-14 bg-[#19647E] rounded-full border-4 border-[#8A675C]"></div>
            <div class="seperator flex items-center justify-center text-white text-xl">------</div>
            <div class="ball flex items-center justify-center w-14 h-14 bg-[#19647E] rounded-full border-4 border-[#8A675C]"></div>
        </div>
`;
}

function goToStep2() {
    titleMain.innerText = "Qui êtes-vous ?";
    filterSelect.innerHTML = `
        {% for subtype in subtypes %}
            <div class="subtype filter flex flex-col justify-start items-center desktop:mx-[56px] px-16 tablet:mx-0 px-[39px]">
                <div class="bg-red-500 w-[132px] h-[132px] rounded-tr-[30px] rounded-bl-[30px]">
                    <img class="w-[132px] h-[132px] rounded-tr-[30px] rounded-bl-[30px] object-cover desktop:opacity-50 hover:opacity-100 tablet:opacity-100" src="{{ subtype.imageUrl }}" alt="{{ subtype.name }}"     onclick="goToStep3()">
                    <p class="font-txt text-center desktop:text-[32px] text-white tablet:text-[16px]">{{ subtype.name }}</p>
                </div>
            </div>
        {% endfor %}
    `;
    stepMenu.innerHTML = `
    <div class="stepMenu flex flex-row items-center justify-center m-5" id="stepMenu">
    <div class="stepBack text-white font-[bold] text-[32px] cursor-pointer px-10 py-[5px] rounded-[10px] border-[#E86336]" onclick="goToStep1()">
    <p class="stepBackBtn">Etape Précédente</p>
    </div>
    <div class="ball flex items-center justify-center w-14 h-14 bg-[#19647E] rounded-full border-4 border-[#8A675C]"></div>
    <div class="seperator flex items-center justify-center text-white text-xl">------</div>
    <div class="selectedStep items-center justify-center">
    <p class="stepText font-txt text-center text-white tablet:text-[16px]">Etape</p>
    <div class="someClass pt-2"></div>
    <div class="stepBall flex items-center justify-center w-20 h-20 bg-[#FC6B3B] rounded-full text-white text-5xl font-bold">2</div>
    <div class="someOtherClass pb-7"></div>
    </div>
    <div class="seperator flex items-center justify-center text-white text-xl">------</div>
    <div class="ball flex items-center justify-center w-14 h-14 bg-[#19647E] rounded-full border-4 border-[#8A675C]"></div>
    </div>
`;
}

function goToStep3() {
    titleMain.innerText = "Que voulez-vous faire ?";
    filterSelect.innerHTML = `
        {% for subtype in subtypes %}
            <div class="subtype filter flex flex-col justify-start items-center desktop:mx-[56px] px-16 tablet:mx-0 px-[39px]">
                <div class="bg-red-500 w-[132px] h-[132px] rounded-tr-[30px] rounded-bl-[30px]">
                    <img class="w-[132px] h-[132px] rounded-tr-[30px] rounded-bl-[30px] object-cover desktop:opacity-50 hover:opacity-100 tablet:opacity-100" src="{{ subtype.imageUrl }}" alt="{{ subtype.name }}">
                    <p class="font-txt text-center desktop:text-[32px] text-white tablet:text-[16px]">{{ subtype.name }}</p>
                </div>
            </div>
        {% endfor %}
    `;
    stepMenu.innerHTML = `
    <div class="stepMenu flex flex-row items-center justify-center m-5" id="stepMenu">
    <div class="stepBack text-white font-[bold] text-[32px] cursor-pointer px-10 py-[5px] rounded-[10px] border-[#E86336]" onclick="goToStep2()">
        <p class="stepBackBtn">Etape Précédente</p>
    </div>
    <div class="ball flex items-center justify-center w-14 h-14 bg-[#19647E] rounded-full border-4 border-[#8A675C]"></div>
    <div class="seperator flex items-center justify-center text-white text-xl">------</div>
    <div class="ball flex items-center justify-center w-14 h-14 bg-[#19647E] rounded-full border-4 border-[#8A675C]"></div>
    <div class="seperator flex items-center justify-center text-white text-xl">------</div>
    <div class="selectedStep items-center justify-center">
    <p class="stepText font-txt text-center text-white tablet:text-[16px]">Etape</p>
    <div class="someClass pt-2"></div>
    <div class="stepBall flex items-center justify-center w-20 h-20 bg-[#FC6B3B] rounded-full text-white text-5xl font-bold">3</div>
    <div class="someOtherClass pb-7"></div>
    </div>
    </div>
`;
}