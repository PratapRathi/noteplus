import React from 'react'

const sidemenu = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-logo d-flex justify-content-between">
        <a href="/" className='d-flex align-items-center justify-content-start text-decoration-none text-dark'>
          <img src={require("../img/logo.png")} alt="Logo" />
          <h4 className="align-self-center ms-3 fw-normal">NotePlus</h4>
        </a>
        <div className="side-menu-close">
          <i class="fa-solid fa-x fa-lg"></i>
        </div>
      </div>
      <div className="sidebar-dropdown">

      </div>
    </div>
  )
}

export default sidemenu;
