import React from "react";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { notesCollection, database, auth, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

export default function Home(props) {
  //Check if user is authenticated before displaying any notes
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (! user) {
      //Not authenticated
      return navigate("/");
    }
  }, [user, loading]);


  const [notes, setNotes] = React.useState([]);
  const [currentNoteId, setCurrentNoteId] = React.useState("");
  const [tempNoteText, setTempNoteText] = React.useState("");


  //Retrieves the currently-selected note
  //Will always be updated whenever the Home component re-renders
  const currentNote = notes.find(note => { return note.id === currentNoteId}) || notes[0]
  const sortedNotes = notes.sort((noteOne, noteTwo) => noteTwo.updatedAt - noteOne.updatedAt)
  
  //Set up a side effect because we are interacting with Firestore database which is something
  //external of React. We want to set up the snapshot only once, which is when the app initialises.
  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
      //Sync local notes array with latest snapshot from database

      const notesArray = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })).filter(note => note.userId == user.uid);

      setNotes(notesArray);

    });
    return unsubscribe; //Clean up function for React to call when component becomes unmounted
  }, [user]);

  //Set up a side effect to update current node id whenever all notes change
  useEffect(() => {
    if (! currentNoteId) {
      setCurrentNoteId(notes[0] != null ? notes[0].id : "");
    }
  }, [notes, currentNoteId]);


  //Set up a side effect that updates the temp note text whenever the current note changes
  useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body);
    }
  }, [currentNote])


  /*
    Create a side effect that runs any time the tempNoteText changes.
    Delay the sending of APIrequest to Firebase.
    
    When tempNoteText changes, we want to update database. However, we do not call updateNote()
    until 500ms later. In this 500ms, if tempNoteText changes again, useEffect() will run so
    we reset the timer via clearTimeout, and wait for another 500ms. This achieves the
    debouncing effect.

  */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentNote != null && tempNoteText !== currentNote.body) {
        updateNote(tempNoteText)
      }
    }, 500);
    //Clear time out will reset the timeout, cancel running of the function if use effect occurs
    //again within the 500 ms
    return () => clearTimeout(timeoutId);

  }, [tempNoteText]);

  //Creates a new note
  async function createNewNote() {
      const newNote = {
          id: nanoid(),
          body: "# Type your markdown note's title here",
          userId: user.uid,
          createdAt: Date.now(),
          updatedAt: Date.now(),
      }
      //Adds a new doc into the Firestore database.
      //Since we have onSnapshot set up, where Firestore receives a new doc, it will
      //sync with our local state as well. The function addDoc returns us a reference
      //to the new document that is created.
      const newNoteReference = await addDoc(notesCollection, newNote)
      setCurrentNoteId(newNoteReference.id);
  }

  //Updates a note
  async function updateNote(text) {
    const docRef = doc(database, "notes", currentNoteId)
    await setDoc(
        docRef, 
        { body: text, updatedAt: Date.now() }, 
        { merge: true }
    )
}

  //Deletes a note when a trash icon is clicked
  async function deleteNote(noteId) {
    //Get a reference to the doc to be deleted
    //First argument is the reference to the database, second argument is the name
    //of the collection, and third argument is the id of the document.
    const docReference = doc(database, "notes", noteId)

    //Deletes the doc
    await deleteDoc(docReference);

    //Remove the selected note
    setNotes(function (prevNotes) {
      return prevNotes.filter(note => note.id !== noteId);
    })
  }
  
  return (
      <main>
      {
          notes.length > 0 
          ?
          <Split 
              sizes={[30, 70]} 
              direction="horizontal" 
              className="split"
          >
              <Sidebar
                  notes={sortedNotes}
                  currentNote={currentNote}
                  setCurrentNoteId={setCurrentNoteId}
                  newNote={createNewNote}
                  deleteNoteFunction={deleteNote}
                  isDarkMode={props.isDarkMode}
                  toggleDarkMode={props.toggleDarkMode}
              />
              {
                <Editor 
                    tempNoteText={tempNoteText} 
                    setTempNoteText={setTempNoteText}
                    isDarkMode={props.isDarkMode}
                />
              }
          </Split>
          :
          <div className={`no-notes-container ${props.isDarkMode ? "dark" : ''}`}>
            
            <div className="no-notes-options">
              <div className="toggler">
                <p className="toggler-light">Light</p>
                <div className="toggler-slider" onClick={props.toggleDarkMode}>
                    <div className="toggler-slider-circle"></div>
                </div>
                <p className="toggler-dark">Dark</p>
                <button className="logout-button-home" onClick={logout}>Logout</button>
              </div>
            </div>

            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="create-new-note-button" 
                    onClick={createNewNote}
                >
                    Create New Note
                </button>
            </div>
          </div>
          
      }
      </main>
  )
}
