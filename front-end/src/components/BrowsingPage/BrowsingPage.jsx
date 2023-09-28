import { useState } from 'react';
import './BrowsingPage.scoped.css';
import Card from './Card/Card'
import SearchBar from './SearchBar/SearchBar';
import fetchMatches from './fetchMatches';
import { useQuery } from '@tanstack/react-query';

export default function BrowsingPage() {
  const [requestParams, setRequestParams] = useState({
    age: 10,
    action: '',
    location: 300,
    fame: 300,
    tags: '',
  })

  const result = useQuery(['details', requestParams], fetchMatches);
  const matches = result?.data?.result ?? [];

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

  const cards = matches.map(user => <Card
    key={user.id}
    id={user.id}
    username={user.username}
    age={user.age}
    profilePicture={`http://placekitten.com/${Math.floor(Math.random() * (280 - 250 + 1) + 250)}/${Math.floor(Math.random() * (350 - 300 + 1) + 300)}`}
    city={"Paris"}
  />)

  return (
    <>
      <header className='title'>
        <h1 className='header-title header'>Matcha</h1>
      </header>
      <SearchBar setRequestParams={setRequestParams} />
      <section className='matches'>
        {cards}
      </section>
    </>
  );
}
