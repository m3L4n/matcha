async function fetchUploadprofilPicture(picture) {
    const formData = new FormData()
    formData.append('profilePicture', picture)
    const url = 'http://localhost:4000/users/uploadProfilePicture'
    const options = {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }
    const res = await fetch(url, options)
    if (!res.ok) {
        throw new Error(`cant have all enum`)
    }
    return res.json()
}

export default fetchUploadprofilPicture
