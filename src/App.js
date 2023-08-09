import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"
import { useEffect } from "react"

export default function App() {
    const [notes, setNotes] = React.useState(
      JSON.parse(localStorage.getItem("notes"))
      || []);
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )

    //Set up a side effect because we are interacting with local storage, which is something
    //external of React. We want to automatically save the data once there is a change to the
    //notes array.
    useEffect(() => {
      localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes]);



    //Creates a new note
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes]);
        setCurrentNoteId(newNote.id);
    }
    
    //Updates a note and moves it to the front of the array
    function updateNote(text) {
      const newNotesArray = [];
      let selectedNote;
      //Add all non-selected notes
      for (var i = 0; i < notes.length; i = i + 1) {
        if (notes[i].id === currentNoteId) {
          selectedNote = {
            id: notes[i].id,
            body: text
          };
        } else {
          newNotesArray.push(notes[i]);
        }
      }
      //Add selected note to the front of the array     
      newNotesArray.unshift(selectedNote); 

      setNotes(newNotesArray);
      
    }

    //Deletes a note when a trash icon is clicked
    function deleteNote(event, noteId) {
      event.stopPropagation();
      //Remove the selected note
      setNotes(function (prevNotes) {
        return prevNotes.filter(note => note.id !== noteId);
      })
    }
    
    //Helper function that retrieves a particular note
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
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
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNoteFunction={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
