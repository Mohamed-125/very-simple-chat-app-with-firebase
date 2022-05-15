import React, { useEffect, useRef, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const ChatRoom = ({ setIsSignedIn }) => {
  //refs

  const inputRef = useRef();

  //states
  console.log("fdfsd");
  const [text, setText] = useState(null);
  const [sender, setSender] = useState(null);
  const [senderImg, setSenderImg] = useState(null);
  const [changed, setChanged] = useState(false);
  const [senderId, setSenderId] = useState("");
  const [messeges, setMesseges] = useState([]);

  const deleteHandler = (e) => {
    if (e.target.getAttribute("sendby") === auth.currentUser.uid) {
      const confirmResult = window.confirm(
        "do you want to delete this messege"
      );
      if (confirmResult) {
        const deleteMessege = async () => {
          const deleteDocData = doc(db, "messeges", e.target.id);
          await deleteDoc(deleteDocData).then(() => {
            setChanged([true]);
          });
        };
        deleteMessege();
      } else {
        return false;
      }
    }
  };

  // to send the messege

  const submitHandler = (e) => {
    e.preventDefault();
    setText(inputRef?.current?.value);
    setSender(auth?.currentUser.displayName);
    setSenderImg(auth?.currentUser.photoURL);
    setSenderId(auth?.currentUser.uid);
    inputRef.current.value = null;
  };

  useEffect(() => {
    if (text && sender && senderImg) {
      const sendMessege = async () => {
        await addDoc(collection(db, "messeges"), {
          text,
          senderData: { sender, senderImg, senderId },
          createdAt: serverTimestamp(),
        });
      };
      sendMessege();
    }

    const fetchData = async () => {
      const collectionData = collection(db, "messeges");
      const queryed = query(collectionData, orderBy("createdAt"));

      const messegesData = await getDocs(queryed);
      setMesseges(
        messegesData.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    };
    fetchData();
  }, [text, sender, senderId, senderImg, changed]);

  // set the data

  // sign out the user
  const navigate = useNavigate("");
  const signOut = () => {
    auth.signOut();
    setIsSignedIn(false);
    navigate("/");
    localStorage.clear();
  };
  return (
    <div>
      <button style={{ postion: "sticky", top: "0" }} onClick={signOut}>
        sign out
      </button>
      <div>
        <div>
          {messeges.map((item, index) => {
            return (
              <div
                key={item.id}
                id={item.id}
                sendby={item.senderData.senderId}
                onClick={deleteHandler}
                className={
                  item.senderData.senderId === auth.currentUser.uid
                    ? "sent message"
                    : "received message"
                }
              >
                <p style={{ pointerEvents: "none" }}>
                  <span style={{ pointerEvents: "none" }}>
                    {item.senderData.sender}
                  </span>
                  {item.text}
                </p>

                <img
                  style={{ pointerEvents: "none" }}
                  src={item.senderData.senderImg}
                />
              </div>
            );
          })}
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <input ref={inputRef} placeholder="say something nice" type="text" />
      </form>
    </div>
  );
};

export default ChatRoom;
