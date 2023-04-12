import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import Header from '@/components/Header.js';
import { useRouter } from 'next/router';
import '../styles/globals.css'

const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]", "/"];

// Reference: https://clerk.com/docs/nextjs/pages-react
export default function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);

  // If the current route is listed as public, render it directly
  // Otherwise, use Clerk to require authentication
  return (
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
  );

  // return (
  //   <ClerkProvider {...pageProps} >
  //     <Header></Header>
  //     <Component {...pageProps} />
  //   </ClerkProvider>
  // );
}