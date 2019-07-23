import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from '../config';
import './NoteEntry.css';
import NotesContext from '../NotesContext';


class NoteEntry extends React.Component {
    static contextType = NotesContext;
    static propTypes = {
        onDeleteRedirect: PropTypes.func,
        note: PropTypes.shape({
            id: PropTypes.number.isRequired,
            note_name: PropTypes.string.isRequired,
            date_modified: PropTypes.string.isRequired,
            fol_id: PropTypes.number.isRequired,
            content: PropTypes.string.isRequired    
        })
    }

    deleteNote(noteId) {
        const options = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        }

        fetch(`${config.API_SERVER}/api/notes/${noteId}`, options)
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
        const note = this.props.note;
        const modifiedString = new Date(note.date_modified).toUTCString();
        return (
            <div className='noteentry'>
                <h2><Link to={`/note/${note.id}`}>{note.note_name}</Link></h2>
                <p>Date Modified: {modifiedString.slice(0,16)}</p>
                <button 
                    onClick={() => {
                        this.deleteNote(note.id)
                    }}
                >
                    Delete Note
                </button>
            </div>
        );        
    }
}

export default NoteEntry;