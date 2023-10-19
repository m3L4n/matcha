import PropTypes from "prop-types";
import { BsFillSuitHeartFill } from "react-icons/bs";
import "./LikeButton.scoped.css";
import { useEffect, useState } from "react";

const LikeButton = ({ id, width = 0, height = 0, sizeIcon = 32, likeProps = false }) => {
  const [like, setLike] = useState(likeProps);
  useEffect(() => {
    if (width && height) {
      const buttonElement = document.querySelector(".like-button");
      if (buttonElement) {
        buttonElement.style.width = width;
        buttonElement.style.height = height;
      }
    }
  }, []);
  const toggleLike = async (event, id) => {
    event.stopPropagation();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiverId: `${id}` }),
      credentials: "include",
    };

    if (!like) await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/match/create`, options);
    else {
      options.method = "PUT";
      await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/match/unlike`, options);
    }
    setLike(!like);
  };
  return (
    <button
      onClick={(event) => toggleLike(event, id)}
      onMouseMove={(e) => {
        e.stopPropagation();
        let x = e.nativeEvent.offsetX;
        let y = e.nativeEvent.offsetY;

        let boxWidth = e.target.clientWidth;
        let boxHeight = e.target.clientHeight;
        let moveX = x - boxWidth / 1.5;
        let moveY = y - boxHeight / 1.5;

        e.target.style.transform = `translate(${moveX * 0.4}px,${moveY * 0.4}px)`;
      }}
      onMouseOut={(e) => {
        e.stopPropagation();
        e.target.style.transform = "translate(0px, 0px)";
      }}
      className={`like-button ${like ? "like-button-active" : ""}`}
      value="button"
    >
      <BsFillSuitHeartFill
        size={sizeIcon}
        value="button"
        onMouseMove={(e) => {
          e.stopPropagation();
          e.target.style.transform = "";
        }}
      />
    </button>
  );
};

LikeButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default LikeButton;
