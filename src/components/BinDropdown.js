import React from 'react'

const BinDropdown = (props) => {
  const { finalDelete, restoreNote, note } = props
  return (
    
      <>
        <div className="dropdown-item" onClick={() => { restoreNote(note._id) }}>Restore</div>
        <div className="dropdown-item" onClick={() => { finalDelete(note._id) }}>Delete Permanently</div>
      </>

  )
}

export default BinDropdown
