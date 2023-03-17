import React from 'react'

import noteService from 'services/notes'

import Note from 'components/Note'
import Alert from 'components/Alert'
import { ALERT_TYPE } from 'components/Alert'
import Footer from 'components/Footer'
import loginService from 'services/login'
import LoginForm from 'components/LoginForm'
import NoteForm from 'components/NoteForm'
import Togglable from 'components/Togglable'

import './App.css'

const App = (props) => {
  const [notes, setNotes] = React.useState([])
  const [showAll, setShowAll] = React.useState(true)
  const [message, setMessage] = React.useState(null)

  const [user, setUser] = React.useState(null)

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  React.useEffect(() => {
    const fetchNotes = async () => {
      try {
        const initialNotes = await noteService.getAll()
        setNotes(initialNotes)
      } catch (error) {
        setMessage({
          type: ALERT_TYPE.ERROR,
          content: 'Error fetching notes',
          details: error.message,
        })
      }
    }

    fetchNotes()
  }, [])

  React.useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
    } catch (error) {
      setMessage({
        type: ALERT_TYPE.ERROR,
        content: 'Wrong credentials',
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const toggleImportanceOf = async (id) => {
    const note = notes.find((n) => n.id === id)
    const changeNote = { ...note, important: !note.important }

    try {
      const returnedNote = await noteService.update(id, changeNote)
      setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)))

      setMessage({
        type: ALERT_TYPE.SUCCESS,
        content: `Note '${note.content}' was updated`,
      })
    } catch (error) {
      setMessage({
        type: ALERT_TYPE.ERROR,
        content: `Note '${note.content}' was already removed from server`,
      })

      setNotes(notes.filter((n) => n.id !== id))
    }
  }

  const addNote = async (noteObject) => {
    try {
      const createdNote = await noteService.create(noteObject)
      setNotes(notes.concat(createdNote))

      setMessage({
        type: ALERT_TYPE.SUCCESS,
        content: `Note '${noteObject.content}' was created`,
      })
    } catch (error) {
      setMessage({
        type: ALERT_TYPE.ERROR,
        content: 'Error creating note',
        details: error.message,
      })
    }
  }

  const remove = async (id) => {
    const note = notes.find((n) => n.id === id)

    try {
      await noteService.remove(id)
      setNotes(notes.filter((n) => n.id !== id))

      setMessage({
        type: ALERT_TYPE.SUCCESS,
        content: `Note '${note.content}' was deleted`,
      })
    } catch (error) {
      setMessage({
        type: ALERT_TYPE.ERROR,
        content: `Note '${note.content}' was already removed from server`,
      })

      setNotes(notes.filter((n) => n.id !== id))
    }
  }

  return (
    <div className="container">
      <main>
        <h1>Notes</h1>
        <Alert message={message} setMessage={setMessage} />
        {user === null ? (
          <Togglable buttonLabel="Login">
            <LoginForm handleLogin={handleLogin} />
          </Togglable>
        ) : (
          <div>
            <div>
              <p>
                Welcome {user.name}!{' '}
                <button className="small inline" onClick={handleLogout}>
                  Logout
                </button>
              </p>
            </div>

            <Togglable buttonLabel="New note">
              <NoteForm createNote={addNote} />
            </Togglable>
          </div>
        )}
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            Show {showAll ? 'important' : 'all'}
          </button>
        </div>
        <div>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
              remove={() => remove(note.id)}
            />
          ))}
        </div>
        <Footer />
      </main>
    </div>
  )
}

export default App
