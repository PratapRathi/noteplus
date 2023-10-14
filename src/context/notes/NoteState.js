import React, { useState } from "react";
import noteContext from "./NoteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(false);


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
    setNotes(json);
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
    setNotes(json);
  }

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



  return (
    <noteContext.Provider value={{ notes, loader, setLoader, getNotes, getBinNotes, getUser, user,  }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState
