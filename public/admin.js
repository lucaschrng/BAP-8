console.log('wtf');

let addressInput = document.getElementById('Location_address');
let latitudeInput = document.getElementById('Location_latitude');
let longitudeInput = document.getElementById('Location_longitude');

if (addressInput) {
    addressInput.addEventListener('change', (event) => {
        let address = encodeURI(event.target.value);
        fetchData(address);
    })
}

const fetchData = async (address) => {
    let type = 'street';
    if (address[0] <= '9' && address[0] >= '0') {
        type = 'housenumber';
    }
    const request = await fetch('https://api-adresse.data.gouv.fr/search/?q=' + address + "&type=" + type + "&autocomplete=1");
    const data = await request.json();
    latitudeInput.value = data.features[0].geometry.coordinates[1];
    longitudeInput.value = data.features[0].geometry.coordinates[0];
}