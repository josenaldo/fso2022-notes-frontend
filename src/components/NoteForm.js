import React from 'react'
import PropTypes from 'prop-types'

const NoteForm = ({ addNote, newNote, handleNoteChange }) => {
  return (
    <article>
      <form onSubmit={addNote}>
        <label>
          Note
          <input value={newNote} onChange={handleNoteChange} />
          <button type="submit">Save</button>
        </label>
      </form>
    </article>
  )
}

NoteForm.propTypes = {
  addNote: PropTypes.func.isRequired,
  newNote: PropTypes.string.isRequired,
  handleNoteChange: PropTypes.func.isRequired,
}

export default NoteForm
