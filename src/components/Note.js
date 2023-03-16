import React from 'react'
import PropTypes from 'prop-types'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'Make not important' : 'Make important'

  return (
    <article>
      {note.content}{' '}
      <button className="small inline" onClick={toggleImportance}>
        {label}
      </button>
    </article>
  )
}

Note.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string.isRequired,
    important: PropTypes.bool.isRequired,
  }).isRequired,
  toggleImportance: PropTypes.func.isRequired,
}

export default Note
