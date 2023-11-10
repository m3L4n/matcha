import React from "react";
import "./UserPictures.scoped.css";
import { checkMymeType } from "components/Global/checkMymeType";
import { notify } from "components/Global/toast-notify";
export default function UserPictures({ pictureDescription, ourProfile, updatePictures }) {
  function handleMultipleFile(event) {
    console.log(event, event.target.files, pictureDescription);
    if (event.target.files.length == 0) {
      return;
    }
    if (checkMymeType(event.target.files[0]) > 0) {
      let clone = structuredClone(pictureDescription);
      if (clone == null) {
        clone = [];
      }
      if (clone.length >= 4) {
        notify("warning", "you cant have more than 4 image");
        return;
      }
      clone.push(event.target.files[0]);
      updatePictures(clone);
      event.target.value = "";
      notify("success", "upload successfull");
      return;
    }
  }
  const ShowImage = (elem, index) => {
    let preview = elem;
    if (elem instanceof File) {
      preview = URL.createObjectURL(elem);
    }

    const deleteImage = (event) => {
      let value = event.target.value;
      let name = event.target.name;
      if (value == undefined) {
        value = event.currentTarget.value;
      }
      if (name == undefined) {
        name = event.currentTarget.name;
      }
      const tmpPictures = structuredClone(pictureDescription);
      tmpPictures.splice(value, 1);
      updatePictures(tmpPictures);
    };
    return (
      <div className="container-picture__picture">
        {ourProfile && (
          <button className="picture-delete title-1" onClick={deleteImage} value={index}>
            X
          </button>
        )}
        <img src={preview} alt="`img${index}`" />
      </div>
    );
  };
  return (
    <div className="Lcontainer-userPictures">
      {ourProfile && (
        <>
          <label htmlFor="image-description" className="title-1">
            upload your photo
          </label>
          <input type="file" id="image-description" accept="image/*" disabled={ourProfile ? false : true} onChange={handleMultipleFile} />
        </>
      )}
      <div id="body-picture-list" className="container-picture">
        {pictureDescription?.map((elem, index) => {
          return <React.Fragment key={index}>{ShowImage(elem, index)}</React.Fragment>;
        })}
      </div>
    </div>
  );
}
