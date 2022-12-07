import React from 'react';
import { TileLayer, MapContainer } from 'react-leaflet';
function Map({ children }) {
	return (
		<div className="container">
			<MapContainer
				className="map-container"
				center={[51.165691, 10.451526]}
				zoom={8}
				scrollWheelZoom={false}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>

				{children}
			</MapContainer>
		</div>
	);
}

export default Map;
