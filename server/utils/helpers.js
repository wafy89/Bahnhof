function distance({ lat1, lon1, lat2, lon2 }) {
	const φ1 = (lat1 * Math.PI) / 180,
		φ2 = (lat2 * Math.PI) / 180,
		Δλ = ((lon2 - lon1) * Math.PI) / 180,
		R = 6371;
	const d =
		Math.acos(
			Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)
		) * R;
	return Math.round(d);
}
module.exports = distance;
