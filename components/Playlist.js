import { useSession, signOut } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react/";
import useSpotify from "../hooks/useSpotify";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import Songs from "./Songs";

const Content = () => {
  const { data: session } = useSession();
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const spotifyApi = useSpotify();

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
      setPlaylist(data.body)
    }).catch(error => console.log('Something went wrong!', error))
  }, [spotifyApi, playlistId])
  
  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <button onClick={() => signOut()} className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img
            className="rounded-full w-10 h-10"
            src={session?.user?.image}
            alt=""
          />
          <p className="text-white">{session?.user?.name}</p>
          <ChevronDownIcon className="h-5 w-5" />
        </button>
      </header>
      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black from-red-500 h-80 text-white p-8 w-full`}>
          <img
            className="h-44 w-44 shadow-2xl"
            src={playlist?.images?.[0]?.url}
            alt=""
          />
          <div>
            <p>PLAYLIST</p>
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
          </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Content;
