import { useState } from 'react';
import './BrowsingPage.scoped.css';
import Card from './Card/Card'
import SearchBar from './SearchBar/SearchBar';
import fetchMatches from './fetchMatches';
import { useQuery } from '@tanstack/react-query';

export default function BrowsingPage() {
  const [requestParams, setRequestParams] = useState({
    action: '',
    age: '',
    location: '',
    fame: '',
    tags: '',
  })
  const matches = useQuery(['details', requestParams], fetchMatches);

  if (matches.isLoading) {
    return (
      <div className="loadingMatches">
        <h2>
          Loadind matches
          <span className="loading__dot"></span>
          <span className="loading__dot"></span>
          <span className="loading__dot"></span>
        </h2>
      </div>
    )
  }

  const cards = matches.data.result.map(user => <Card
    key={user.id}
    id={user.id}
    username={user.username}
    age={user.age}
    profilePicture={"http://placekitten.com/253/300"}
    city={"Paris"}
  />)

  return (
    <>
      <header className='title'>
        <h1 className='header-title header'>Matcha</h1>
      </header>
      <SearchBar />
      <section className='matches'>
        {cards}
      </section>
    </>
  );
}
