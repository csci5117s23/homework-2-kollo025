import { ClerkProvider } from '@clerk/nextjs';

// Importing global stylesheet - https://nextjs.org/docs/basic-features/built-in-css-support
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps} >
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;