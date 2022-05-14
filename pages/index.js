import Head from 'next/head'
import Playlist from '../components/Playlist'
import Player from '../components/Player'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Playlist />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}
