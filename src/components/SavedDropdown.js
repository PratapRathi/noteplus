import React from 'react'

const SavedDropdown = (props) => {
    const { deleteNote, note, color, updateNote } = props
    return (
        <>
            <div className="dropdown-item" onClick={() => {updateNote(note,color)}}>View / Edit</div>
            <div className="dropdown-item" onClick={() => { deleteNote(note._id) }}>Delete</div>
        </>
    )
}

export default SavedDropdown
