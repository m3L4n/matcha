async function fetchUploadPictureDescription(pictures) {
  const formData = new FormData();
  for (let i = 0; i < pictures.length; i++) {
    formData.append("images", pictures[i]);
  }
  const url = "http://localhost:4000/users/uploadPictureDescription";
  const options = {
    method: "POST",
    credentials: "include",
    body: formData
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      if (res.status == 400) {
        throw { status: 400, msg: "email must be unique" };
      } else if (res.status == 404) {
        throw {
          status: 404,
          msg:
            " something want wrong with upload pictures description, please retry"
        };
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

export default fetchUploadPictureDescription;
