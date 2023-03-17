import React from 'react'
import PropTypes from 'prop-types'

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
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <label>
          Note
          <input
            value={newNote}
            onChange={(event) => setNewNote(event.target.value)}
          />
          <button type="submit">Save</button>
        </label>
      </form>
    </div>
  )
}

NoteForm.propTypes = {
  createNote: PropTypes.func.isRequired,
}

export default NoteForm
