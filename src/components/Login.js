import React, { useContext, useState } from 'react'
import '../css-component/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/NoteContext'

const Login = () => {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const {loginUser, showAlert} = context;

    const[auth,setAuth] = useState({email:"", password:""});

    const onLoginChange = (e) => {
        setAuth({...auth, [e.target.name]: e.target.value})
    }

    const onLoginSubmit = async(e) => {
        e.preventDefault();
        const result = await loginUser(auth.email, auth.password);
        setAuth({email:"", password:""});
        if(result.success === true){
            localStorage.setItem('token', result.authToken);
            navigate("/");
            showAlert("Logged in Successfully","success");
        }
        else{
            showAlert("Login with correct credentials","danger");
        }

    }

  return (
    <section className="login-content">
         <div className="container h-100">
            <div className="row justify-content-center align-items-center height-self-center">
               <div className="col-md-5 col-sm-12 col-12 align-self-center">
                  <div className="sign-user_card">   
                     <div className="logo-detail">            
                           <div className="d-flex align-items-center"><img src={require('../img/logo.png')} className="img-fluid rounded-normal login-logo light-logo logo" alt="logo"/> <h4 className="logo-title ms-3">NotePlus</h4></div>
                     </div>      
                     <h3 className="mb-2">Sign In</h3>
                     <p>Login to stay connected.</p>
                     <form onSubmit={onLoginSubmit}>
                        <div className="row">
                           <div className="col-lg-12">
                              <div className="floating-label form-group">
                                 <input name='email' className="floating-input form-control" type="email" placeholder="Email " value={auth.email} onChange={onLoginChange} required/>
                              </div>
                           </div>
                           <div className="col-lg-12">
                              <div className="floating-label form-group">
                                 <input name='password' className="floating-input form-control" type="password" placeholder="Password" value={auth.password} onChange={onLoginChange} required  />
                              </div>
                           </div>
                           <div className="col-lg-6 ms-1">
                              <Link to='/login' className="text-primary float-start">Forgot Password?</Link>
                           </div>                  
                        </div>
                        <button type="submit" className="btn btn-dark mt-3">Sign In</button>
                        <p className="mt-3 mb-0">
                           Create an Account <Link to='/signup' className="text-primary"><b>Sign Up</b></Link>
                        </p>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </section>
  )
}

export default Login
