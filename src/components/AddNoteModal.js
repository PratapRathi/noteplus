import React, { useContext, useState } from 'react'
import '../css-component/AddNote.css'
import noteContext from '../context/notes/NoteContext';

const AddNoteModal = (props) => {
    const [note, setNote] = useState({ title: "", description: "", tag: "General" });
    const context = useContext(noteContext)
    const { addNote } = context;

    const formSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.addNoteShow.current.classList.remove("show")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <div className="col-md-12 " >
            <div className="collapse card card-block card-stretch ps-2 add-note-modal" id="collapseMenu" ref={props.addNoteShow}>
                <div className="row card-body write-card container-fluid collapse-fluid">
                    <div className="col-md-12 col-lg-12 p-0">
                        <h3 className='add-note-heading'>Add Note</h3>
                        <hr />

                        <form onSubmit={formSubmit} >
                            <div className="row g-3 align-items-center mb-3">
                                <div className="col-auto">
                                    <label htmlFor="title" className="col-form-label add-title">Title</label>
                                </div>
                                <div className="col-md-5">
                                    <input type="text" name='title' id="title" className="form-control" aria-describedby="passwordHelpInline" value={note.title} onChange={onChange} required minLength={3} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label add-description">Description</label>
                                <textarea className="form-control" name='description' id="description" rows="3" value={note.description} onChange={onChange} required minLength={10}></textarea>
                            </div>
                            <div className="mb-3 tag-dropdown">
                                <label htmlFor="tag" className='me-4 add-tag'>Tag:</label>
                                <select name="tag" id="tag" value={note.tag} onChange={onChange}>
                                    <option value="General">General</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Work" >Work</option>
                                    <option value="Important" >Important</option>
                                    <option value="To-Do" >To-Do</option>
                                    <option value="Finance" >Finance</option>
                                    <option value="Health" >Health</option>
                                </select>
                            </div>
                            <div className="col-lg-12 p-0 d-flex justify-content-end">
                                <button className="btn btn-outline-dark" onClick={() => { props.addNoteShow.current.classList.remove("show") }}>Close</button>
                                <button type="submit" className="btn btn-dark ms-3" >Save</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>



    )
}

export default AddNoteModal
