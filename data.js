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
    console.log(data);
    hotels.splice(20, 1);
    hotels.splice(20, 1);
    hotels.splice(22, 1);
    /* let bounds = new google.maps.LatLngBounds(); */
    hotels.forEach(hotel => {
        let coord = new google.maps.LatLng(hotel.location.latitude, hotel.location.longitude);
        let name = hotel.name;
        let address = hotel.location.address.addressLine1;
        let city = hotel.location.address.cityName;
        let country = hotel.location.address.countryName;
        let img;
        if(hotel.media === undefined){
             img = "https://cdn.pixabay.com/photo/2018/03/22/02/37/background-3249063_960_720.png";
        }else{
             img = hotel.media.url;
        }
        
        let starRating = hotel.starRating;
        /* bounds.extend(coord) */
        createMarker(coord, name, address, city, country, img, starRating);    
        /* map.fitBounds(bounds) */
    })
    

}
const stockData = async() => {
	//LLAMAMOS LA API
	let url = "https://priceline-com-provider.p.rapidapi.com/v1/hotels/search?location_id=3000060231&sort_order=HDR&date_checkout=2021-11-27&date_checkin=2021-11-26&rooms_number=1"
	let header = {
		"x-rapidapi-key": "d57e65adc9mshaaf9059dc8deb61p146b27jsn6a55c8764211",
		"x-rapidapi-host": "priceline-com-provider.p.rapidapi.com"
	}
	const res = await fetch(url, {headers : header})
	let data = await res.json()

	result(data.hotels)
    displayHotelList(data.hotels)
    setListener();

    return data.hotels;
}

const createMarker = (coord, name, address, city, country, img, starRating) => {
    let stars ;
    switch (starRating) {
        case 0:
            stars = `<i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`
            break;
        case .5:
            stars = `<i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`
            break
        case 1:
            stars = `<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`
            break
        case 1.5:
            stars = `<i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`
            break
        case 2:
            stars = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`
            break
        case 2.5:
            stars = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i>`
            break
        case 3:
            stars = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`
            break
        case 3.5:
            stars = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i>`
            break
        case 4:
            stars = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>`
            break
        case 4.5:
            stars = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>`
            break
        case 5:
            stars = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`
            break
        default:
            break;
    }
    let html = `
    <div class="info">
        <h2>${name}</h2>
        <img src=${img}>
        <h3>Address</h3>
        <h4><i class="fas fa-map-marker-alt">&nbsp; &nbsp;${address}, ${city} Coahuila, ${country}</i></h4>
        <h4>Star Rating: ${stars}</h4>
    </div>
    `
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
    let torreon = {lat: 25.5438900, lng:-103.4189800}
    map = new google.maps.Map(document.getElementById("map"), {
        center: torreon,
        zoom: 12,
        mapId: "4e2e0d4fb4188733"
    })
    hotels = stockData();

    const marker = new google.maps.Marker({
        position: torreon,
        map: map
    })

     infoWindow = new google.maps.InfoWindow();

 
}