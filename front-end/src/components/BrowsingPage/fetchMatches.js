const fetchMatches = async ({ queryKey }) => {
  const { action, age, location, fame, tags, ageSort, locationSort, fameSort, tagsSort } = queryKey[1];
  const url = `${import.meta.env.VITE_BACKEND_API_URL}/users/matches?action=${action}&age=${age}&location=${location}&fame=${fame}&tags=${tags}&ageSort=${ageSort}&locationSort=${locationSort}&fameSort=${fameSort}&tagsSort=${tagsSort}`;

  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    credentials: "include"
  };

  const response = await fetch(url, option);

  if (!response) {
    throw new Error(`Can't get match: ${action}, ${age}, ${location}, ${fame}, ${tags}`);
  }

  return response.json();
}

export default fetchMatches;
