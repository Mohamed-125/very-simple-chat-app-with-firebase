import React from "react";
const LoginHomePage = ({ signInWithGoogle }) => {
  console.log("fsdfsdsfsdfsdfsfsff");

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
