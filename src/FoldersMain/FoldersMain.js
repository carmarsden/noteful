import React from 'react';
import './FoldersMain.css';
import NoteEntry from '../NoteEntry/NoteEntry';

class FoldersMain extends React.Component {
    render() {
        const notearray = this.props.folderid 
            ? this.props.notearray.filter(note => note.folderId === this.props.folderid) 
            : this.props.notearray
        const notedisplay = notearray.map((note, i) => {
            return (
                <li key={i}>
                    <NoteEntry note={note}/>
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