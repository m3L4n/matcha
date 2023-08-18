import './BrowsingPage.css';
import { BsFilter } from 'react-icons/bs'
import dummy from './dummy_data.json'
import Card from './Card/Card'

export default function BrowsingPage() {
  console.log(`Parent: ${dummy[0].firstName}`);
  return (
    <>
      <header>
        <h1 className='header'>Matcha</h1>
      </header>
      <nav>
        <input className='searchbar' placeholder='Search' />
        <div className='filter'> <BsFilter /> </div>  
      </nav>
      <section>
        <Card user={dummy[0]} />
      </section>
    </>
  );
}
