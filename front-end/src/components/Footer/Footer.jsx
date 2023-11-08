import { BsDiscord, BsTwitter, BsGithub } from "react-icons/bs";
import "./Footer.scoped.css";
export default function Footer() {
  return (
    <footer>
      <ul className="social-icons">
        <li className="discord-icon">
          <a href="https://www.youtube.com/watch?v=UQBIjObgYak">
            <BsDiscord size={24} />
          </a>
        </li>
        <li className="twitter-icon">
          <a href="https://twitter.com/matcha_dating">
            <BsTwitter size={24} />
          </a>
        </li>
        <li className="github-icon">
          <a href="https://github.com/m3L4n/matcha">
            <BsGithub size={24} />
          </a>
        </li>
      </ul>
    </footer>
  );
}
