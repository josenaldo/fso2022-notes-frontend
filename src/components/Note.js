import React from 'react'
import PropTypes from 'prop-types'
import './Note.css'
import FormattedDate from 'components/FormattedDate'

/**
 * Component that displays a note with a content, date and importance status.
 * @component
 *
 * @param {Object} props - The component props.
 * @param {Object} props.note - The note object containing content, important, id and date.
 * @param {function} props.toggleImportance - The function to toggle the note's importance status.
 * @param {function} props.remove - The function to remove the note from the list.
 *
 * @return {JSX.Element} - The rendered note element.
 *
 * @example
 * import React from 'react';
 * import Note from './Note';
 *
 * const note = {
 *   id: 1,
 *   content: 'This is a note',
 *   date: '2022-10-21T22:34:00.000Z',
 *   important: true,
 * };
 *
 * const App = () => {
 *   const toggleImportance = () => {
 *     // toggle note importance
 *   }
 *
 *   const remove = () => {
 *     // remove note
 *   }
 *
 *   return (
 *     <div>
 *       <Note note={note} toggleImportance={toggleImportance} remove={remove} />
 *     </div>
 *   );
 * };
 *
 * export default App;
 */
const Note = ({ note, toggleImportance, remove }) => {
  const label = note.important ? 'Make not important' : 'Make important'

  return (
    <article className="note">
      <div>
        <FormattedDate dateString={note.date} />
      </div>
      <div className="note-content">
        <span>{note.content}</span>
      </div>

      <div className="grid">
        <button
          className="importance-button small inline"
          onClick={toggleImportance}
        >
          {label}
        </button>
        <button
          className="delete-button small inline secondary"
          onClick={remove}
        >
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
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  toggleImportance: PropTypes.func,
  remove: PropTypes.func,
}

export default Note
