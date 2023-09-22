exports.distanceBetweenTwoPoints = (positionA, positionB) => {
  // Haversine algorithm
  const EARTH_RADIUS = 6.3788;

  const latA = positionA.x / (180 / Math.PI);
  const latB = positionB.x / (180 / Math.PI);

  const longA = positionA.y / (180 / Math.PI);
  const longB = positionB.y / (180 / Math.PI);

  let distLong = longB - longA;
  let distLat = latB - latA;

  let a = Math.pow(Math.sin(distLat / 2), 2)
    + Math.cos(latA) * Math.cos(latB)
    * Math.pow(Math.sin(distLong / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  return (c * EARTH_RADIUS) * 1000;
}
