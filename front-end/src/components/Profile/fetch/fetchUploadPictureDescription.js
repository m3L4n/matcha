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
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`cant upload picture description`);
  }
  return res.json();
}

export default fetchUploadPictureDescription;
