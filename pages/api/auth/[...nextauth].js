import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "/lib/spotify";

/**
 * Refreshes access token if it has expired within the 1 hour period that was allocated.
 * 
 * @param {*} token 
 * @returns {Object} - JWT
 */
const refreshAccessToken = async (token) => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("Refreshed token is", refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expired_in * 1000, // Expires in 1 hour from now.
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // Only update if needed (revoked or something)
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

/**
 * Basic setup from next-auth docs.
 */
export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      //   Initial Sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, // Convert expiration time to MS.
        };
      }

      // Return previous token if the access is not expired yet.
      if (Date.now() < token.accessTokenExpires) {
        console.log("Existing access token is still valid.");
        return token;
      }

      // Access token has expired, we need to refresh
      console.log("Access Token has expired. Refreshing...");
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
  
      return session;
    },
  },
});
