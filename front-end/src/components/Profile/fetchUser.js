async function fetchUser({ id }) {
    const url = `http://localhost:4000/users/${id}`
    const options = {
        method: 'GET',
        credentials: 'include',
    }
    const res = await fetch(url, options)
    if (!res.ok) {
        throw new Error(`cant get the user`)
    }
    return res.json()
}

export default fetchUser
