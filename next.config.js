/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// https://github.com/facebookexperimental/Recoil/issues/733#issuecomment-925072943
// Temporary production fix for Recoil warning message
const intercept = require("intercept-stdout")

function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return ''
  }
  return text
}

// Intercept in dev and prod
intercept(interceptStdout)

module.exports = nextConfig
