import React from 'react';
import './NotePageNav.css';
import NotesContext from '../NotesContext';

class NotePageNav extends React.Component {
    static contextType = NotesContext;

    handleGoBack = () => {
        this.props.history.goBack()
    };

    findFolderName = () => {
        if (this.props.match.params.noteid) {
            const thisnote = this.context.notes.find(note => note.id === Number(this.props.match.params.noteid));
            const foldername = this.context.folders.find(folder => folder.id === thisnote.fol_id).fol_name;
            return (
                <h2>{foldername}</h2>
            )
        }
        return ('')
    }

    render() {
        const navdisplay = this.findFolderName()
        
        return (
            <nav className='sidebar'>
                <button onClick={this.handleGoBack} className='backbutton'>Go back</button>
                {navdisplay}
            </nav>
        );        
    }
}

export default NotePageNav;

