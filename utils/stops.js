export async function getStops() {
  const stopsRequest = await fetch('https://krakowpodreka.pl/en/stops/positions/stops/');
  const stops = await stopsRequest.json();
  return stops;
}

export function closestStops(stops, myLatitude, myLongitude) {
  const stopsWithDistance = stops.map(stop => stopWithDistance(stop, myLatitude, myLongitude));
  const sortedStops = stopsWithDistance.sort((dist1, dist2) => dist1.distance - dist2.distance);
  const fewStops = sortedStops.slice(0, 10);
  return fewStops;
}

function stopWithDistance(stop, myLatitude, myLongitude) {
  const { latitude, longitude, id, display, type } = stop;
  return {
    id,
    display,
    type,
    distance: distance(myLatitude, myLongitude, latitude, longitude),
  };
}

function distance(myLat, myLong, stopLat, stopLong) {
  const lat = myLat - stopLat;
  const long = myLong - stopLong;
  return Math.sqrt(lat * lat + long * long);
}
