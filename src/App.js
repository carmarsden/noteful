import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import dummystore from './dummystore';
import Header from './Header/Header';
import FoldersNav from './FoldersNav/FoldersNav';
import FoldersMain from './FoldersMain/FoldersMain';
import NotePageNav from './NotePageNav/NotePageNav';
import NotePageMain from './NotePageMain/NotePageMain';

class App extends React.Component {
    state = {
        store: dummystore
    }


    render() {
        console.log(this.state.store)
        return (
            <div className="App">
                <Header />
                <div className='appbody'>
                    <>
                        <Route 
                            exact path='/'
                            render={() => 
                                <FoldersNav folderarray={this.state.store.folders}/>}
                        />
                        <Route 
                            path='/folder/:folderid'
                            render={({ match }) => 
                                <FoldersNav 
                                    folderarray={this.state.store.folders}
                                    folderid={match.params.folderid}/>}
                        />
                        <Route 
                            path='/note/:noteid'
                            render={(props) => 
                                <NotePageNav 
                                    store={this.state.store}
                                    noteid={props.match.params.noteid}
                                    onGoBack={() => props.history.goBack()}/>
                            }
                        />

                    </>
                    <>
                        <Route 
                            exact path='/'
                            render={() => 
                                <FoldersMain notearray={this.state.store.notes}/>}
                        />
                        <Route 
                            path='/folder/:folderid'
                            render={({ match }) => 
                                <FoldersMain 
                                    notearray={this.state.store.notes}
                                    folderid={match.params.folderid}/>}
                        />
                        <Route 
                            path='/note/:noteid'
                            render={({ match }) => 
                                <NotePageMain 
                                    notearray={this.state.store.notes}
                                    noteid={match.params.noteid}/>}
                        />

                    </>
                </div>
            </div>
        );    
    }
}

export default App;
