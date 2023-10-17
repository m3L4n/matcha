async function getChatPartner({ queryKey }) {
  const id = queryKey[1];
  const url = `${import.meta.env.VITE_BACKEND_API_URL}/users/${id}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    credentials: "include"
  };

  const response = await fetch(url, options);

  if (!response) {
    throw new Error("Can't get current chat partner");
  }

  return response.json();
}

export default getChatPartner;
