import { notify } from "src/components/Global/toast-notify";

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
    const errorMsg = "Can't get any messages from this conversation";
    notify(errorMsg);
    throw new Error(errorMsg);
  }

  return response.json();
}

export default getMessages;
