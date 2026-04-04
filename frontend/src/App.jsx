import { useUser } from "@clerk/react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import ProblemPage from "./pages/ProblemPage";
import Problems from "./pages/Problems";
import SessionPage from "./pages/SessionPage";

function App() {
  const { isSignedIn, isLoaded } = useUser();
  // no flickering due to this
  if (!isLoaded) return null;
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />}
        />
        <Route
          path="/dashboard"
          element={isSignedIn ? <Dashboard /> : <Navigate to={"/"} />}
        />
        <Route
          path="/problems"
          element={isSignedIn ? <Problems /> : <Navigate to={"/"} />}
        />
        <Route
          path="/problem/:id"
          element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/session/:id"
          element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
