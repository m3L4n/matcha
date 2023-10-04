import { useState } from 'react';
import './BrowsingPage.scoped.css';
import Card from './Card/Card'
import SearchBar from './SearchBar/SearchBar';
import fetchMatches from './fetchMatches';
import { useQuery } from '@tanstack/react-query';

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

  const { isLoading, error, data } = useQuery({
    queryKey: ['matches', requestParams],
    queryFn: fetchMatches,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="loadingMatches">
        <h2>
          Loading matches
          <span className="loading__dot"></span>
          <span className="loading__dot"></span>
          <span className="loading__dot"></span>
        </h2>
      </div>
    )
  }

  if (error) {
    return (
      <div className="matchesError">
        <h2>Cannot find any matches for you ... 💔</h2>
      </div>
    )
  }

  return (
    <>
      <header className='title'>
        <h1 className='header-title header'>Matcha</h1>
      </header>
      <SearchBar setRequestParams={setRequestParams} />
      <section className='matches'>
        {data.result.map((user) => {
          return (
            <Card
              key={user.id}
              id={user.id}
              username={user.username}
              age={user.age}
              profilePicture={`http://placekitten.com/${Math.floor(Math.random() * (280 - 250 + 1) + 250)}/${Math.floor(Math.random() * (350 - 300 + 1) + 300)}`}
              city={"Paris"}
            />)
        })}
      </section>
    </>
  );
}
