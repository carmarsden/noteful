import React from 'react';
import './NotePageNav.css';

class NotePageNav extends React.Component {
    render() {
        const thisnote = this.props.store.notes.find(note => note.id === this.props.noteid)
        const foldername = this.props.store.folders.find(folder => folder.id === thisnote.folderId).name

        return (
            <nav className='sidebar'>
                <button onClick={this.props.onGoBack} className='backbutton'>Go back</button>
                <h2>{foldername}</h2>
            </nav>
        );        
    }
}

export default NotePageNav;

