async function fetchUpdateInfo(infoProfile) {
    const url = 'http://localhost:4000/users/updateInfoProfile'
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(infoProfile),
    }
    const res = await fetch(url, options)
    if (!res.ok) {
        throw new Error(`cant change information`)
    }
    return res.json()
}

export default fetchUpdateInfo
