import React, { useContext, useEffect, useState } from "react";
import "./post.scss";
import { MdMoreVert } from "react-icons/md";
// import { user } from "../../dummyData";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user}=useContext(AuthContext)
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(()=>{
    setLike(post.likes.includes(user._id))
  },[post.likes, user._id])
  const likeHandler = async() => {

    try {
       await axios.put(`http://localhost:5000/api/posts/${post._id}/like`,{userId:user._id})
    } catch (error) {
      console.log(`error in like handler${error}`);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/users?userId=${post.userId}`
      );
      setUserData(res.data);
    };

    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${userData.username}`}>
              <img
                className="postProfileImg"
                src={
                  PF+userData.profilePicture
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
          <img className="postImg" src={PF+post.img} alt="" />
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
