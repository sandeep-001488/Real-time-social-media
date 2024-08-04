import { useEffect, useState } from "react";
import "./message.scss";
import { format } from "timeago.js";
import axios from "axios";

function Message({ own, message}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users?userId=" + message?.sender
        );
        setUser(res.data);
      } catch (error) {
        console.log("error from getting user in message file", error);
      }
    };
    getUser();
  });
  return (
    <>
      
      <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          <img
            src={user ? PF + user.profilePicture : PF + "b1.jpg"}
            alt=""
            className="messageImg"
          />
          <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt )}</div>
      </div>
    </>
  );
}

export default Message;
