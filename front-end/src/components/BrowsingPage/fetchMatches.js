const fetchMatches = async () => {
  const url = `${import.meta.env.VITE_BACKEND_API_URL}/users/matches`;
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    credentials: "include"
  };

  const response = await fetch(url, option);

  if (!response) {
    throw new Error("Can't get matches");
  }

  return response.json();
}

export default fetchMatches;
