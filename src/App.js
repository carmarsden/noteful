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
//        store: [],
        store: dummystore2
    }


    render() {
        console.log(this.state.store)
        const contextValue = {
            store: this.state.store,
        }
        return (
            <div className="App">
                <Header />
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
