import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL // 'http://localhost:3005/api'

// let token = null

// const setToken = newToken => {
//   token = `Bearer ${newToken}`
// }

const getMonitors = async () => {
  const request = axios.get(baseUrl.concat('/monitores'))

  return request.then(response => response.data)

  //   const monitors = []
  //   const tasks = await getTareas()
  //   const administrations = await getAll()

  //   administrations.administraciones.forEach((admin, index) => {

  //     const adminCopy = {...admin}

  //     monitors.push(adminCopy)
  //     monitors[index].tareas = []

  //     tasks.forEach(task => {

  //       let monitor = admin.tareas.find(element => {
  //         return (element.nombre === task.nombreAda4)
  //       })

  //       if (monitor) {
  //         monitors[index].tareas.push(monitor)
  //       } else {
  //         monitors[index].tareas.push(createEmptyMonitor())
  //       }

  //     })

  //   });

//   return monitors
}

// function createEmptyMonitor() {
//   return {
//     nombre: "N/A",
//     activa: false,
//     descripcion: "N/A",
//     intervalo: 10,
//     ultimaEjecucion: "2001-01-01T01:01:01.001Z"
//   }
// }

const getAll = async () => {
  const data = await require('../db-administraciones.json')

  return data
}

const getTareas = async () => {
  const tareas = await require('../db-tareas.json')

  return tareas.tareas
}

const getEstadisticas = async () => {
  const request = axios.get(baseUrl.concat('/estadisticas'))

  return request.then(response => response.data)
  //   const estadisticas = await require('../db-estadisticas.json')

//   return estadisticas.estadisticas
}
// const create = (newObject) => {
//   const config = {
//     headers: {
//       Authorization: token
//     }
//   }

//   const request = axios.post(baseUrl, newObject, config)
//   return request.then(response => response.data)
// }

// const update = (id, newObject) => {
//   const config = {
//     headers: {
//       Authorization: token
//     }
//   }

//   const request = axios.put(`${baseUrl}/${id}`, newObject, config)
//   return request.then(response => response.data)
// }

export default { getAll, getTareas, getMonitors, getEstadisticas }
