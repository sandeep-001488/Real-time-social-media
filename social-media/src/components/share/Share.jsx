import React, { useState } from "react";
import "./share.scss";
import { MdOutlinePermMedia, MdOutlineLabelImportant, MdEmojiEmotions } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { createContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Share() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const [file,setFile]=useState(null)
  const {user}=createContext(AuthContext)
  console.log(`from share ${user}`);

  const submitHandler=async(e)=>{
    e.preventDefault()
  }


  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={`${PF}b2.jpg`} alt="" className="shareProfileImg" />
          <input placeholder={`What's in ur mind `} className="shareInput" />
        </div>
        <hr className="shareHr" />

        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <MdOutlinePermMedia style={{ color: "#EC3B36" }} className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input type="file" name="file" id="file" style={{display:"none"}} />
            </label >
            <div className="shareOption">
              <MdOutlineLabelImportant style={{ color: "blue" }} className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <FaLocationDot style={{ color: "green" }} className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <MdEmojiEmotions style={{ color: "goldenrod" }} className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}
