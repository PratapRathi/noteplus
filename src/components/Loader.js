import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

const Loader = () => {
  const context = useContext(noteContext);
  const { loader } = context;

  return (
    <>
      {loader && (<div id='loader'>
        <div id="loading-center">

        </div>
      </div>)}
    </>
  )
}

export default Loader
