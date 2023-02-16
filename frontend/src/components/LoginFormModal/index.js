import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import '../Navigation/Navigation.css'

function LoginFormModal({ openMenu }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button style={{ textAlign: 'start', background: 'none', border: 'none', width: '100%' }} id='login-button' onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm openMenu={openMenu} showModal={showModal} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
