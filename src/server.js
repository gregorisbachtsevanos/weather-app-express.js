const path = require('path')

const express = require('express');
const app = express();
const hbs = require('hbs')

const functions = require('./utils/functions')

const appFiles = path.join(__dirname, '../assets')
const appViews = path.join(__dirname, '../template/views/')
const appCommon = path.join(__dirname, '../template/common')

app.set('view engine', 'hbs')
app.set('views', appViews)
hbs.registerPartials(appCommon)

app.use(express.static(appFiles))

app.get('', (req, res) => {
	res.render("index", {
		title: 'Search for a location'
	})
})

// testing url (?address=*)
app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send("No address provided")
	}

	functions.mapbox(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error)
			return res.send({ error })

		functions.weather(latitude, longitude, (error, info, current) => {
			if (error)
				return res.send({ error })

			res.send({
				current,
				info,
				location,
			})

		})

	})

})

app.get('*', (req, res) => {
	res.render('404', {
		title: "404 | Not Found"
	})
})

app.listen(3000, () => {
	console.log("Server listening...")
})