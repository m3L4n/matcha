async function getConversations() {
    const url = `${import.meta.env.VITE_BACKEND_API_URL}/conversation`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        credentials: 'include',
    }

    const response = await fetch(url, options)

    if (!response) {
        throw new Error("Can't get conversations")
    }

    return response.json()
}

export default getConversations
