import React, { useEffect, useState } from "react";
import "./App.css";
import LoginHomePage from "./components/LoginHomePage";
import { auth } from "./firebase";
import { googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((results) => {
      console.log(results);
      setIsSignedIn(true);
      localStorage.setItem("isSignedIn", true);
    });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LoginHomePage
              isSignedIn={isSignedIn}
              signInWithGoogle={signInWithGoogle}
              setIsSignedIn={setIsSignedIn}
            />
          }
        />
        <Route
          path="/chatRoom"
          element={<ChatRoom setIsSignedIn={setIsSignedIn} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
