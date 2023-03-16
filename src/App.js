import React from 'react'

import Note from 'components/Note'
import Notification from 'components/Notification'
import Footer from 'components/Footer'
import noteService from 'services/notes'
import loginService from 'services/login'
import LoginForm from 'components/LoginForm'
import NoteForm from 'components/NoteForm'

import './App.css'

const App = (props) => {
  const [notes, setNotes] = React.useState([])
  const [newNote, setNewNote] = React.useState('A new note...')
  const [showAll, setShowAll] = React.useState(true)
  const [errorMessage, setErrorMessage] = React.useState(null)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [user, setUser] = React.useState(null)

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  React.useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes)
      })
      .catch((error) => {
        setErrorMessage(`Erro: ${error}`)
      })
  }, [])

  React.useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changeNote = { ...note, important: !note.important }

    noteService
      .update(id, changeNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)))
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    }

    noteService.create(noteObject).then((returnedNote) => {
      const createdNote = returnedNote
      setNotes(notes.concat(createdNote))
      setNewNote('')
    })
  }

  return (
    <div className="container">
      <main>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        {user === null ? (
          <LoginForm
            handleLogin={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
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
            <NoteForm
              addNote={addNote}
              newNote={newNote}
              handleNoteChange={handleNoteChange}
            />
          </div>
        )}
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}
          </button>
        </div>
        <div>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </div>
        <Footer />
      </main>
    </div>
  )
}

export default App
