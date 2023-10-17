async function getMatches({ queryKey }) {
    const { action, age, location, fame, tags } = queryKey[1]
    const url = `${
        import.meta.env.VITE_BACKEND_API_URL
    }/users/matches?action=${action}&age=${age}&location=${location}&fame=${fame}&tags=${tags}`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        credentials: 'include',
    }

    const response = await fetch(url, options)

    if (!response) {
        throw new Error(
            `Can't get match: ${action}, ${age}, ${location}, ${fame}, ${tags}`
        )
    }

    return response.json()
}

export default getMatches
