async function fetchUpdateInfo(infoProfile) {
  const url = `${import.meta.env.VITE_BACKEND_API_URL}/users/updateInfoProfile`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(infoProfile)
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      if (res.status == 400) {
        throw { status: 400, msg: "email must be unique" };
      } else if (res.status == 404) {
        throw { status: 404, msg: " something want wrong, please retry" };
      } else if (res.status == 401) {
        throw { status: 401, msg: "you need to be connected" };
      }
    }
    return res.json();
  } catch (error) {
    const returnError = {
      status: error.status,
      msg: error.msg,
      error: true
    };
    return returnError;
  }
}

export default fetchUpdateInfo;
