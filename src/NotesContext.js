import React from 'react';
import dummystore from './dummystore';

const NotesContext = React.createContext({
    folders: dummystore.folders,
    notes: dummystore.notes,
    deleteNote: () => {},
    addFolder: () => {},
    addNote: () => {},
})
  
export default NotesContext