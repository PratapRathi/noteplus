import React, { useContext, useState } from 'react'
import '../css-component/Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/NoteContext'

const SignUp = () => {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const {showAlert, createUser} = context;

    const [credential, setCredential] = useState({name:"", email:"", password:"", gender:""});
    const { name, email, password, gender} = credential;

    const onSignupChange = (e) =>{
        setCredential({...credential,[e.target.name]: e.target.value})
    }

    const onSignupSubmit = async(e) => {
        e.preventDefault();
        const result = await createUser(name, email, password, gender);
        setCredential({name:"", email:"", password:"", gender:""});
        if(result.success === true) {
            localStorage.setItem('token', result.authToken);
            navigate("/");
            showAlert("Account Created Successfully","success")
        }
        else{
            showAlert(result.error, "danger");
        }
    }

    return (
        <section className="login-content">
            <div className="container h-100">
                <div className="row justify-content-center align-items-center height-self-center">
                    <div className="col-md-6 col-sm-12 col-12 align-self-center">
                        <div className="sign-user_card">
                            <div className="logo-detail">
                                <div className="d-flex align-items-center"><img src={require('../img/logo.png')} className="img-fluid rounded-normal signup-logo light-logo logo" alt="logo" /> <h4 className="logo-title ms-3">NotePlus</h4></div>
                            </div>
                            <h3 className="mb-2">Sign Up</h3>
                            <p>Create your  account.</p>
                            <form onSubmit={onSignupSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="floating-label form-group">
                                            <input className="floating-input form-control" name='name' type="text" placeholder="Name" required value={credential.name} onChange={onSignupChange} minLength={3} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="floating-label form-group">
                                            <input className="floating-input form-control" name='email' type="email" placeholder="Email" required value={credential.email} onChange={onSignupChange} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="floating-label form-group">
                                            <input className="floating-input form-control" name='password' type="password" placeholder="Password" required value={credential.password} onChange={onSignupChange} minLength={5}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="floating-label form-group">
                                            <input className="floating-input form-control" type="password" placeholder="Confirm Password" required pattern={password} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="floating-label form-group d-flex">
                                            <label htmlFor="gender" className='me-4 add-tag'>Gender:</label>
                                            <select name="gender" id="gender" required value={credential.gender} onChange={onSignupChange} >
                                                <option value="">Select Your Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 position-relative">
                                        <div className="checkBoxRound">
                                            <input type="checkbox" id="signupcheckbox" name="signupcheckbox" required/>
                                            <label htmlFor="signupcheckbox"></label>
                                            <span className='float-left ms-5'>I agree with the terms of use</span>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-dark mt-3">Sign Up</button>
                                <p className="mt-3 mb-0">
                                    Already have an Account <Link to='/login' className="text-primary"><b>Sign In</b></Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp
// signup:1 An invalid form control with name='' is not focusable. giving this warning while submit