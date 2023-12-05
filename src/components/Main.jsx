import React from 'react'
import ListBox from './ListBox';
import WatchedBox from './WatchedBox';

function Main({ data1, data2 }) {
  return (
    <main className="main">
      <ListBox data1={data1} />
      <WatchedBox data2={data2} />
    </main>
  )
  }
export default Main