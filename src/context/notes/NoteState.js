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
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjhlZDIxOWU4OWIyYjY4MjkwNDUxZCIsImlhdCI6MTY5NzE4NjU4OH0.nI6XRPxVzAFEN1TDLyk2gsP8IsgbbaKEHThswSQ6QPA"
      }
    })
    const json = await response.json();
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

  // Delete a Note 
  const deleteNote = async (id) => {
    // API call - Backend
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjhlZDIxOWU4OWIyYjY4MjkwNDUxZCIsImlhdCI6MTY5NzE4NjU4OH0.nI6XRPxVzAFEN1TDLyk2gsP8IsgbbaKEHThswSQ6QPA"
      }
    })
    const json = await response.json();
    setNotes(notes.filter((note)=>{return note._id !== id}))
    return json;
  }


  return (
    <noteContext.Provider value={{ notes, loader, setLoader, getNotes, getBinNotes, getUser, user, heading,tags, getTagNote, deletedNote, deleteNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState
