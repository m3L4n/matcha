async function fetchLocalisationiWithoutKnow() {
  const url = `https://api.ipify.org?format=json`;
  let ipAdress = await fetch(url);
  ipAdress = await ipAdress.json();
  const url1 = `https://ipapi.co/${ipAdress.ip}/json/`;
  const options1 = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  const res = await fetch(url1, options1);
  if (!res.ok) {
    throw new Error(`cant have the city name`);
  }
  return res.json();
}

export default fetchLocalisationiWithoutKnow;
