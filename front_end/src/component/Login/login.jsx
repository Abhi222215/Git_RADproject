
import React from 'react'
import './login.css'
import user_icon from '../../assets/password_29dp_000000_FILL0_wght400_GRAD0_opsz24.svg'
import password_icon from '../../assets/drafts_29dp_000000_FILL0_wght400_GRAD0_opsz24.png'
import person_add_icon from '../../assets/person_29dp_000000_FILL0_wght400_GRAD0_opsz24.svg'


const Login = ({ onClose }) => {
  const [action, setAction] = React.useState('Sign up');

  return (
    <div className="container">
      <div className="header">
        {onClose ? (
          <button
            className="login-close"
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        ) : null}

        <div className="text">{action}</div>
        <div className="underline" />

        <div className="inputs">
          {action === 'Login' ? null : (
            <div className="input">
              <img src={user_icon} alt="User Icon" />
              <input type="text" placeholder="Username" />
            </div>
          )}

          <div className="input">
            <img src={person_add_icon} alt="Person Icon" />
            <input type="email" placeholder="Email" />
          </div>
          <div className="input">
            <img src={password_icon} alt="Password Icon" />
            <input type="password" placeholder="Password" />
          </div>
        </div>

        {action === 'Sign up' ? null : (
          <div className="forgot-password">
            Lost password? <span>Click Here!</span>
          </div>
        )}

        <div className="submit-container">
          <button
            className={action === 'Sign up' ? 'submit' : 'submit inactive'}
            type="button"
            onClick={() => {
              setAction('Sign up');
            }}
          >
            Sign up
          </button>
          <button
            className={action === 'Login' ? 'submit' : 'submit inactive'}
            type="button"
            onClick={() => {
              setAction('Login');
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 