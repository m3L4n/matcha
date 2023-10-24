async function getMessages({ queryKey }) {
  const conversationId = queryKey[1];
  const url = `${
    import.meta.env.VITE_BACKEND_API_URL
  }/message/${conversationId}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    credentials: "include"
  };

  const response = await fetch(url, options);

  if (!response) {
    throw new Error("Can't get any messages from this conversation");
  }

  return response.json();
}

export default getMessages;
