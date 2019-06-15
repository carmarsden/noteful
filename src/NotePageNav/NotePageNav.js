import React from 'react';
import './NotePageNav.css';
import NotesContext from '../NotesContext';

class NotePageNav extends React.Component {
    static contextType = NotesContext;

    handleGoBack = () => {
        this.props.history.goBack()
    };

    render() {
        const thisnote = this.context.store.notes.find(note => note.id === this.props.match.params.noteid)
        const foldername = this.context.store.folders.find(folder => folder.id === thisnote.folderId).name

        return (
            <nav className='sidebar'>
                <button onClick={this.handleGoBack} className='backbutton'>Go back</button>
                <h2>{foldername}</h2>
            </nav>
        );        
    }
}

export default NotePageNav;

