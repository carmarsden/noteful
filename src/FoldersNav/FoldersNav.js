import React from 'react';
import { NavLink } from 'react-router-dom';
import './FoldersNav.css';
import NotesContext from '../NotesContext';

class FoldersNav extends React.Component {
    static contextType = NotesContext;

    render() {
        const folderarray = this.context.folders
        const folderdisplay = folderarray.map((folder, i) => {
            return (
                <li key={i}>
                    <NavLink to={`/folder/${folder.id}`} className='sidebaritem'>{folder.name}</NavLink>
                </li>
            )
        })

        return (
            <nav className='sidebar'>
                <ul>
                    {folderdisplay}
                </ul>
                <button className='addfolder'>Add Folder</button>
            </nav>
        );        
    }
}

export default FoldersNav;
