import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import Header from '@/components/Header.js';
import { useRouter } from 'next/router';
import '../styles/globals.css'
import Head from 'next/head'

const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]", "/"];

// Reference: https://clerk.com/docs/nextjs/pages-react
export default function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);

  // If the current route is listed as public, render it directly
  // Otherwise, use Clerk to require authentication
  return (<>  
    <Head>
      <title>To-do List</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>  
    <ClerkProvider {...pageProps}>
      <Header></Header>
      <main>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
      </main>
    </ClerkProvider>
  </>
  );
}