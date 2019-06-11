import React from 'react';
import { Link } from 'react-router-dom';
import './NoteEntry.css';

class NoteEntry extends React.Component {
    render() {
        const modified = new Date(this.props.note.modified).toUTCString();
        return (
            <div className='noteentry'>
                <h2><Link to={`/note/${this.props.note.id}`}>{this.props.note.name}</Link></h2>
                <p>Date Modified: {modified.slice(0,16)}</p>
                <button>Delete Note</button>
            </div>
        );        
    }
}

export default NoteEntry;