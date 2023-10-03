async function fetchUser({ queryKey }) {
    console.log(import.meta.env.VITE_BACKEND_API_URL, queryKey[1])
    const url = `${import.meta.env.VITE_BACKEND_API_URL}/users/${queryKey[1]}`
    const options = {
        method: 'GET',
        credentials: 'include',
    }
    const res = await fetch(url, options)
    if (!res.ok) {
        throw new Error(`cant get the user please rety later`)
    }
    return res.json()
}

export default fetchUser
