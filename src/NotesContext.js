import React from 'react';

const NotesContext = React.createContext({
    folders: [],
    notes: [],
    deleteNote: () => {},
    addFolder: () => {},
    addNote: () => {},
})
  
export default NotesContext