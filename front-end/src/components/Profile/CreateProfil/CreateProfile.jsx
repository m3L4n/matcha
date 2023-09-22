import React from 'react'
import { useState } from 'react'
import { notify } from 'components/Global/toast-notify';
import "../Profile.scoped.css"
import { useEffect } from 'react';

export default function CreateProfile() {
  const [ infoProfile, setInfoProfil] = useState({});
  const [ image, setImage ] = useState();
  const maxSize = 40000;
  const validExt = ["gif", "png", "jpg", "jpeg"];
  
  useEffect(() => {
    getImageProfil();
  }, [])

  function getImageProfil(){
    const options = {
      method: "GET",
      credentials: "include",
    };
    fetch("http://localhost:4000/users/profil-picture", options)
    .then(response => {
      if (response.status == 201) {
        notify("sucess", "your acount is created, please verify your email");
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // const image = data.imageProfile.profile_picture;
      // const buffer = Buffer.from(image.data);
      // const base64String = buffer.toString('base64');
      // const dataURL = `data:image/jpeg;base64,${base64String}`;
      setImage(data);

      if (data.msg == "token not created") {
        notify(
          "error",
          "please retry later, a error appear and we are on this work"
        );
      } else if (data.msg == 'Details are not correct"') {
        notify(
          "error",
          "email or username are already token , please retry with another "
        );
      }
    })
    .catch(error => console.log(error));

  }
  function handlePicture(event){
    const file = event.target.files[0];
    const extn = file.type.split('/')[1];
    if ((validExt.findIndex((elem) => elem == extn) == -1)){
      notify("warning", "extension is not good, you have to use ", validExt.join(",")); 
      return ;
    }
    if ( file.size > maxSize){
      notify("warning", "image are too big, please retry with lighter image");
      return ;
    } 
   onSubmitImg(file)
  }
  function onSubmitImg(image) {
    const formData = new FormData();
    formData.append('image', image);
    const options = {
      method: "POST",
      credentials: "include",
      body:formData
    };
    fetch("http://localhost:4000/users/upload-image", options)
    .then(response => {
      if (response.status == 201) {
        notify("sucess", "your acount is created, please verify your email");
      }
      return response.json();
    })
    .then(data => {
      if (data.msg == "token not created") {
        notify(
          "error",
          "please retry later, a error appear and we are on this work"
        );
      } else if (data.msg == 'Details are not correct"') {
        notify(
          "error",
          "email or username are already token , please retry with another "
        );
      }
    })
    .catch(error => console.log(error));
  }
  return (
    <div className='container'>

      <header className='container-header'>
      <h1> MATCHA
         </h1>
      </header>
      <div className='container-body'>
      <img src={image} alt="Image" />
        <input type='file' accept="image/*" onChange={handlePicture} />
      </div>
    </div>
  )
}
