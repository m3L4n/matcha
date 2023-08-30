import PropTypes from "prop-types";
import './Card.scoped.css'
import { BsFillSuitHeartFill } from 'react-icons/bs'

export default function Card({user}) {
  return (
    <div className="card" style={{ backgroundImage: `url(${user.profilePicture})`}}>
      <div className="user-infos body-highlight">
        <p> {user.firstName} {user.age} </p>
        <p> {user.city} </p>
      </div>
      <div className="like-button"> <BsFillSuitHeartFill size={36}/> </div>
    </div>
  );
}

Card.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
  }).isRequired,
};
