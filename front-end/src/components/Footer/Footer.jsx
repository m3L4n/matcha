import { BsDiscord, BsTwitter, BsGithub } from "react-icons/bs";
import "./Footer.scoped.css";
export default function Footer() {
  return (
    <footer>
      <ul className="social-icons">
        <li className="discord-icon">
          <a href="https://www.youtube.com">
            <BsDiscord size={24} />
          </a>
        </li>
        <li className="twitter-icon">
          <a href="https://www.youtube.com">
            <BsTwitter size={24} />
          </a>
        </li>
        <li className="github-icon">
          <a href="https://www.youtube.com">
            <BsGithub size={24} />
          </a>
        </li>
      </ul>
    </footer>
  );
}
