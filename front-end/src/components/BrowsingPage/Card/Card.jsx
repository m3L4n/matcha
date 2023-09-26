import PropTypes from "prop-types";
import LikeButton from "../../Global/LikeButton/LikeButton";
import './Card.scoped.css'

export default function Card({ id, username, age, city, profilePicture }) {
  return (
    <div className="card" style={{ backgroundImage: `url(${profilePicture})` }}>
      <div className="user-infos body-highlight">
        <p className="user-infos-username"> {username} </p>
        <p className="user-infos-age">{age}</p>
        <p> {city} </p>
      </div>
      <LikeButton id={id} />
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
};
