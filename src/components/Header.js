import {ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
  
export default function Header() {
  return (
    <header
    style={{ display: "flex", justifyContent: "space-between", padding: 20 }}
    >
    <h1>To-dos</h1>
    <SignedIn>
      <UserButton />
    </SignedIn>
    </header>
  );
}