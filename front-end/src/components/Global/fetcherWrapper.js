export async function fetcherWrapper(option, path, msgError, body = null) {
  const url = `${import.meta.env.VITE_BACKEND_API_URL}${path}`;
  const options = {
    method: option,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  };
  if (body != null) {
    options.body = JSON.stringify(body);
  }
  const res = await fetch(url, options);
  if (!res.ok) {
    const error = new Error(msgError);
    error.status = res.status;
    return error;
  }
  return res.json();
}
