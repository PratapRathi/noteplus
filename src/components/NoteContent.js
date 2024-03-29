import React, { useContext, useRef } from 'react'
import "../css-component/NoteContent.css"
import noteContext from '../context/notes/NoteContext'
import SavedDropdown from './SavedDropdown';
import BinDropdown from './BinDropdown';
import { Routes, Route } from "react-router-dom";
// import styled from 'styled-components';

const NoteContent = (props) => {
    const context = useContext(noteContext);
    const { deleteNote, restoreNote, finalDelete } = context;

    const { note, color, updateNote } = props;
    const date = new Date(note.date);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const currentDate = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' })
    const year = date.getFullYear();

    const ref = useRef(), timeRef = useRef(), dateRef = useRef(), calenderRef = useRef(), clockRef = useRef();
    const titleRef = useRef(), paraRef = useRef(), logoRef = useRef(), headerRef = useRef(), dropRef = useRef();
    const enter = [timeRef, clockRef, calenderRef, titleRef, paraRef, logoRef, dropRef, dateRef];
    const leave = [timeRef, clockRef, calenderRef, logoRef];
    const mouseEnter = () => {
        ref.current.style.backgroundColor = color;
        headerRef.current.style.backgroundColor = color;
        logoRef.current.style.borderColor = "#FFFF";
        enter.forEach((e) => { e.current.style.color = "#FFFF" });
    }
    const mouseLeave = () => {
        ref.current.style.backgroundColor = "#FFFF";
        headerRef.current.style.backgroundColor = "#FFFF";
        leave.forEach((e) => { e.current.style.color = color });
        logoRef.current.style.borderColor = color;
        paraRef.current.style.color = "#848486";
        dropRef.current.style.color = "rgb(33,37,41)";
        titleRef.current.style.color = "#131313";
        dateRef.current.style.color = "#131313";
    }

    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card cardStyle note-card" ref={ref} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                <div className="card-body">
                    <div className="card-head mb-3 dropdown dropstart" ref={headerRef}>
                        <div className="card-icon-box" style={{ color: color, borderColor: color }} ref={logoRef}>
                            <svg width="23" height="23" className="svg-icon" id="iq-main-01" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" style={{ "strokeDasharray": "83, 103", "strokeDashoffset": "0" }}></path>
                            </svg>
                        </div>
                        <i className="fa-solid fa-ellipsis fa-lg" data-bs-toggle="dropdown" ref={dropRef}></i>
                        <div className="dropdown-menu card-menu">
                            <Routes>
                                <Route exact path="/" element={<SavedDropdown updateNote={updateNote} deleteNote={deleteNote} note={note} color={color} />} />
                                <Route exact path="/bin" element={<BinDropdown restoreNote={restoreNote} finalDelete={finalDelete} note={note} />} />
                            </Routes>
                        </div>
                    </div>
                    <h4 className="card-title" ref={titleRef}>{note.title}</h4>
                    <span className="card-text card-time" style={{ color: color }} ref={timeRef}><i className="fa-regular fa-clock me-2" style={{ color: color }} ref={clockRef}></i> {`${hours % 12}:${minutes < 10 ? '0' + String(minutes) : minutes} ${hours > 12 ? 'Pm' : 'Am'}`}</span>
                    <p className="card-text mt-3 mb-3" ref={paraRef}>{note.description}</p>
                    <div className="card-date d-flex justify-content-end position-relative">
                        <span className='card-text card-date' ref={dateRef}><i className="fa-regular fa-calendar-days me-2" style={{ color: color }} ref={calenderRef}></i> {`${currentDate} ${month} ${year}`}</span>
                        <span className="position-absolute translate-middle badge rounded-pill" style={{ backgroundColor: color }} >{note.tag}</span>
                    </div>
                </div>
                <div className="card-line" style={{ borderColor: color }}></div>
            </div>
        </div>
    )
}

export default NoteContent
