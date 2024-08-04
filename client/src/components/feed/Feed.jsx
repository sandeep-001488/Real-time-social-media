import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.scss";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
// import { Posts } from "../../dummyData";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      // const response = username
      //   ? await axios.get("http://localhost:5000/api/posts/profile/" + username)
      //   : await axios.get(
      //       "http://localhost:5000/api/posts/timeline/" + user._id
      //     );
      const url = username
      ? `http://localhost:5000/api/posts/profile/${username}`
      : `http://localhost:5000/api/posts/timeline/${user._id}`;
    
    const response = await axios.get(url);

      setPosts(
        response.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      )
    }
    fetchData();
  }, [username, user._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
