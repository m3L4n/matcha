import './BrowsingPage.scoped.css';
import { BsFilter, BsSearch } from 'react-icons/bs'
import dummy from './dummy_data.json'
import Card from './Card/Card'

export default function BrowsingPage() {
  const cards = dummy.map(user => <Card key={user.id} user={user} />)
  return (
    <>
      <header className='title'>
        <h1 className='header-title'>Matcha</h1>
      </header>
      <nav className="searchForm">
        <form action="">
          <input className='searchbar' placeholder='Search' />
          <button type="submit"><BsSearch size={16}/></button>
        </form>
        <div className='filter'> <BsFilter /> </div>  
      </nav>
      <section className='matches'>
        {cards}
      </section>
    </>
  );
}
