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

function fetchData(){
    fetch('http://127.0.0.1:8000/api/locations')
        .then((response) => response.json())
        .then((data) => {
            let location = data['hydra:member']
            for (let i = 0; i < location.length; i++) {
                console.log(location[i])
                console.log(location[i].latitude)
                let name = location[i].name
                let popupContent = "<b>" + name + "</b><br><a href='#'>I am a popup</a>";
                let popup = L.popup().setContent(popupContent);
                let marker = L.marker([location[i].latitude, location[i].longitude]).addTo(map);
                marker.bindPopup(popup).openPopup();
            }
        })
}

window.addEventListener('load', fetchData)
window.addEventListener('load', initMap);


