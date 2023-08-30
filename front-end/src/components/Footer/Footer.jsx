import './Footer.scoped.css';
import { BsDiscord, BsGithub, BsTwitter } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer>
      <p>
        <a href='https://github.com/m3L4n/matcha' title='discord'><BsDiscord /></a> 
        <a href='https://github.com/m3L4n/matcha' title='github'><BsGithub /></a> 
        <a href='https://github.com/m3L4n/matcha' title='twitter'><BsTwitter /></a> 
      </p>
    </footer>
  );
}
