async function fetchLocalisation({ latitude, longitude }) {
    console.log(longitude, latitude)
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const res = await fetch(url, options)

    if (!res.ok) {
        throw new Error(`cant have the city name`)
    }
    return res.json()
}

export default fetchLocalisation