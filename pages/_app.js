import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from 'recoil'


// https://github.com/facebookexperimental/Recoil/issues/733#issuecomment-925072943
// Temporary production fix for Recoil warning message
const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    let n = args[0];
    if (n in cache) {
      return cache[n];
    }
    else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  }
}

const mutedConsole = memoize((console) => ({
  ...console,
  warn: (...args) => args[0].includes('Duplicate atom key')
    ? null
    : console.warn(...args)
}))

global.console = mutedConsole(global.console);

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  ) 
}

export default MyApp
