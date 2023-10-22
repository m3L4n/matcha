export async function fetchCreateProfilViewHistory({ paramId: id_watched }) {
  console.log(id_watched)
  const url = `${import.meta.env.VITE_BACKEND_API_URL}/views`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    credentials: 'include',
    body: JSON.stringify({ id_watched: id_watched }),
  }
  const response = await fetch(url, options)

  if (!response) {
    throw new Error("Can't create profil view History")
  }

  return response.json()
}
