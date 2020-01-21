import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

import { Notes } from "../api/notes";


export const NoteList = props => {
  return (
    <div>
      <NoteListHeader />

      { props.notes.length ? undefined : <NoteListEmptyItem /> }

      {
        props.notes.map(note => {
          return (
            <NoteListItem key={ note._id } note={ note } />
          );
        })
      }

      NoteList { props.notes.length }
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  // subscribe to `notes`
  Meteor.subscribe('notes');

  return {
    notes: Notes.find({}, { sort: { updatedAt: -1 } }).fetch().map(note => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      };
    })
  };
}, NoteList);