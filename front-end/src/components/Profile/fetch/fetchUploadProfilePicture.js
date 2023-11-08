async function fetchUploadprofilPicture(picture) {
  const formData = new FormData();
  formData.append("profilePicture", picture);
  const url = "http://localhost:4000/users/uploadProfilePicture";
  const options = {
    method: "POST",
    credentials: "include",
    body: formData
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      if (res.status == 400) {
        throw {
          status: 400,
          msg:
            "your profile picture is not jpg/png/gif, please retry with image with this extensiion"
        };
      } else if (res.status == 404) {
        throw {
          status: 404,
          msg: " something want wrong on upload picture, please retry"
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

export default fetchUploadprofilPicture;
