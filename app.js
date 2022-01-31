const functions = require('./utils/functions')

const location = process.argv[2]

if (location) {
	functions.mapbox(location, (err, data) => {
		err ? console.log(err) : console.log(data)
		functions.weather(data.latitude, data.longitude, (err, data) => {
			err ? console.log(err) : console.log(data)
		})
	})
}else{
	console.log("Please provide some data.")
}