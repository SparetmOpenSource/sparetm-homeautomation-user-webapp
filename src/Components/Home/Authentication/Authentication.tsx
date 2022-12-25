import { useState } from 'react';
import LoginForm from '../Form/LoginForm';
import RegistrationForm from '../Form/RegistrationForm';
import './Authentication.css';

const Authentication = () => {
    const [openLoginForm, setOpenLoginForm] = useState(false);
    return (
        <div className="authentication">
            {openLoginForm && <LoginForm toggleLoginForm={setOpenLoginForm} />}
            {!openLoginForm && (
                <RegistrationForm toggleLoginForm={setOpenLoginForm} />
            )}
        </div>
    );
};

export default Authentication;
