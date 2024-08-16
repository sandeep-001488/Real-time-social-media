import React, { useContext, useEffect, useState } from "react";
import "./post.scss";
import { MdMoreVert } from "react-icons/md";
// import { user } from "../../dummyData";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
// require('dotenv').config();


export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user}=useContext(AuthContext)
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://real-time-social-media-4.onrender.com/api/users?userId=${post.userId}`
        );
        setUserData(res.data);
      } catch (error) {
        console.log(`Error fetching user data: ${error}`);
      }
    };

    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      const response = await axios.put(
        `https://real-time-social-media-4.onrender.com/api/posts/${post._id}/like`,
        { userId: user._id }
      );
      if (response.data.message === "post has been liked") {
        setLike((prevLike) => prevLike + 1);
      } else if (response.data.message === "post has been disliked"){
        setLike((prevLike) => prevLike - 1); 
      }
      setIsLiked(!isLiked); 
    } catch (error) {
      console.log(`Error in like handler: ${error}`);
    }
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [post.likes, user._id]);




  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${userData.username}`}>
              <img
                className="postProfileImg"
                src={
                  userData.profilePicture?PF+userData.profilePicture:PF+"noCover.jpg"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{userData.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MdMoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {post.img && (
            <img className="postImg" src={PF+post.img} alt="" />
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
