import { useAuth, SignIn, SignedOut, SignedIn} from '@clerk/nextjs'
import { useRouter } from 'next/router';

export default function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  // Reference: https://sourcefreeze.com/how-to-redirect-to-another-page-in-next-js/
  if(userId){
    const router = useRouter();
    router.push('/todos');
  }

  return (
    <>
      <h1>
        Sarah's To-do App
      </h1>
      <SignedOut>
        <SignIn redirectUrl={"/todos"}/>
      </SignedOut>
    </>
  )
}
