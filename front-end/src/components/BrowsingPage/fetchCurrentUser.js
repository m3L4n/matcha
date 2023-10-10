async function getCurrentUser() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    credentials: "include"
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/users/whoami`,
    options
  );

  if (!response) {
    throw new Error(`Can't get current user ensure you're connected`);
  }

  return response.json();
}

export default getCurrentUser;
