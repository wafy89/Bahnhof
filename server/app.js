const express = require('express');
const port = 5000;
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');

const distance = require('./utils/helpers');

// parse csv to JSON
const results = [];
fs.createReadStream('data2.csv')
	.pipe(csv({}))
	.on('data', (data) => results.push(data))
	.on('end', () => {
		console.log('CSV has been parsed');
	});

const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: ['POST', 'PUT', 'GET', 'DELETE'],
		credentials: true,
	})
);

// get distance
app.get('/api/v1/distance/:from/:to', (req, res) => {
	const { from, to } = req.params;
	const fromStation = results.find((item) => item.DS100 === from);
	const toStation = results.find((item) => item.DS100 === to);
	const lat1 = fromStation.BREITE;
	const lon1 = fromStation.LAENGE;
	const lat2 = toStation.BREITE;
	const lon2 = toStation.LAENGE;

	const d = distance({ lat1, lat2, lon1, lon2 });
	res.send({
		from: fromStation.NAME,
		to: toStation.NAME,
		distance: d,
		unit: 'km',
	});
});

// get station by name

app.get('/api/v1/station/:name', (req, res) => {
	const { name } = req.params;
	const stations = results.filter((station) =>
		station.NAME.toLowerCase().includes(name.toLowerCase())
	);
	res.send(stations);
});

app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});
