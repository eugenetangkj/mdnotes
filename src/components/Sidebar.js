import React from "react"
import { BsTrash } from "react-icons/bs";
import { logout } from "../firebase";

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                <button className="delete-button" onClick={() => props.deleteNoteFunction(note.id)}>
                    <BsTrash className="note-trash trash-icon"/>
                </button>
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="side-bar-button" onClick={props.newNote}>+</button>
                <button className="side-bar-button" onClick={logout}>Logout</button>
            </div>
            {noteElements}
        </section>
    )
}
