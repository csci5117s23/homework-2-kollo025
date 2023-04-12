import { ClerkProvider, useUser, useAuth, SignIn, SignedOut, SignedIn} from '@clerk/nextjs'

export default function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  return (
    <>
      <h1>
        Sarah's To-do App
      </h1>
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <div>Hello! Need to redirect to /todos ??? </div>
      </SignedIn>
    </>
  )
}
