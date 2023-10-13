async function fetchReportFakeAccount({ id }) {
    const url = `${
        import.meta.env.VITE_BACKEND_API_URL
    }/users/reportFakeAccount/${id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }
    const res = await fetch(url, options)

    if (!res.ok) {
        throw new Error(`cant report this user`)
    }
    return res.json()
}

export default fetchReportFakeAccount
