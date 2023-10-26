async function fetchUser({ queryKey }) {
  const url = `${import.meta.env.VITE_BACKEND_API_URL}/users/getInfo/${
    queryKey[1]
  }`;
  const options = {
    method: "GET",
    credentials: "include"
  };
  const res = await fetch(url, options);
  if (!res.ok) {
    return {};
  }
  return res.json();
}

export default fetchUser;
