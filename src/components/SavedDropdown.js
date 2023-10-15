import React from 'react'

const SavedDropdown = (props) => {
    const { deleteNote, note } = props
    return (
        <>
            <div className="dropdown-item">View</div>
            <div className="dropdown-item">Edit</div>
            <div className="dropdown-item" onClick={() => { deleteNote(note._id) }}>Delete</div>
        </>
    )
}

export default SavedDropdown
