async function fetchBlockUser({ id, block }) {
    console.log(block, typeof block)
    const test = { block }
    console.log(test)
    const url = `${import.meta.env.VITE_BACKEND_API_URL}/match/block/${id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ block }),
    }
    const res = await fetch(url, options)

    if (!res.ok) {
        throw new Error(`cant block this user`)
    }
    return res.json()
}

export default fetchBlockUser
