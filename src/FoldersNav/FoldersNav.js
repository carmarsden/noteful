import React from 'react';
import { NavLink } from 'react-router-dom';
import './FoldersNav.css';

class FoldersNav extends React.Component {
    render() {
        const folderarray = this.props.folderarray
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
