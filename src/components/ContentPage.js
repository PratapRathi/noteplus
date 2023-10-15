import React, { useContext, useEffect } from 'react'
import "../css-component/ContentPage.css"
import NoteContent from './NoteContent'
import noteContext from '../context/notes/NoteContext'
import AddNoteModal from './AddNoteModal'

const ContentPage = () => {
    const colors = ["#87baf5", "#aa87f5", "#f0864a", "#f674ad", "#302c48", "#8ac3a3"]
    const context = useContext(noteContext);
    const { notes, getNotes, heading } = context;
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log()


    return (
        <div className="content-page">
            <div className="container-fluid">
                <div className="content-header d-flex align-items-center justify-content-center">
                    <div className="card topnav-left card-block">
                        <div className="write-card">
                            <div className="add-note-cursor d-flex align-items-center justify-content-start">
                                <i className="fa-solid fa-pencil me-3" style={{ "color": "#848486" }}></i>
                                Write Your Note
                            </div>
                        </div>
                    </div>
                    <div className="card topnav-right">
                        <div className="topnav-right-badge">
                            <i className="">
                                <svg width="20" className="svg-icon" id="main-n-01" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" style={{ "strokeDasharray": "82, 102", "strokeDashoffset": "0" }}></path>
                                </svg>
                            </i>
                        </div>
                        <div className="topnav-right-badge ms-3">
                            <i className="">
                                <svg width="20" className="svg-icon" id="main-n-02" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" style={{ "strokeDasharray": "63, 83", "strokeDashoffset": "0" }}></path>
                                </svg>
                            </i>
                        </div>
                    </div>
                </div>
                <div className="note-content row">
                    <AddNoteModal />
                    <div className="col-lg-12">
                        <div className="card card-container">
                            <h3 className='mb-3'>{heading}</h3>
                            <div className="p-2 body-bg mb-4">
                                <form className="add-notes input-text">
                                    <a className="search-link" href="/">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </a>
                                    <input type="text" className="text search-content input-text" placeholder="Search Notes" />
                                </form>
                            </div>
                            <div className="row note-content">
                                {notes.length === 0 && <div className="container mx-1"><h6>No Notes to be available for display</h6></div>}
                                {notes.map((note, index) => {
                                    return <NoteContent key={index} note={note} color={colors[index % 6]} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentPage
