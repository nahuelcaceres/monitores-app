import React from 'react'

const Administracion = ({ administracion, toggleImportance }) => {
  const label = administracion.nube
    ? 'make not important'
    : 'make important'

  return (
    <ul className='administracion'>
      {
                administracion.tareas.forEach((tarea) => {
                  <li className='tarea'>
                    {tarea.nombre}
                    <button onClick={toggleImportance}>{label}</button>
                  </li>
                })

            }
    </ul>
  )
}

export default Administracion
