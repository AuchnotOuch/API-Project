import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import '../Navigation/Navigation.css'

function SignupFormModal({ openMenu }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button style={{ textAlign: 'start', background: 'none', border: 'none', width: '100%' }} id='signup-button' onClick={() => setShowModal(true)}>Sign Up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm openMenu={openMenu} />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;
