import './Footer.css';
import { BsDiscord, BsGithub, BsTwitter } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer>
      <p>
        <a href='https://github.com/m3L4n/matcha'><BsDiscord /></a> 
        <a href='https://github.com/m3L4n/matcha'><BsGithub /></a> 
        <a href='https://github.com/m3L4n/matcha'><BsTwitter /></a> 
      </p>
    </footer>
  );
}
