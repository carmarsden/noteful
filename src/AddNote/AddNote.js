import React from 'react';
import config from '../config';
import './AddNote.css';
import NotesContext from '../NotesContext';


class AddNote extends React.Component {
    static contextType = NotesContext;

    state = {
        name: '',
        folderId: '',
        content: '',
        nameValid: false,
        folderIdValid: false,
        formValid: false,
        validationMessages: {
          name: '',
          folderId: '',
        },
        error: null,
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const now = new Date().toJSON();
        const noteobj = {
            note_name: this.state.name,
            content: this.state.content,    
            fol_id: this.state.folderId,
            date_modified: now,
        };

        console.log("you're trying to add a new note! it looks like this:");
        console.log(noteobj);

        
        const postOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            },
            body: JSON.stringify(noteobj),
        }
        const getOptions = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        }

        fetch(`${config.API_SERVER}/api/notes`, postOptions)
        .then(res => {
            if(!res.ok) {
                throw new Error('Something went wrong adding your note, please try again later');
            }
            return res.json();
        })
        .then(() => {
            console.log(`you posted a new note!`);

            fetch(`${config.API_SERVER}/api/notes`, getOptions)
            .then(res => {
                if(!res.ok) {
                    throw new Error('Something went wrong retrieving your new note, please try refreshing the page');
                }
                return res.json();
            })
            .then(resJson => {
                const fullnoteobj = resJson.find(note => note.note_name === noteobj.note_name)
                this.context.addNote(fullnoteobj)
                this.props.history.push(`/note/${fullnoteobj.id}`)
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

    updateNoteName = (name) => {
        this.setState({ name }, () => {this.validateName(name)})
    }
    updateNoteContent = (content) => {
        this.setState({ content })
    }
    updateFolderSelect = (folderId) => {
        this.setState({ folderId }, () => {this.validateFolderId(folderId)})
    }

    validateName(input) {
        const newErrors = {...this.state.validationMessages};
        let hasError = false;
    
        const currentVal = input.trim();
        if (currentVal.length === 0) {
            newErrors.name = 'Name is required';
          hasError = true;
        } else {
            newErrors.name = '';
            hasError = false;
        }
    
        this.setState({
            validationMessages: newErrors,
            nameValid: !hasError
        }, this.validateForm );
    }
    validateFolderId(input) {
        const newErrors = {...this.state.validationMessages};
        let hasError = false;
    
        const currentVal = input.trim();
        if (currentVal.length === 0) {
            newErrors.folderId = 'Please select a folder';
          hasError = true;
        } else {
            newErrors.folderId = '';
            hasError = false;
        }
    
        this.setState({
            validationMessages: newErrors,
            folderIdValid: !hasError
        }, this.validateForm );
    }
    validateForm() {
        this.setState({
            formValid: this.state.nameValid && this.state.folderIdValid
       });
    }


    render() {
        const folderarray = this.context.folders
        const folderoptions = folderarray.map((folder, i) => {
            return (
                <option value={folder.id} key={i}>{folder.fol_name}</option>
            )
        })

        const error = this.state.error 
        ? (<div className='fetcherror'>Oh no, there was an error: {this.state.error}</div>)
        : '';

        return (
            <main className='main'>
                <h2>Create a New Note</h2>
                <p>* = Required Field</p>
                <form className="addform" onSubmit={e => this.handleSubmit(e)}>
                    <div>
                        <label htmlFor="notename">* Note Name: </label>
                        <input type="text" className="addform__input"
                            name="notename" id="notename" aria-describedby="valerr-name"
                            aria-required="true" required
                            onChange={e => this.updateNoteName(e.target.value)}/>
                        <span className="validationerror" id="valerr-name">{this.state.validationMessages.name}</span>
                    </div>
                    <div>
                        <label htmlFor="notecontent">Note Content: </label>
                        <textarea className="addform__textarea"
                            name="notecontent" id="notecontent"
                            onChange={e => this.updateNoteContent(e.target.value)}/>        
                    </div>
                    <div>
                        <label htmlFor="folderselect">* Folder: </label>
                        <select className="addform__select"
                            name="folderselect" id="folderselect" aria-describedby="valerr-folder"
                            aria-required="true" required
                            onChange={e => this.updateFolderSelect(e.target.value)}>
                            <option value=''>--Please choose a folder--</option>
                            {folderoptions}
                        </select>
                        <span className="validationerror" id="valerr-folder">{this.state.validationMessages.folderId}</span>
                    </div>
                    <div>
                        <button type="submit" className="addform__button" disabled={!this.state.formValid}>Submit</button>
                    </div>
                </form>
                {error}
            </main>
        )
    }

}

export default AddNote;