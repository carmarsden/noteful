import React from 'react';
import dummystore from './dummystore';

const NotesContext = React.createContext({
    folders: dummystore.folders,
    notes: dummystore.notes,
    addBookmark: () => {},
})
  
export default NotesContext