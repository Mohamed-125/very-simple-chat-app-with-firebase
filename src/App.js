import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import LoginHomePage from "./components/LoginHomePage";
import { auth } from "./firebase";
import { googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { HashRouter, Routes, Route } from "react-router-dom";
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
  useEffect(() => {
    if (isSignedIn) {
      window.location.href = "/chatRoom";
      console.log("fsdfs");
    }
  }, [isSignedIn]);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LoginHomePage
              signInWithGoogle={signInWithGoogle}
              setIsSignedIn={setIsSignedIn}
            />
          }
        />
        <Route
          path={"/chatRoom"}
          element={<ChatRoom setIsSignedIn={setIsSignedIn} />}
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
