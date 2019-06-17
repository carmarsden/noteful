import React from 'react';
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
            name: foldername
        }
        
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folderobj),
        }

        fetch(`http://localhost:9090/folders`, options)
        .then(res => {
            if(!res.ok) {
                throw new Error('Something went wrong adding your folder, please try again later');
            }
            return res.json();
        })
        .then(() => {
            console.log(`you posted a new folder: ${foldername}`);

            fetch('http://localhost:9090/folders')
            .then(res => {
                if(!res.ok) {
                    throw new Error('Something went wrong retrieving your new folder, please try refreshing the page');
                }
                return res.json();
            })
            .then(resJson => {
                const fullfolderobj = resJson.find(fol => fol.name === foldername)
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
                            name="foldername" id="foldername" required/>        
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