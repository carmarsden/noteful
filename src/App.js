import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import dummystore from './dummystore';
import NotesContext from './NotesContext';
import Header from './Header/Header';
import FoldersNav from './FoldersNav/FoldersNav';
import FoldersMain from './FoldersMain/FoldersMain';
import NotePageNav from './NotePageNav/NotePageNav';
import NotePageMain from './NotePageMain/NotePageMain';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';

class App extends React.Component {
    state = {
        folders: dummystore.folders,
        notes: dummystore.notes,
        error: null,
    }

    componentDidMount() {
        fetch('http://localhost:9090/folders')
        .then(res => {
            if(!res.ok) {
                throw new Error('Something went wrong retrieving your folders, please try again later');
            }
            return res.json();
        })
        .then(resJson => {
            this.setState({
                folders: resJson
            })
        })
        .catch(err => {
            this.setState({
                error: err.message
            });
        });

        fetch('http://localhost:9090/notes')
        .then(res => {
            if(!res.ok) {
                throw new Error('Something went wrong retrieving your notes, please try again later');
            }
            return res.json();
        })
        .then(resJson => {
            this.setState({
                notes: resJson
            })
        })
        .catch(err => {
            this.setState({
                error: err.message
            });
        });
    }

    handleDeleteNote = (noteId) => {
        console.log(`now deleting note ${noteId}`);
        const newNotes = this.state.notes.filter(note => note.id !== noteId)
        this.setState({
            notes: newNotes
        })
    }

    handleAddFolder = (folder) => {
        this.setState({
            folders: [...this.state.folders, folder]
        })
    }
    handleAddNote = (note) => {
        this.setState({
            notes: [...this.state.notes, note]
        })
    }

    render() {
        console.log(this.state)
        const contextValue = {
            folders: this.state.folders,
            notes: this.state.notes,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote,
        }
        const error = this.state.error 
        ? (<div className='fetcherror'>{this.state.error}
        <p>This data may be "dummy" data, please ensure you are connected to the Noteful local server and refresh the page</p>
        </div>)
        : '';

        return (
            <div className="App">
                <Header />
                {error}
                <NotesContext.Provider value={contextValue}>
                    <div className='appbody'>
                        <>
                            <Route 
                                exact path='/'
                                component={FoldersNav}
                            />
                            <Route 
                                path='/folder/:folderid'
                                component={FoldersNav}
                            />
                            <Route 
                                path='/note/:noteid'
                                component={NotePageNav}
                            />
                            <Route 
                                path='/addfolder'
                                component={NotePageNav}
                            />
                            <Route 
                                path='/addnote'
                                component={NotePageNav}
                            />


                        </>
                        <>
                            <Route 
                                exact path='/'
                                component={FoldersMain}
                            />
                            <Route 
                                path='/folder/:folderid'
                                component={FoldersMain}
                            />
                            <Route 
                                path='/note/:noteid'
                                component={NotePageMain}
                            />
                            <Route 
                                path='/addfolder'
                                component={AddFolder}
                            />
                            <Route 
                                path='/addnote'
                                component={AddNote}
                            />

                        </>
                    </div>
                </NotesContext.Provider>
            </div>
        );    
    }
}

export default App;
