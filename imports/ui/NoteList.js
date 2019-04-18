import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

import { Notes } from "../api/notes";


export const NoteList = props => {
  return (
    <div>
      <NoteListHeader />

      {props.notes.map(note => {
        return (
          <NoteListItem key={ note._id } note={ note } />
        );
      })}

      NoteList { props.notes.length }
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
};

export default createContainer(() => {
  // subscribe to `notes`
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch()
  };
}, NoteList);
