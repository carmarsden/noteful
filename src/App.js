import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import dummystore from './dummystore';
import dummystore2 from './dummystore2';
import NotesContext from './NotesContext';
import Header from './Header/Header';
import FoldersNav from './FoldersNav/FoldersNav';
import FoldersMain from './FoldersMain/FoldersMain';
import NotePageNav from './NotePageNav/NotePageNav';
import NotePageMain from './NotePageMain/NotePageMain';

class App extends React.Component {
    state = {
        store: dummystore2,
        folders: dummystore2.folders,
        notes: dummystore2.notes,
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
            console.log(resJson);
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
            console.log(resJson);
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


    render() {
        console.log(this.state)
        const contextValue = {
            store: this.state.store,
            folders: this.state.folders,
            notes: this.state.notes,
        }
        const error = this.state.error ? <div className='error'>{this.state.error}</div> : '';

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

                        </>
                    </div>
                </NotesContext.Provider>
            </div>
        );    
    }
}

export default App;
