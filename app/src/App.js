import React, { useState, useEffect } from 'react'
// import Note from './components/Note'
// import Notification from './components/Notification'
// import noteService from './services/notes'
// import loginService from './services/login'
import administacionService from './services/administraciones'
import timeAgo from './services/timeAgo'
// import LoginForm from './components/LoginForm.js'
// import NoteForm from './components/NoteForm.js'

const App = () => {
  // const [notes, setNotes] = useState([])
  const [administraciones, setAdministraciones] = useState([])
  const [tareas, setTareas] = useState([])

  //   const [showAll, setShowAll] = useState(true)
  //   const [errorMessage, setErrorMessage] = useState(null)

  //   const [username, setUsername] = useState('')
  //   const [password, setPassword] = useState('')
  //   const [user, setUser] = useState(null)

  // useEffect(() => {
  //   noteService
  //     .getAll()
  //     .then(initialNotes => {
  //       setNotes(initialNotes)
  //     })
  // }, [])

  useEffect(() => {
    administacionService
      .getAll()
      .then(initialAdministraciones => {
        setAdministraciones(initialAdministraciones.administraciones)
      })
  }, [])

  useEffect(() => {
    administacionService
      .getTareas()
      .then(tareas => {
        tareas.tareas.unshift({ nombreAda4: 'administracion', nombreVisual: 'administracion' })
        setTareas(tareas.tareas)
      })
  }, [])

  //   useEffect(() => {
  //     const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
  //     if (loggedUserJSON) {
  //       const user = JSON.parse(loggedUserJSON)
  //       setUser(user)
  //       noteService.setToken(user.token)
  //     }
  //   }, [])

  const renderHeader = () => {
    return tareas && tareas.map((tarea, index) => {
      return <th key={index}>{tarea.nombreVisual.toUpperCase()}</th>
    })
  }

  const renderBody = () => {
    return administraciones && administraciones.map((administracion) => {
      return (
        <tr key={administracion.codigoascii}>
          <td className='tadministracion'>{administracion.detalle}</td>
          {
            administracion.tareas.map((tarea, index) => {
              const ultimaEjecucion = new Date(tarea.ultimaEjecucion)

              return <td key={index} id={index} className={tarea.activa ? 'ttarea-activa' : 'ttarea-inactiva'}>{timeAgo.getTimeAgo(ultimaEjecucion)}</td>
            })
          }
        </tr>
      )
    })
  }

  //   const handleLogout = () => {
  //     setUser(null)
  //     noteService.setToken(null)
  //     window.localStorage.removeItem('loggedNoteAppUser')
  //   }

  // const addNote = (noteObject) => {
  //   noteService
  //     .create(noteObject)
  //     .then(returnedNote => {
  //       setNotes(notes.concat(returnedNote))
  //     })
  // }

  // const toggleImportanceOf = (id) => {
  //   const note = notes.find(n => n.id === id)
  //   const changedNote = { ...note, important: !note.important }

  //   noteService
  //     .update(id, changedNote)
  //     .then(returnedNote => {
  //       setNotes(notes.map(note => note.id !== id ? note : returnedNote))
  //     })
  //     .catch(error => {
  //       setErrorMessage(
  //         `Note '${note.content}' was already removed from server`
  //       )
  //       setTimeout(() => {
  //         setErrorMessage(null)
  //       }, 5000)
  //     })
  // }

  //   const handleLogin = async (event) => {
  //     event.preventDefault()

  //     try {
  //       const user = await loginService.login({
  //         username,
  //         password
  //       })

  //       window.localStorage.setItem(
  //         'loggedNoteAppUser', JSON.stringify(user)
  //       )

  //       noteService.setToken(user.token)

  //       setUser(user)
  //       setUsername('')
  //       setPassword('')
  //     } catch (e) {
  //       setErrorMessage('Wrong credentials')
  //       setTimeout(() => {
  //         setErrorMessage(null)
  //       }, 5000)
  //     }
  //   }

  // const notesToShow = showAll
  //   ? notes
  //   : notes.filter(note => note.important)

  return (
    <div>
      <h1 id='title'>Monitoreo de Administraciones</h1>

      {/* <Notification message={errorMessage} /> */}

      {
        // user
        //   ? <NoteForm
        //     addNote={addNote}
        //     handleLogout={handleLogout}
        //   />
        //   : <LoginForm
        //     username={username}
        //     password={password}
        //     handleUsernameChange={
        //       ({ target }) => setUsername(target.value)}
        //     handlePasswordChange={
        //       ({ target }) => setPassword(target.value)
        //     }
        //     handleSubmit={handleLogin}
        //   />
      }

      {/* <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div> */}
      <table id='tareas'>
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>

        <tbody>
          {renderBody()}
        </tbody>
      </table>
    </div>
  )
}

export default App
