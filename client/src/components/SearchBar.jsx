import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

function SearchBar({ setFromStation, setToStation, fromStation, toStation }) {
	const [inputValue, setValue] = useState('');
	const [distanceDetails, setDistanceDetails] = useState(null);

	const handleInputChange = (value) => {
		setValue(value);
	};

	const handleFromChange = (value) => {
		setFromStation(value);
	};
	const handleToChange = (value) => {
		setToStation(value);
	};

	const promiseOptions = (inputValue) =>
		new Promise((resolve) => {
			setTimeout(() => {
				if (inputValue.length < 4) return;
				axios
					.get(`http://localhost:5000/api/v1/station/${inputValue}`)
					.then((res) => {
						resolve(res.data);
					});
			}, 1000);
		});

	useEffect(() => {
		if (fromStation?.DS100 && toStation?.DS100) {
			axios
				.get(
					`http://localhost:5000/api/v1/distance/${fromStation.DS100}/${toStation.DS100}`
				)
				.then((res) => {
					setDistanceDetails(res.data);
				});
		}
	}, [fromStation?.DS100, toStation?.DS100]);

	return (
		<div className="searchBar">
			<div className="field">
				<label> From:</label>
				<AsyncSelect
					className="select"
					cacheOptions
					defaultOptions
					value={fromStation}
					getOptionLabel={(e) => e.NAME}
					getOptionValue={(e) => e.DS100}
					loadOptions={promiseOptions}
					onInputChange={handleInputChange}
					onChange={handleFromChange}
				/>
			</div>
			<div className="field">
				<label> to:</label>
				<AsyncSelect
					className="select"
					cacheOptions
					defaultOptions
					value={toStation}
					getOptionLabel={(e) => e.NAME}
					getOptionValue={(e) => e.DS100}
					loadOptions={promiseOptions}
					onInputChange={handleInputChange}
					onChange={handleToChange}
				/>
			</div>
			{distanceDetails && (
				<p>
					the Distance between {distanceDetails.from} to {distanceDetails.to} is{' '}
					{distanceDetails.distance} {distanceDetails.unit}
				</p>
			)}
		</div>
	);
}

export default SearchBar;
