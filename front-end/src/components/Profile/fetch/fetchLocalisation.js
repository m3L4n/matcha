async function fetchLocalisation({ latitude, longitude }) {
  // const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
  const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`cant have the city name`);
  }
  return res.json();
}

export default fetchLocalisation;
