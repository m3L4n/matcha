import { BsDiscord, BsTwitter, BsGithub } from 'react-icons/bs';
import "./Footer.scoped.css";
export default function Footer() {
  return (
    <footer>
      <ul className="social-icons">
        <li className='discord-icon'><a href="#"><BsDiscord size={24} /></a></li>
        <li className='twitter-icon'><a href="#"><BsTwitter size={24} /></a></li>
        <li className='github-icon'><a href="#"><BsGithub size={24} /></a></li>
      </ul>
    </footer>
  )
}
