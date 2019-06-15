import React from 'react';
import './FoldersMain.css';
import NoteEntry from '../NoteEntry/NoteEntry';
import NotesContext from '../NotesContext';

class FoldersMain extends React.Component {
    static contextType = NotesContext;

    render() {
        const notearray = this.props.match.params.folderid 
            ? this.context.notes.filter(note => note.folderId === this.props.match.params.folderid) 
            : this.context.notes
        const notedisplay = notearray.map((note, i) => {
            return (
                <li key={i}>
                    <NoteEntry note={note} />
                </li>
            )
        })

        return (
            <main className='main'>
                <ul>
                    {notedisplay}
                </ul>
                <button className='addnote'>Add Note</button>
            </main>
        );        
    }
}

export default FoldersMain;