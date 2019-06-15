import React from 'react';
import './NotePageMain.css';
import NoteEntry from '../NoteEntry/NoteEntry';
import NotesContext from '../NotesContext';

class NotePageMain extends React.Component {
    static contextType = NotesContext;

    render() {
        const thisnote = this.context.store.notes.find(note => note.id === this.props.match.params.noteid) 

        return (
            <main className='main'>
                <NoteEntry note={thisnote}/>
                <p className='notecontent'>{thisnote.content}</p>
            </main>
        );        
    }
}

export default NotePageMain;