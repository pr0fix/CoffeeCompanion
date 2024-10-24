/*
Formats a distance value into a more visually appealing string.
If the distance is 1000 meters or more, it converts the distance to kilometers.
Otherwise, it returns the distance in meters.
*/
const formatDistance = (distance) => {
  return distance >= 1000
    ? (distance / 1000).toFixed(1) + " km"
    : distance.toString() + " m";
};

export default formatDistance;
