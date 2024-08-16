
import { useEffect, useState } from "react";
import "./chatOnline.scss";
import axios from "axios";

function ChatOnline({ onlineUsers, setCurrentChat, currentId }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(
          `https://real-time-social-media-4.onrender.com/api/users/friends/${currentId}`
        );

        setFriends(res.data); 
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    getFriends()
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick=async(friend)=>{
    try {
      const res=await axios.get(`https://real-time-social-media-4.onrender.com/api/conversation/find/${currentId}/${friend._id}`)
      setCurrentChat(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="chatOnline">
      {onlineFriends.map((friend) => (
        <div className="chatOnlineFriend" key={friend._id} onClick={()=>handleClick(friend)}>
          <div className="chatOnlineImgContainer">
            <img src={friend?.profilePicture?PF+friend.profilePicture:PF+"b1.jpg"} alt="Friend" className="chatOnlineImg" />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{friend.username}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;
