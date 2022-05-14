import React from 'react'
import Albums from '../components/Albums'
import Player from '../components/Player'
import Sidebar from '../components/Sidebar'

const gallery = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
        <main className="flex">
            <Sidebar />
            <Albums />
        </main>
        <div className="sticky bottom-0">
            <Player />
        </div>
    </div>
  )
}

export default gallery