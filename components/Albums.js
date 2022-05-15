import { useSession, signOut } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react/";
import useSpotify from "../hooks/useSpotify";
import { albumListState } from "../atoms/albumAtom";
import Album from '/components/Album'

const Albums = () => {
  const { data: session } = useSession();
  const [albums, setAlbums] = useState([])
  const spotifyApi = useSpotify();

  useEffect(() => {
    spotifyApi.getMySavedAlbums({limit: 40}).then((data) => {
        console.log(data.body)
      setAlbums(data.body.items)
    }).catch(error => console.log('Something went wrong!', error))
  }, [spotifyApi])
  
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

      <div className="my-36 text-white px-8 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
          {albums.map((album, i) => (
              <Album key={i} album={album.album}/>
          ))}
      </div>
    </div>
  );
};

export default Albums;