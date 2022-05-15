import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LoginHomePage = ({ signInWithGoogle, isSignedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isSignedIn) {
      navigate("/chatRoom");
    }
  }, [isSignedIn]);

  return (
    <div>
      <button
        onClick={() => {
          signInWithGoogle();
        }}
      >
        sign in with google
      </button>
    </div>
  );
};

export default LoginHomePage;
