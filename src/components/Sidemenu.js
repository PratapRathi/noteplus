import React, { useContext, useEffect } from 'react'
import '../css-component/Sidemenu.css'
import noteContext from '../context/notes/NoteContext';
import Offcanvas from './Offcanvas';
import { Link, useNavigate } from "react-router-dom";

const Sidemenu = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext)
  const { tags, getNotes, getBinNotes, user, getUser, getTagNote, addNoteShow, showAlert } = context;
  const showSidemenu = props.showSidemenu;

  const verifyUser = async () => {
    const result = await getUser();
    if (result === null || result.success === false || result.error === "Please authenticate using a valid token") {
      navigate('/login');
    }
  }

  useEffect(() => {

    if (localStorage.getItem('token')) {
      getUser();
      verifyUser();
    }
    else {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate("/login");
    showAlert("Logged Out Successfully !", "success");
  }

  function sideMenuClose(e) {
    e.preventDefault();
    showSidemenu.current.style.left = "-300px"
  }

  return (
    <div className='sidebar' id='sidebar' ref={showSidemenu}>
      <div className="sidebar-logo d-flex justify-content-between">
        <a href="/" className='d-flex align-items-center justify-content-start text-decoration-none text-dark'>
          <img src={require("../img/logo.png")} alt="Logo" />
          <h4 className="align-self-center ms-3 fw-normal">NotePlus</h4>
        </a>
        <div className="side-menu-close" onClick={(e) => { sideMenuClose(e) }}>
          <i className="fa-solid fa-x fa-lg"></i>
        </div>
      </div>
      {/* {Personal Dropdown Menu} */}
      <div className="sidebar-dropdown dropdown-toggle dropdown d-flex align-items-center justify-content-between" data-bs-toggle="dropdown">
        <img src={require(`../img/${user.gender ? user.gender : "Male"}.jpg`)} alt="avatar" className=".me-3" />
        <h6 style={{ color: "#1f1c2f" }}>{user.name}</h6>
        <div className="dropdown-menu">
          <div href="/" className="dropdown-item mb-1 text-decoration-none" onClick={handleLogout}>
            <i className="fa-solid fa-right-to-bracket me-3"></i>
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* {Scrollabe Item} */}
      <div className="btn add-note mt-2 mb-2 pr-5" onClick={() => { addNoteShow.current.classList.add("show") }}>
        <span className="btn-title">
          <i className="fa-solid fa-plus me-3" style={{ color: "#ffffff" }}></i>
          Add New
        </span>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className="sidebar-li my-4" onClick={getNotes}>
            <Link to="/" className='link'>
              <i>
                <svg className="svg-icon me-3" id="iq-main-1" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" style={{ "strokeDasharray": "108, 128", "strokeDashoffset": "0" }}></path>
                </svg>
              </i>
              <span >Your Notes</span>
            </Link>
          </li>
          <li className="sidebar-li my-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
            <i>
              <svg width="20" className="svg-icon me-3" id="iq-main-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" style={{ "strokeDasharray": "56, 76", "strokeDashoffset": "0" }}></path>
              </svg>
            </i>
            <span>Tags</span>
          </li>
          <li className="sidebar-li my-4" onClick={getBinNotes}>
            <Link to="/bin" className='link'>
              <i>
                <svg width="20" className="svg-icon me-3" id="iq-main-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" style={{ "strokeDasharray": "80, 100", "strokeDashoffset": "0" }}></path>
                </svg>
              </i>
              <span>Bin</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="side-image d-flex">
        <img src={require("../img/side-bkg.png")} alt="" />
      </div>
      <Offcanvas tags={tags} getTagNote={getTagNote} />
    </div>
  )
}

export default Sidemenu;
