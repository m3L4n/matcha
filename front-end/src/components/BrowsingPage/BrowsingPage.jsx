import { useState } from 'react';
import './BrowsingPage.scoped.css';
import Card from './Card/Card'
import SearchBar from './SearchBar/SearchBar';
import fetchMatches from './fetchMatches';
import { useQuery } from '@tanstack/react-query';
import { notify } from '../Global/toast-notify';

export default function BrowsingPage() {
  const [requestParams, setRequestParams] = useState({
    action: '',
    age: 10,
    ageSort: '',
    location: 300,
    locationSort: '',
    fame: 300,
    fameSort: '',
    tags: '',
    tagsSort: '',
  })

  const result = useQuery(['details', requestParams], fetchMatches);

  if (result.isLoading) {
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

  if (result.error) {
    notify("error", "Error when fetching matches");
    return (
      <div className="matchesError">
        <h2>Cannot find any matches for you ... 💔</h2>
      </div>
    )
  }

  const matches = result?.data?.result ?? [];
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
