import React from "react";
const LoginHomePage = ({ signInWithGoogle }) => {
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
