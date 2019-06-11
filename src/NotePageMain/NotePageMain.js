import React from 'react';
import './NotePageMain.css';
import NoteEntry from '../NoteEntry/NoteEntry';

class NotePageMain extends React.Component {
    render() {
        const thisnote = this.props.notearray.find(note => note.id === this.props.noteid) 

        return (
            <main className='main'>
                <NoteEntry note={thisnote}/>
                <p className='notecontent'>{thisnote.content}</p>
            </main>
        );        
    }
}

export default NotePageMain;