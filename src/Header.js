import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import HeaderOption from './HeaderOption';
import HomeIcon from '@material-ui/icons/Home'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import { BusinessCenter, Notifications } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { logout, selectUser } from './features/userSlice'

function Header() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const profilePic = user.user.photoUrl

    const logoutOfApp = () => {
        dispatch(logout())
        auth.signOut()
    }

    return (
        <div className="header">
            <div className="header__left">
                <img src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg" alt="Linkedin Logo" className=""/>

                <div className="header__search">
                    {/* Search Icon */}
                    <SearchIcon/>
                    <input type="text" placeholder="Search"/>
                </div>
            </div>

            <div className="header__right">
                <HeaderOption Icon={HomeIcon} title="Home" />
                <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
                <HeaderOption Icon={BusinessCenter} title="Jobs" />
                <HeaderOption Icon={Notifications} title="Notifications" />
                <HeaderOption avatar={profilePic} title="Me" onClickAction={logoutOfApp}
                />
            </div>
        </div>
    )
}

export default Header
