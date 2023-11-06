import PropTypes from "prop-types";
import LikeButton from "components/Global/LikeButton/LikeButton";
import { useNavigate } from "react-router-dom";
import "./Card.scoped.css";

export default function Card({ id, username, age, city, profilePicture }) {
  const navigate = useNavigate();

  const navigateToProfile = (id) => navigate(`/profile/${id}`);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div to={`/profile/${id}`} className="card" style={{ backgroundImage: `url(${profilePicture})` }} value="div" onClick={() => navigateToProfile(id)}>
      <div className="user-infos body-highlight">
        <p className="user-infos-username"> {username} </p>
        <p className="user-infos-age">{age}</p>
        <p> {city} </p>
      </div>
      <div className="user-infos-like">
        <LikeButton id={id} />
      </div>
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
