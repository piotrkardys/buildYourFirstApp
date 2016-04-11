var React = require('react');

var NotesList = React.createClass({
  render: function() {
    var notes = this.props.notes.map(function(note, index) {    //maping notes (forEach element)
      return <li className="list-group-item" key={index}>{note['.val']}</li>
    });
    return (
      <ul className="list-group">
        {notes}
      </ul>
    )
  }
});

module.exports = NotesList;
