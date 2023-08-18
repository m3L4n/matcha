import './BrowsingPage.css';
import { BsFilter } from 'react-icons/bs'

export default function BrowsingPage() {
  return (
    <>
      <header>
        <h1 className='header'>Matcha</h1>
      </header>
      <nav>
        <input className='searchbar' placeholder='Search' />
        <div className='filter'> <BsFilter /> </div>  
      </nav>
    </>
  );
}
