const request = require('request')
const mapboxApi = "https://api.mapbox.com/geocoding/v5/mapbox.places/.json?access_token=pk.eyJ1IjoiZ3JlZ29yaXMiLCJhIjoiY2t6MWJhZXp6MGVqczJ3dDJrd3M4a2NxNSJ9.TEJyEZkK7v_07JUAr5Gvaw"
const weatherApi = 'http://api.weatherstack.com/current?access_key=23a2b28c79e141772b403b91548625dc&query='

const mapbox = (address, callback) => {

	let url = mapboxApi.slice(0, 50) + encodeURIComponent(address) + mapboxApi.slice(50)
	request({
		url,
		json: true
	}, (err, {
		body
	}) => {
		if (err) {
			callback('Unable to connect to to location services')
		} else if (body.features.length === 0) {
			callback("Provide an existing city")
		} else {
			callback(undefined, {
				longitude: body.features[0].geometry.coordinates[0],
				latitude: body.features[0].geometry.coordinates[1],
				location: body.features[0].place_name
			})
		}
	})
}

const weather = (latitude, longitude, callback) => {
	const url = `${weatherApi}${latitude},${longitude}`
	request({
		url,
		json: true
	}, (err, {
		body
	}) => {
		if (err) {
			callback('Unable to connect to to location services')
		} else if (body.error) {
			callback(body.error.info)
		} else {
			// console.log(body.location)
			// console.log('BREAK')
			// console.log(body.current)
			callback(undefined, body.location, body.current)
		}
	})
}

module.exports = {
	mapbox,
	weather
}
