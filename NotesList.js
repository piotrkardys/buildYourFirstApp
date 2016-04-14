import React from 'react';

const NotesList = (props) => {
  return (                                    //maping notes (forEach element)
    <ul className="list-group">
      {props.notes.map((note, index) => (
        <li className="list-group-item" key={index}>{note}</li>
          )
        )
      }
    </ul>
  )
};

export default NotesList;
