import { signIn, useSession } from "next-auth/react";
import { useEffect } from 'react'
import SpotifyWebApi from "spotify-web-api-node";

/**
 * Create instance of the spotify API. 
 * Not sure why importing from the lib doesn't work but this is a workaround.
 */
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
})

const useSpotify = () => {
  const { data: session, status } = useSession();

  /**
   * If the refresh token doesn't work while session is active, force the user to re-sign in.
   */
  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }
      spotifyApi.setAccessToken(session.user.accessToken)
    }
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
