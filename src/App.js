import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import dummystore from './dummystore';
import config from './config';
import NotesContext from './NotesContext';
import Header from './Header/Header';
import FoldersNav from './FoldersNav/FoldersNav';
import FoldersMain from './FoldersMain/FoldersMain';
import NotePageNav from './NotePageNav/NotePageNav';
import NotePageMain from './NotePageMain/NotePageMain';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import ErrorBoundary from './ErrorBoundaries/ErrorBoundary';

class App extends React.Component {
    state = {
        folders: dummystore.folders,
        notes: dummystore.notes,
        error: null,
    }

    componentDidMount() {
        const options = {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${config.API_KEY}`
            }
        }

        Promise.all([
            fetch(`${config.API_SERVER}/api/folders`, options),
            fetch(`${config.API_SERVER}/api/notes`, options)            
        ])
        .then(([resFolders, resNotes]) => {
            if(!resFolders.ok) {
                throw new Error('Something went wrong retrieving your folders, please try again later');
            }
            if(!resNotes.ok) {
                throw new Error('Something went wrong retrieving your notes, please try again later');
            }
            return Promise.all([
                resFolders.json(),
                resNotes.json(),
            ]);
        })
        .then(([foldersJson, notesJson]) => {
            this.setState({
                folders: foldersJson,
                notes: notesJson
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
                        <ErrorBoundary appSection='navigation section'>
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
                        </ErrorBoundary>

                        <ErrorBoundary appSection='main section'>
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
                        </ErrorBoundary>
                    </div>
                </NotesContext.Provider>
            </div>
        );    
    }
}

export default App;
