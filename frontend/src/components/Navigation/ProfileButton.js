import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css'

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false)

    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
    }

    useEffect(() => {
        if (!showMenu) return

        const closeMenu = () => {
            setShowMenu(false)
        }

        document.addEventListener('click', closeMenu)

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    const history = useHistory()
    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.logout())
        history.push('/')
    }

    return (
        <>
            <button className='menu-button' onClick={openMenu}>
                <i className="fa-solid fa-bars"></i>
                <i className="fa-regular fa-user"></i>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li id="greeting">Hello {user.firstName}!</li>
                    {/* <li>{user.email}</li> */}
                    <br></br>
                    <li><NavLink exact to='/reviews/current'>Your Reviews</NavLink></li>
                    <li><NavLink exact to='/spots/current'>Spots You Own</NavLink></li>
                    <li>
                        <button id='logout-button' onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    )
}

export default ProfileButton
