import PropTypes from "prop-types";
import './Card.scoped.css'
import { BsFillSuitHeartFill } from 'react-icons/bs'
import { useState } from "react";

export default function Card({ id, username, age, city, profilePicture }) {
  const [like, setLike] = useState(false);

  const toggleLike = async (id) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiverId: `${id}` }),
      credentials: "include"
    };

    if (!like)
      await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/match/create`, options);
    else {
      options.method = "PUT";
      await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/match/unlike`, options)
    }
    setLike(!like)
  }

  return (
    <div className="card" style={{ backgroundImage: `url(${profilePicture})` }}>
      <div className="user-infos body-highlight">
        <p className="user-infos-username"> {username} </p>
        <p className="user-infos-age">{age}</p>
        <p> {city} </p>
      </div>
      <button onClick={() => toggleLike(id)}
        onMouseMove={e => {
          e.stopPropagation();
          let x = e.nativeEvent.offsetX;
          let y = e.nativeEvent.offsetY;

          let boxWidth = e.target.clientWidth;
          let boxHeight = e.target.clientHeight;
          let moveX = (x - boxWidth / 1.5);
          let moveY = (y - boxHeight / 1.5);

          e.target.style.transform = `translate(${moveX * 0.4}px,${moveY * 0.4}px)`;
        }}
        onMouseOut={e => {
          e.stopPropagation();
          e.target.style.transform = 'translate(0px, 0px)';
        }}
        className={`like-button ${like ? 'like-button-active' : ''}`}>
        <BsFillSuitHeartFill size={32}

          onMouseMove={e => {
            e.stopPropagation();
            e.target.style.transform = '';
          }}
        />
      </button>
    </div>
  );
}

Card.propTypes = {
  username: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
};
