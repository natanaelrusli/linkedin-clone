import { Avatar } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import './Sidebar.css'

function Sidebar() {
    const user = useSelector(selectUser)
    const username = user.user.displayName
    const email = user.user.email
    const profilePic = user.user.photoUrl
    const defaulrBanner = 'https://images.unsplash.com/photo-1541848952518-f6c52dbc7c94?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=751&q=80'

    // This is how you make a JSX component using a function
    const recentItem = (topic) => (
        // Pay attention to the breckets ^^
        <div className="sidebar__recentItem">
            <div className="sidebar__hash">#</div>
            <p>{topic}</p>
        </div>
    );

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <img src={!profilePic? (defaulrBanner) : (profilePic)} alt="Banner"/>
                <Avatar className="sidebar__avatar" src = {profilePic}>
                    {email[0]}
                </Avatar>
                <h2>{ username }</h2>
                <h2>{ email }</h2>
            </div>

            <div className="sidebar__stats">
                <div className="sidebar__stat">
                    <p>Who viewed you</p>
                    <p className="sidebar__statNumber">2,543</p>
                </div>
                <div className="sidebar__stat">
                    <p>Views on post</p>
                    <p className="sidebar__statNumber">2,448</p>
                </div>
            </div>

            <div className="sidebar__bottom">
                <p>Recent</p> 
                {recentItem("reactJS")}
                {recentItem("Programming")}
                {recentItem("Design")}
                {recentItem("Software")}
            </div>
        </div>
    )
}

export default Sidebar
