import React from 'react'
import './online.scss'

export default function Online({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className='online'>
      <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer"><img src={PF+user.profilePicture} alt="" className="rightbarProfileImg" />
            <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
          </li>
          
    </div>
  )
}
