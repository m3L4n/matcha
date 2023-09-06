import './BrowsingPage.scoped.css';
import { BsFilter, BsSearch } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg';
import dummy from './dummy_data.json'
import Card from './Card/Card'
import SearchBar from './SearchBar/SearchBar';
import { useState } from 'react';

export default function BrowsingPage() {
  const cards = dummy.map(user => <Card key={user.id} user={user} />)
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
