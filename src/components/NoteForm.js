import React from 'react'
import PropTypes from 'prop-types'

const NoteForm = ({ onSubmit, value, handleChange }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          Note
          <input value={value} onChange={handleChange} />
          <button type="submit">Save</button>
        </label>
      </form>
    </div>
  )
}

NoteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default NoteForm
