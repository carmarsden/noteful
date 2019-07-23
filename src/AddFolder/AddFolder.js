import React from 'react';
import config from '../config';
import './AddFolder.css';
import NotesContext from '../NotesContext';


class AddFolder extends React.Component {
    static contextType = NotesContext;

    state = {
        error: null
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const foldername = event.target['foldername'].value;
        const folderobj = {
            fol_name: foldername
        }
        
        const postOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            },
            body: JSON.stringify(folderobj),
        }
        const getOptions = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        }


        fetch(`${config.API_SERVER}/api/folders`, postOptions)
        .then(res => {
            if(!res.ok) {
                throw new Error('Something went wrong adding your folder, please try again later');
            }
            return res.json();
        })
        .then(() => {
            console.log(`you posted a new folder: ${foldername}`);

            fetch(`${config.API_SERVER}/api/folders`, getOptions)
            .then(res => {
                if(!res.ok) {
                    throw new Error('Something went wrong retrieving your new folder, please try refreshing the page');
                }
                return res.json();
            })
            .then(resJson => {
                const fullfolderobj = resJson.find(fol => fol.fol_name === foldername)
                this.context.addFolder(fullfolderobj)
                this.props.history.push(`/folder/${fullfolderobj.id}`)
            })
            .catch(err => {
                this.setState({
                    error: err.message
                });
            });
        })
        .catch(err => {
            this.setState({
                error: err.message
            });
        });
    }

    render() {
        const error = this.state.error 
        ? (<div className='fetcherror'>Oh no, there was an error: {this.state.error}</div>)
        : '';

        return (
            <main className='main'>
                <h2>Create a New Folder</h2>
                <form className="addform" onSubmit={e => this.handleSubmit(e)}>
                    <div>
                        <label htmlFor="foldername">Folder Name: </label>
                        <input type="text" className="addform__input"
                            name="foldername" id="foldername" aria-required="true" required/>        
                    </div>
                    <div>
                        <button type="submit" className="addform__button">Submit</button>
                    </div>
                </form>
                {error}
            </main>
        )
    }

}

export default AddFolder;