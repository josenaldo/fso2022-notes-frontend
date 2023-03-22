import React from 'react'
import PropTypes from 'prop-types'

/**
 * Form for creating a new note.
 *
 * @param {Object} props - Component props.
 * @param {function} props.createNote - Function to call when creating a new note.
 *
 * @returns {JSX.Element} - Rendered component.
 */
const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = React.useState('')

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true,
    })

    setNewNote('')
  }

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <label>
          Note
          <input
            value={newNote}
            onChange={(event) => setNewNote(event.target.value)}
          />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  )
}

NoteForm.propTypes = {
  createNote: PropTypes.func.isRequired,
}

export default NoteForm
