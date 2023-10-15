import React, { useState } from "react";
import noteContext from "./NoteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(false);
  const [heading, setHeading] = useState("Your Saved Notes")
  const [tags, setTags] = useState([])
  const [deletedNote, setDeletedNote] = useState([]);


  //Get User Details
  const getUser = async () => {
    // API call - Backend
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "GET",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjhlZDIxOWU4OWIyYjY4MjkwNDUxZCIsImlhdCI6MTY5NzE4NjU4OH0.nI6XRPxVzAFEN1TDLyk2gsP8IsgbbaKEHThswSQ6QPA"
      }
    })
    const json = await response.json();
    setUser(json);
  }


  // Get All Notes
  const getNotes = async () => {
    // API Call - Backend
    // setLoader(true);
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjhlZDIxOWU4OWIyYjY4MjkwNDUxZCIsImlhdCI6MTY5NzE4NjU4OH0.nI6XRPxVzAFEN1TDLyk2gsP8IsgbbaKEHThswSQ6QPA"
      }
    })
    const json = await response.json();
    // setLoader(false);
    setHeading("Your Saved Notes");
    setNotes(json);
    setTags(json);
  }

  //Get Bin Notes
  const getBinNotes = async () => {
    // API call - Backend
    const response = await fetch(`${host}/api/notes/getdeletednotes`, {
      method: "GET",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjhlZDIxOWU4OWIyYjY4MjkwNDUxZCIsImlhdCI6MTY5NzE4NjU4OH0.nI6XRPxVzAFEN1TDLyk2gsP8IsgbbaKEHThswSQ6QPA"
      }
    })
    const json = await response.json();
    setHeading("Deleted Notes");
    setDeletedNote(json);
    setNotes(json);
  }


  // Get Notes based on Tag 
  const getTagNote = async (tag) => {
    // API call - Backend
    const response = await fetch(`${host}/api/notes/gettagnote/${tag}`, {
      method: "GET",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjhlZDIxOWU4OWIyYjY4MjkwNDUxZCIsImlhdCI6MTY5NzE4NjU4OH0.nI6XRPxVzAFEN1TDLyk2gsP8IsgbbaKEHThswSQ6QPA"
      }
    })
    const json = await response.json();
    setHeading(tag);
    setNotes(json);
  }

  // Add a new Note 
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjhlZDIxOWU4OWIyYjY4MjkwNDUxZCIsImlhdCI6MTY5NzE4NjU4OH0.nI6XRPxVzAFEN1TDLyk2gsP8IsgbbaKEHThswSQ6QPA"
      },
      body: JSON.stringify({ title, description, tag })
    })
    // Showing of Alert
    const json = await response.json();
    if(json.success){showAlert("Note Added Successfully !", "success")}
    else{showAlert("Failed to Add Note!", "danger")}

    // Adding Note on client side 
    setNotes(notes.concat(json.savedNote));
    
  }



  // Delete a Note 
  const deleteNote = async (id) => {
    // API call - Backend
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjhlZDIxOWU4OWIyYjY4MjkwNDUxZCIsImlhdCI6MTY5NzE4NjU4OH0.nI6XRPxVzAFEN1TDLyk2gsP8IsgbbaKEHThswSQ6QPA"
      }
    })
    // Showing of Alert
    const json = await response.json();
    if(json.success){showAlert("Deleted Successfully !", "success")}
    else{showAlert("Failed to Delete !", "danger")}

    //Deleting Note on Client side
    setNotes(notes.filter((note) => { return note._id !== id }))
    setTags(tags.filter((note) => { return note._id !== id }));
    return json;
  }

  // Restore a Deleted Note
  const restoreNote = async (id) => {
    // API call - Backend
    const response = await fetch(`${host}/api/notes/restorenote/${id}`, {
      method: "POST",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjhlZDIxOWU4OWIyYjY4MjkwNDUxZCIsImlhdCI6MTY5NzE4NjU4OH0.nI6XRPxVzAFEN1TDLyk2gsP8IsgbbaKEHThswSQ6QPA"
      }
    })
    // Showing of Alert
    const json = await response.json();
    if(json.success){showAlert("Restored Successfully !", "success")}
    else{showAlert("Failed to Restore !", "danger")}

    //Deleting Note on Client side
    setNotes(notes.filter((note) => { return note._id !== id }))
    setTags(tags.concat(json.note));
    return json;
  }

  // Permanently delete a Note 
  const finalDelete = async (id) => {
    // API call - Backend
    const response = await fetch(`${host}/api/notes/permanentdeletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjhlZDIxOWU4OWIyYjY4MjkwNDUxZCIsImlhdCI6MTY5NzE4NjU4OH0.nI6XRPxVzAFEN1TDLyk2gsP8IsgbbaKEHThswSQ6QPA"
      }
    })
    // Showing of Alert
    const json = await response.json();
    if(json.success){showAlert("Deleted Permanently Successfully !", "success")}
    else{showAlert("Failed to Delete Permanently !", "danger")}

    //Deleting Note on Client side
    setNotes(notes.filter((note) => { return note._id !== id }))
    return json;
  }



  // Show-Hide of Alert
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }


  return (
    <noteContext.Provider value={{
      notes, loader, setLoader, getNotes, getBinNotes, getUser, user, heading, tags, getTagNote,
      deletedNote, deleteNote, restoreNote, finalDelete, addNote, alert
    }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState
