import { notify } from "src/components/Global/toast-notify";

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
    const errorMsg = "Can't get current chat partner";
    notify(errorMsg);
    throw new Error(errorMsg);
  }

  return response.json();
}

export default getChatPartner;
