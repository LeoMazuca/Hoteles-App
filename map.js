let hotels=[];
let map;
let markers=[];

const setListener = () =>{
    document.querySelectorAll(".hotel_individual_name").forEach((hotelName, index) =>{
        hotelName.addEventListener("click", ()=>{
            google.maps.event.trigger(markers[index], "click")
        })
    })
}

const displayHotelList = (data) =>{
    hotels = data;
    let hotelHTML="";
    hotels.forEach(hotel =>{
        hotelHTML += `<h4 class="hotel_individual_name">${hotel.name}</h4>`
    })
    document.getElementById("hotel_names").innerHTML = hotelHTML;
}

const result = (data) =>{
    hotels = data;
    let bounds = new google.maps.LatLngBounds();
    hotels.forEach(hotel => {
        let coord = new google.maps.LatLng(hotel.latitude, hotel.longitude);
        let name = hotel.name;        
        bounds.extend(coord)
        createMarker(coord, name);    
        map.fitBounds(bounds)
    })
    

}
const stockData = async() => {
	//LLAMAMOS LA API
	let url = "https://hotels4.p.rapidapi.com/locations/search?query=torreon%20Coahuila&locale=en_US"
	let header = {
		"x-rapidapi-key": "d57e65adc9mshaaf9059dc8deb61p146b27jsn6a55c8764211",
		"x-rapidapi-host": "hotels4.p.rapidapi.com"
	}
	const res = await fetch(url, {headers : header})
	let data = await res.json()

	result(data.suggestions[1].entities)
    displayHotelList(data.suggestions[1].entities)
    setListener();

    return data.suggestions[1].entities;
}

const createMarker = (coord, name) => {
    let html = `<h3>${name}</h3>`
    const marker = new google.maps.Marker({
        position: coord,
        map: map,
        icon: "hotel.png"
    })
    google.maps.event.addListener(marker, "click", ()=>{
        infoWindow.setContent(html);
        infoWindow.open(map, marker)
        })
    markers.push(marker);
}

function initMap(){
    let torreon = {lat:25.5444, lng:-103.442}
    map = new google.maps.Map(document.getElementById("map"), {
        center: torreon,
        zoom: 14,
        mapId: "4e2e0d4fb4188733"
    })
    hotels = stockData();

    const marker = new google.maps.Marker({
        position: torreon,
        map: map
    })

     infoWindow = new google.maps.InfoWindow();

 
}