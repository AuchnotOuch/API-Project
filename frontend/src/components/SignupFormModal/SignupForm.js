import React, { useState } from "react"
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import './SignupForm.css'

function SignupFormPage({ openMenu, setShowModal }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [errors, setErrors] = useState([])

    if (sessionUser) return <Redirect to='/' />

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            openMenu()
            return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    const demoUser = (e) => {
        e.stopPropagation();
        setErrors([]);
        openMenu()
        return dispatch(sessionActions.login({ credential: 'demosmith', password: 'password' })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    return (
        <form className='signup-form' onSubmit={handleSubmit}>
            <button style={{ background: 'none', border: 'none', marginLeft: '475px' }} onClick={() => setShowModal(false)}>X</button>

            <ul>
                {errors.map((error, idx) => <li id="error" key={idx}>{error}</li>)}
            </ul>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
            />
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
            />
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Password"
            />
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="First Name"
            />
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Last Name"
            />
            <div className="signup-buttons">
                <button id='signup-button' type="submit">Sign Up</button>
                <button id="demo-button" onClick={demoUser}>Demo User</button>
            </div>
        </form>
    );
}

export default SignupFormPage
