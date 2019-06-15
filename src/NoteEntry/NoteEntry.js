import React from 'react';
import { Link } from 'react-router-dom';
import './NoteEntry.css';
import NotesContext from '../NotesContext';


class NoteEntry extends React.Component {
    static contextType = NotesContext;

    deleteNote(noteId) {
        const options = {
            method: 'DELETE'
        }

        fetch(`http://localhost:9090/notes/${noteId}`, options)
        .then(res => {
            if(!res.ok) {
                throw new Error('Something went wrong deleting your note, please try again later');
            }
            return res.json();
        })
        .then(() => {
            if (this.props.onDeleteRedirect) {this.props.onDeleteRedirect()};
            this.context.deleteNote(noteId);
        })
        .catch(err => {
            console.log(err.message);
        });
    }

    render() {
        const modified = new Date(this.props.note.modified).toUTCString();
        const noteid = this.props.note.id;
        return (
            <div className='noteentry'>
                <h2><Link to={`/note/${noteid}`}>{this.props.note.name}</Link></h2>
                <p>Date Modified: {modified.slice(0,16)}</p>
                <button 
                    onClick={() => {
                        this.deleteNote(noteid)
                    }}
                >
                    Delete Note
                </button>
            </div>
        );        
    }
}

export default NoteEntry;