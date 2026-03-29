import { SignInButton, SignOutButton, UserButton } from "@clerk/react";
import React from "react";
import toast from "react-hot-toast";

function HomePage() {
  return (
    <div>
      <button
        className="btn btn-secondary"
        onClick={() => toast.success("test toast")}
      >
        Click Me
      </button>
      <SignInButton></SignInButton>
      <SignOutButton></SignOutButton>
      <UserButton />
    </div>
  );
}

export default HomePage;
