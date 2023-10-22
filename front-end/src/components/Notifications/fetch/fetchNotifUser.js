export async function fetchNotifUser() {
  const url = `${import.meta.env.VITE_BACKEND_API_URL}/notifications/`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    credentials: 'include',
  }
  const response = await fetch(url, options)

  if (!response) {
    throw new Error("Can't get notifications user")
  }

  return response.json()
}
