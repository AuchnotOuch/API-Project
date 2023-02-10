import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal'
import { actionClearReviews } from '../../store/spotReviews';
import './Navigation.css';
import SearchBar from '../Search/SearchBar';

function Navigation({ isLoaded }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const resetReviewState = () => {
        dispatch(actionClearReviews())
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
                <LoginFormModal />
                <SignupFormModal />
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
