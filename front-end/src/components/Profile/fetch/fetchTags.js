async function fetchTags() {
  const url = "http://localhost:4000/tags";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  };
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`cant have all enum`);
  }
  return res.json();
}

export default fetchTags;
