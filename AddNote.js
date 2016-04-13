import React from 'react';

class AddNote extends React.Component {
  setRef(ref) {                  //ref is the reference value of that input box (identify it)
    this.note = ref;
  }
  handleSubmit() {
    var newNote = this.note.value;    //get new note if button is clicked
    this.note.value = '';             //clear the input box
    this.props.addNote(newNote);      //add new note (using the handler)
  }
  render() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Add New Note" ref={(ref) => this.setRef(ref)} />
        <span className='input-group-btn'>
          <button className="btn btn-default" type="button" onClick={() => this.handleSubmit()}>Submit</button>
        </span>
      </div>
    )
  }
};

AddNote.propTypes = {
  username: React.PropTypes.string.isRequired,
  addNote: React.PropTypes.func.isRequired
};

export default AddNote;
