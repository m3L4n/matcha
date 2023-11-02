import { notify } from "../Global/toast-notify";

async function getConversations() {
  const url = `${import.meta.env.VITE_BACKEND_API_URL}/conversation`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    credentials: "include"
  };

  const response = await fetch(url, options);

  if (!response) {
    const errorMsg = "Can't get conversations";
    notify(errorMsg);
    throw new Error(errorMsg);
  }

  return response.json();
}

export default getConversations;
