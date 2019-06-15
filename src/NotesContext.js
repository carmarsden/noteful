import React from 'react';
import dummystore from './dummystore';

const NotesContext = React.createContext({
    store: dummystore,
    addBookmark: () => {},
})
  
export default NotesContext