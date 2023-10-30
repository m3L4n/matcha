async function fetchRelationships({ queryKey }) {
  const url = `${import.meta.env.VITE_BACKEND_API_URL}/match/${queryKey[1]}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  };
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`cant block this user`);
  }
  return res.json();
}

export default fetchRelationships;
