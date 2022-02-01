const functions = require('./utils/functions')

const location = process.argv[2]

if (location) {
	functions.mapbox(location, (err, {
		location,
		latitude,
		longitude
	} = {}) => {
		err ? console.log(err) : console.log(`Location: ${location}`)
		functions.weather(latitude, longitude, (err, {
			name,
			country
		}, {
			temperature,
			weather_descriptions,
			feelslike
		}) => {
			err
				? console.log(err)
				: console.log(
					`INFO`,
					'\r\n' + `Country: ${country}`,
					'\r\n' + `Temperature: ${temperature}`,
					'\r\n' + `Weather: ${weather_descriptions.toString()}`,
					'\r\n' + `Feeling: ${feelslike}`
				)
		})
	})
} else {
	console.log("Please provide some data.")
}