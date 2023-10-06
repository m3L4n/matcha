import { useState } from 'react';
import './BrowsingPage.scoped.css';
import Card from './Card/Card'
import SearchBar from './SearchBar/SearchBar';
import { useQuery } from '@tanstack/react-query';

export default function BrowsingPage() {
  const [requestParams, setRequestParams] = useState({
    action: '',
    age: '',
    location: '',
    fame: '',
    tags: '',
  })

  const [filterParams, setFilterParams] = useState({
    sortBy: '',
    sortOption: '',
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ['matches', requestParams],
    queryFn: async ({ queryKey }) => {
      const { action, age, location, fame, tags } = queryKey[1];
      const url = `${import.meta.env.VITE_BACKEND_API_URL}/users/matches?action=${action}&age=${age}&location=${location}&fame=${fame}&tags=${tags}`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        credentials: "include"
      };

      const response = await fetch(url, options)

      if (!response) {
        throw new Error(`Can't get match: ${action}, ${age}, ${location}, ${fame}, ${tags}`);
      }

      return response.json();
    },
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
      <SearchBar requestParams={requestParams} setRequestParams={setRequestParams} setFilterParams={setFilterParams} />
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
