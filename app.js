const functions = require('./utils/functions')

const location = process.argv[2]

if (location) {
	functions.mapbox(location, (err, { location, latitude, longitude }) => {
		err ? console.log(err) : console.log(location)
		functions.weather(latitude, longitude, (err, { name, country }, { temperature, weather_descriptions, feelslike }) => {
			err ? console.log(err) : console.log(name, country, temperature, weather_descriptions.toString(), feelslike)
		})
	})
}else{
	console.log("Please provide some data.")
}