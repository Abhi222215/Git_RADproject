
import React from 'react'
import './login.css'
import user_icon from '../../assets/drafts_29dp_000000_FILL0_wght400_GRAD0_opsz24.png'
import password_icon from '../../assets/password_29dp_000000_FILL0_wght400_GRAD0_opsz24.svg'
import person_add_icon from '../../assets/person_29dp_000000_FILL0_wght400_GRAD0_opsz24.svg'


const Login = () => {
  const [action,setAction] = React.useState('Sign up');
  return (
    <div className="container">
     <div className="header">
        <div className="text">{action}</div>
       <div className="Underline">
       </div>
       <div className="inputs">
        {action === 'Login'?<div></div>:<div className="input>">
          <img src={user_icon} alt="User Icon" />
          <input type="text" placeholder="Username" />
        </div>}
        
        <div className="input>">
          <img src={person_add_icon} alt="Person Icon" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input>">
          <img src={password_icon} alt="Password Icon" />
          <input type="password" placeholder="Password" />
        </div>
        </div>
        {action === 'Sign up'?<div></div>:<div className="forget_password">Lost password?<samp>Click Here!</samp></div>}
        
          
        
        <div className="submit-container"></div>
        <div className={action === 'Sign up' ? 'submit' : 'submit inactive'}onClick={()=>{setAction("Sign up")}}>Sign up</div>
        <div className={action === 'Login' ? 'submit' : 'submit inactive'}onClick={()=>{setAction("Login")}}>Login</div>
        </div>
    </div> 

  
  );
};

export default Login; 