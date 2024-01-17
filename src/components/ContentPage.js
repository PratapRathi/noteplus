import React, { useContext, useEffect, useRef, useState } from 'react'
import "../css-component/ContentPage.css"
import NoteContent from './NoteContent'
import noteContext from '../context/notes/NoteContext'
import AddNoteModal from './AddNoteModal'
import { Link } from 'react-router-dom'

const ContentPage = () => {
    const colors = ["#87baf5", "#aa87f5", "#f0864a", "#f674ad", "#302c48", "#8ac3a3"]
    const context = useContext(noteContext);
    const { notes, getNotes, heading, addNoteShow, editNote } = context;
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Edit Note Modal Code
    const [editBtnColor, setEditBtnColor] = useState("");
    const editModalRef = useRef(null);
    const editModalClose = useRef(null);
    const [editNoteState, setEditNoteState] = useState({ title: "", description: "", tag: "", id: "" });
    const updateNote = (note, cardColor) => { // This updateNote function passed to NoteContent's dropdown as Props
        editModalRef.current.click();
        setEditBtnColor(cardColor);
        setEditNoteState({ ...editNoteState, title: note.title, description: note.description, tag: note.tag, id: note._id })
    }
    const onEditChange = (e) => {
        e.preventDefault();
        setEditNoteState({ ...editNoteState, [e.target.name]: e.target.value })
    }
    const onUpdateClick = async(e) => {
        e.preventDefault();
        await editNote(editNoteState.title, editNoteState.description, editNoteState.tag, editNoteState.id);
        editModalClose.current.click();
        setEditNoteState({ title: "", description: "", tag: "", id: "" });
    }


    return (
        <>
            <div className="content-page">
                <div className="container-fluid">
                    <div className="content-header d-flex align-items-center justify-content-center">
                        <div className="card topnav-left card-block">
                            <div className="write-card">
                                <div className="add-note-cursor d-flex align-items-center justify-content-start" onClick={() => { addNoteShow.current.classList.add("show") }}>
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
                        <AddNoteModal addNoteShow={addNoteShow} />
                        <div className="col-lg-12">
                            <div className="card card-container">
                                <h3 className='mb-3'>{heading}</h3>
                                <div className="p-2 body-bg mb-4">
                                    <form className="add-notes input-text">
                                        <Link className="search-link" to="/">
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </Link>
                                        <input type="text" className="text search-content input-text" placeholder="Search Notes - (Search Facility will be implemented soon)" />
                                    </form>
                                </div>
                                <div className="row note-content">
                                    {notes.length === 0 && <div className="container mx-1"><h6>No Notes to be available for display</h6></div>}
                                    {Array.isArray(notes) && notes.map((note, index) => {
                                        return <NoteContent key={index} updateNote={updateNote} note={note} color={colors[index % 6]} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Note Modal code starts here                           */}
            <button type="button" className="btn btn-primary d-none" ref={editModalRef} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="col-auto">
                                <label htmlFor="editTitle" className="col-form-label add-title">Title</label>
                            </div>
                            <div className="col-md-5">
                                <input type="text" name='title' id="editTitle" className="form-control" aria-describedby="passwordHelpInline" value={editNoteState.title} onChange={onEditChange} />
                            </div>
                            <div className="mb-3">
                            <label htmlFor="editDescription" className="form-label add-description">Description</label>
                            <textarea className="form-control" name='description' id="editDescription" rows="3" value={editNoteState.description} onChange={onEditChange}></textarea>
                        </div>
                        <div className="mb-3 tag-dropdown">
                            <label htmlFor="editTag" className='me-4 add-tag'>Tag:</label>
                            <select name="tag" id="editTag" value={editNoteState.tag} onChange={onEditChange}>
                                <option value="General">General</option>
                                <option value="Personal">Personal</option>
                                <option value="Work" >Work</option>
                                <option value="Important" >Important</option>
                                <option value="To-Do" >To-Do</option>
                                <option value="Finance" >Finance</option>
                                <option value="Health" >Health</option>
                            </select>
                        </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={editModalClose} className="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn edit-btn" style={{backgroundColor: editBtnColor, color:"#fff"}} onClick={onUpdateClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContentPage
