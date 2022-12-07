import './App.css';
import Map from './components/Map';
import SearchBar from './components/SearchBar';
import { Marker } from 'react-leaflet';
import { useState } from 'react';
import { Polyline } from 'react-leaflet/Polyline';

function App() {
	const [fromStation, setFromStation] = useState(null);
	const [toStation, setToStation] = useState(null);

	return (
		<>
			<SearchBar
				setFromStation={setFromStation}
				setToStation={setToStation}
				fromStation={fromStation}
				toStation={toStation}
			/>
			<Map>
				{fromStation && (
					<Marker position={[fromStation.BREITE, fromStation.LAENGE]} />
				)}
				{toStation && (
					<Marker position={[toStation.BREITE, toStation.LAENGE]} />
				)}
				{fromStation?.BREITE && toStation?.BREITE && (
					<Polyline
						color="red"
						positions={[
							[fromStation.BREITE, fromStation.LAENGE],
							[toStation.BREITE, toStation.LAENGE],
						]}
					/>
				)}
			</Map>
		</>
	);
}

export default App;
