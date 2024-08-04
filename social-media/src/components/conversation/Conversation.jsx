import { useEffect, useState } from "react";
import "./conversation.scss";
import axios from "axios";

function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find(
      (member) => member !== currentUser._id
    );
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users?userId=" + friendId
        );
        setUser(res.data);
      } catch (error) {
        console.log("error fetching friend data for conversation");
      }
    };
    if (friendId) {
      getUser();
    }
  }, [currentUser._id, conversation.members]);

  return (
    <div className="conversation">
      <img
        src={
          user
            ? user.profilePicture
              ? PF + user.profilePicture
              : PF + "b4.jpg"
            : PF + "b4.jpg"
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">
        {user ? user.username : "Loading..."}
      </span>
    </div>
  );
}

export default Conversation;
