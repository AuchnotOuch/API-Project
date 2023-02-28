import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal'
import { actionClearReviews } from '../../store/spotReviews';
import SearchBar from '../Search/SearchBar';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false)

    const resetReviewState = () => {
        dispatch(actionClearReviews())
    }

    const openMenu = () => {
        setShowMenu(!showMenu)
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='logged-in-nav'>
                <NavLink id='create-spot' to='/spots'>Become a Host</NavLink>
                <ProfileButton user={sessionUser} />
            </div>
        );
    } else {
        sessionLinks = (
            <>
                <button className='menu-button' onClick={openMenu}>
                    <i className="fa-solid fa-bars"></i>
                    <i className="fa-regular fa-user"></i>
                </button>
                {showMenu &&
                    <ul style={{ marginLeft: '-135px' }} className="profile-dropdown">
                        <li ><LoginFormModal openMenu={openMenu} /></li>
                        <li ><SignupFormModal openMenu={openMenu} /></li>
                    </ul>
                }
            </>

        );
    }

    return (
        <div className='nav-bar'>
            <NavLink
                onClick={resetReviewState}
                id='home-button' exact to="/">
                <img
                    src='https://i.imgur.com/bqrhjB3.png'
                    alt={`Al's BnB Logo`}>
                </img>
                <>al's bnb</>
            </NavLink>
            <SearchBar />
            <ul>
                <li>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
        </div>
    );
}

export default Navigation;
