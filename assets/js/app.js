mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JlZ29yaXMiLCJhIjoiY2t6MWJhZXp6MGVqczJ3dDJrd3M4a2NxNSJ9.TEJyEZkK7v_07JUAr5Gvaw';

const input = document.querySelector('#input')
const submit = document.querySelector('#submit')
const result = document.querySelector('.container-result')
const column = document.querySelector('#column')
const mapID = document.querySelector('#map')
const imagePath = '../images/';

// server side error
const errorCheck = (data) => {
	if (data.error) {
		map.style.display = 'none';
		result.innerHTML =
			/*html*/
			`<div id="con-error">
				<h4 style='color:red'>Internet connection error. ${data.error}</h4>
			</div>`;
	}
}

// display results
const displayInfo = (data) => {

	document.querySelector('#temperature').innerHTML = data.current.temperature
	document.querySelector('#feels_like').innerHTML = data.current.feelslike
	document.querySelector('#humidity').innerHTML = `${data.current.humidity}%`
	document.querySelector('#visability').innerHTML = data.current.visibility
	document.querySelector('#wind-speed').innerHTML = `${data.current.wind_speed}<small>mph</small>`
	document.querySelector('#weather-descriptions').innerHTML = data.current.weather_descriptions[0]

	imageBg(data)

	let city = data.location.split(',')
	result.innerHTML =
		/*html*/
		`<div id="search-result">
			<h1>${city[0]}</h1>
			<h2>${data.info.country}</h2>
			<h2>${data.current.temperature}&#176;C</h2>

			<h3>${data.current.is_day == 'yes' ? 'Day' : "Night"}: ${data.info.localtime.slice(10)}</h3>
		</div>`;
}

// image bg depending of the weather & day status
const snowWeather = [395, 392, 371, 368, 338, 335, 332, 329, 326, 323, 227, 179]
const rainWeather = [389, 386, 359, 356, 353, 314, 311, 308, 305, 302, 299, 296, 293, 176]
const sunnyWeather = [113, 116, 119, 122, 143, 182, 185, 200, 230, 248, 260, 263, 266, 281, 284, 317, 320, 350, 365, 374, 377]

const imageBg = (data) => {
	let img, mapType;

	if (data.current.is_day == "yes") {
		mapType = 'mapbox://styles/mapbox/navigation-day-v1'
		if (snowWeather.includes(data.current.weather_code)) {
			img = "snowing_day.jpg";
		} else if (rainWeather.includes(data.current.weather_code)) {
			img = "raining_day.jpg";
		} else if (sunnyWeather.includes(data.current.weather_code)) {
			img = "sunny_day.jpg";
		}

	} else if (data.current.is_day == "no") {
		mapType = "mapbox://styles/mapbox/navigation-night-v1"
		if (snowWeather.includes(data.current.weather_code)) {
			img = "snowing_night.jpg";
		} else if (rainWeather.includes(data.current.weather_code)) {
			img = "raining_night.jpg";
		} else if (sunnyWeather.includes(data.current.weather_code)) {
			img = "clear-sky_night.jpg";
		}

	}

	mapShow(data.info.lon, data.info.lat, mapType)
	document.body.style.backgroundImage = `url("${imagePath}${img}")`;
}

// map display
const mapShow = (lon, lat, style) => {

	const map = new mapboxgl.Map({
		container: 'map', // container ID
		style: style, // style URL
		center: [lon, lat], // starting position [lng, lat]
		zoom: 10 // starting zoom
	});
}

submit.addEventListener('click', (e) => {
	e.preventDefault()
		
	
	fetch(`http://127.0.0.1:3000/weather?address=${input.value}`)
	.then(res => res.json())
	.then(data => {
		
		column.style.display = 'block'
		errorCheck(data);
		
		displayInfo(data);
		
	})
	.catch(e => {
		column.style.display = 'block'
		
		result.innerHTML =
		/*html*/
		`<div id="user-error">
		<h4>Unexpected error!!!<h4>
		<p>Something went wrong. Try again.</p>
		</div>`
	})

})