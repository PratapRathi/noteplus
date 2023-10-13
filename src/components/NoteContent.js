import React from 'react'
import "../css-component/NoteContent.css"

const NoteContent = (props) => {
    const { note, color } = props;
    const date = new Date(note.date);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const currentDate = date.getUTCDate();
    const month = date.toLocaleString('default',{month:'short'})
    const year = date.getUTCFullYear();

    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div class="card">
                <div class="card-body">
                    <div className="card-head mb-3 dropdown dropstart">
                        <div className="card-icon-box">
                            <svg width="23" height="23" class="svg-icon" id="iq-main-01" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" style={{ "stroke-dasharray": "83, 103", "stroke-dashoffset": "0" }}></path>
                            </svg>
                        </div>
                        <i class="fa-solid fa-ellipsis fa-lg" data-bs-toggle="dropdown"></i>
                        <div className="dropdown-menu card-menu">
                            <div className="dropdown-item">View</div>
                            <div className="dropdown-item">Edit</div>
                            <div className="dropdown-item">Delete</div>
                        </div>
                    </div>
                    <h4 class="card-title">{note.title}</h4>
                    <span className="card-text card-time"><i class="fa-regular fa-clock me-2" style={{ "color": "#87baf5" }}></i> {`${hours%12}:${minutes} ${hours>12?'Pm':'Am'}`}</span>
                    <p class="card-text mt-3 mb-3">{note.description}</p>
                    <div className="card-date d-flex justify-content-end position-relative">
                        <span className='card-text card-date'><i class="fa-regular fa-calendar-days me-2" style={{ "color": "#87baf5" }}></i> {`${currentDate} ${month} ${year}`}</span>
                        <span class="position-absolute translate-middle badge rounded-pill" style={{backgroundColor:color}}>{note.tag}</span>
                    </div>
                </div>
                <div className="card-line"></div>
            </div>
        </div>
    )
}

export default NoteContent
