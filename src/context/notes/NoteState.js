import React, { useRef, useState} from "react";
import noteContext from "./NoteContext";


const NoteState = (props) => {
  const token = localStorage.getItem('token');
  const host = process.env.REACT_APP_BASE_URL;
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(false);
  const [heading, setHeading] = useState("Your Saved Notes")
  const [tags, setTags] = useState([])
  const [deletedNote, setDeletedNote] = useState([]);
  const addNoteShow = useRef(null);


  // Create User - Signup
  const createUser = async (name, email, password, gender) => {
    // API call - Backend
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password, gender })
    })
    const json = await response.json();
    return json;
  }

  // Login User - Login
  const loginUser = async (email, password) => {
    // API call - Backend
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password}),
      withCredentials: true
    })
    const json = await response.json();
    return json;
  }

  //Get User Details
  const getUser = async () => {
    // API call - Backend
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "GET",
      headers: {
        "auth-token": token 
      }
    })
    const json = await response.json();
    setUser(json);
    return json;
  }


  // Get All Notes
  const getNotes = async () => {
    setLoader(true);
    // API Call - Backend
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": token
      }
    })
    const json = await response.json();
    setLoader(false);
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
        "auth-token": token
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
        "auth-token": token
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
        "auth-token": token
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

  // Edit an existing Note 
  const editNote = async (title, description, tag, id) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({ title, description, tag })
    })
    // Showing of Alert
    const json = await response.json();
    if(json.success){showAlert("Note Updated Successfully !", "success")}
    else{showAlert("Failed to Update the Note!", "danger")}

    // Update Note on client side 
    let newNote = JSON.parse(JSON.stringify(notes));
    for(let index=0; index < newNote.length; index++){
      if(newNote[index]._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
    setTags(newNote);
  }


  // Delete a Note 
  const deleteNote = async (id) => {
    // API call - Backend
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": token
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
        "auth-token": token
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
        "auth-token": token
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
    }, 1800);
  }
 

  return (
    <noteContext.Provider value={{
      notes, loader, getNotes, getBinNotes, getUser, user, heading, tags, getTagNote, showAlert,
      deletedNote, deleteNote, restoreNote, finalDelete, addNote, alert, addNoteShow, editNote, createUser, loginUser
    }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState
