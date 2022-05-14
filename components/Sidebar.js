import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  HeartIcon,
  RssIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Link from 'next/link'

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const { data: session, status } = useSession();
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  console.log(playlists);

  return (
    <div className="text-gray-500 p-5 border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide text-xs lg:text-sm sm:min-w-[12rem] lg:min-w-[15rem] hidden md:inline-flex">
      <div className="space-y-4">
        <Link href="/">
          <a className="flex items-center space-x-2 hover:text-white focus:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
          </a>
        </Link>
        <button className="flex items-center space-x-2 hover:text-white focus:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <Link href="/library">
          <a className="flex items-center space-x-2 hover:text-white focus:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
          </a>
        </Link>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white focus:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {playlists.map((playlist) => (
          <p 
            key={playlist.id} 
            className="cursor-pointer hover:text-white focus:text-white"
            onClick={() => setPlaylistId(playlist.id)}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
