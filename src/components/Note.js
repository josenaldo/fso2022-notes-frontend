import React from 'react'
import PropTypes from 'prop-types'
import './Note.css'

const Note = ({ note, toggleImportance, remove }) => {
  const label = note.important ? 'Make not important' : 'Make important'

  return (
    <article className="note">
      <div>{note.content} </div>
      <div className="grid">
        <button className="small inline" onClick={toggleImportance}>
          {label}
        </button>
        <button className="small inline secondary" onClick={remove}>
          Delete
        </button>
      </div>
    </article>
  )
}

Note.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string.isRequired,
    important: PropTypes.bool.isRequired,
  }).isRequired,
  toggleImportance: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

export default Note
