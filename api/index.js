const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('../app/build'))

const tareas = [
  {
    nombreAda4: 'SERVICIO_SYNC_RECLAMOS',
    nombreVisual: 'reclamos',
    intervalo: 10,
    semaforo: {
      activa: 60,
      intermedia: 5760,
      apagada: 5761
    }
  },
  {
    nombreAda4: 'SERVICIO_SYNC_FACTURAS_ONLINE',
    nombreVisual: 'facturas_online',
    intervalo: 10,
    semaforo: {
      activa: 60,
      intermedia: 5760,
      apagada: 5761
    }
  },
  {
    nombreAda4: 'SERVICIO_SYNC_PERFIT',
    nombreVisual: 'perfit',
    intervalo: 10,
    semaforo: {
      activa: 60,
      intermedia: 5760,
      apagada: 5761
    }
  },
  {
    nombreAda4: 'SERVICIO_SYNC_PROVEEDORES',
    nombreVisual: 'proveedores',
    intervalo: 720,
    semaforo: {
      activa: 720,
      intermedia: 1440,
      apagada: 1441
    }
  },
  {
    nombreAda4: 'SERVICIO_SYNC_USUARIOS',
    nombreVisual: 'usuarios',
    intervalo: 10,
    semaforo: {
      activa: 60,
      intermedia: 5760,
      apagada: 5761
    }
  },
  {
    nombreAda4: 'SERVICIO_SYNC_DEUDORES',
    nombreVisual: 'deudores',
    intervalo: 720,
    semaforo: {
      activa: 720,
      intermedia: 1440,
      apagada: 1441
    }
  }
]

let monitores = [
  {
    id: 1,
    codigoascii: 5553,
    codigosasa: '75',
    detalle: 'Mendonca & Piran',
    nube: false,
    ultimosync: '2021-05-30T17:30:31.098Z',
    tareas: [
      {
        nombre: 'SERVICIO_SYNC_RECLAMOS',
        activa: true,
        descripcion: 'Matiene sincronizado los reclamos que ingresan en consorciosenred con ada4d',
        intervalo: 10,
        ultimaEjecucion: '2021-06-17T00:30:31.098Z'
      },
      {
        nombre: 'SERVICIO_SYNC_FACTURAS_ONLINE',
        activa: true,
        descripcion: 'Matiene sincronizado las facturas online via consorciosenred contra ada4d',
        intervalo: 10,
        ultimaEjecucion: '2021-06-08T00:30:31.098Z'
      },
      {
        nombre: 'SERVICIO_SYNC_PERFIT',
        activa: true,
        descripcion: 'Realiza los envios de mail de ada4d',
        intervalo: 10,
        ultimaEjecucion: '2021-06-10T11:20:31.098Z'
      },
      {
        nombre: 'SERVICIO_SYNC_PROVEEDORES',
        activa: true,
        descripcion: 'Realiza la sincronizacion de proveedores en azure',
        intervalo: 720,
        ultimaEjecucion: '2021-06-18T23:30:31.098Z'
      }

    ]
  },
  {
    id: 2,
    codigoascii: 7376,
    codigosasa: 'IL',
    detalle: 'Admin SASA',
    nube: true,
    ultimosync: '2021-04-30T11:24:41.098Z',
    tareas: [
      {
        nombre: 'SERVICIO_SYNC_RECLAMOS',
        activa: true,
        descripcion: 'Matiene sincronizado los reclamos que ingresan en consorciosenred con ada4d',
        intervalo: 10,
        ultimaEjecucion: '2021-06-18T19:30:31.098Z'
      },
      {
        nombre: 'SERVICIO_SYNC_FACTURAS_ONLINE',
        activa: false,
        descripcion: 'Matiene sincronizado las facturas online via consorciosenred contra ada4d',
        intervalo: 10,
        ultimaEjecucion: '2021-05-07T11:30:31.098Z'
      },
      {
        nombre: 'SERVICIO_SYNC_PERFIT',
        activa: true,
        descripcion: 'Realiza los envios de mail de ada4d',
        intervalo: 10,
        ultimaEjecucion: '2021-06-15T12:02:31.098Z'
      },
      {
        nombre: 'SERVICIO_SYNC_USUARIOS',
        activa: true,
        descripcion: 'Realiza la sincronizacion de usuarios en azure',
        intervalo: 1440,
        ultimaEjecucion: '2021-05-07T11:30:31.098Z'
      }
    ]
  },
  {
    id: 3,
    codigoascii: 7756,
    codigosasa: '64',
    detalle: 'BienBravas',
    nube: false,
    ultimosync: '2021-05-30T17:30:31.098Z',
    tareas: [
      {
        nombre: 'SERVICIO_SYNC_RECLAMOS',
        activa: true,
        descripcion: 'Matiene sincronizado los reclamos que ingresan en consorciosenred con ada4d',
        intervalo: 10,
        ultimaEjecucion: '2021-06-18T23:30:31.098Z'
      },
      {
        nombre: 'SERVICIO_SYNC_FACTURAS_ONLINE',
        activa: true,
        descripcion: 'Matiene sincronizado las facturas online via consorciosenred contra ada4d',
        intervalo: 10,
        ultimaEjecucion: '2021-05-07T11:30:31.098Z'
      },
      {
        nombre: 'SERVICIO_SYNC_PERFIT',
        activa: true,
        descripcion: 'Realiza los envios de mail de ada4d',
        intervalo: 10,
        ultimaEjecucion: '2021-06-18T23:30:31.098Z'
      },
      {
        nombre: 'SERVICIO_SYNC_PROVEEDORES',
        activa: true,
        descripcion: 'Realiza la sincronizacion de proveedores en azure',
        intervalo: 1440,
        ultimaEjecucion: '2021-06-18T23:30:31.098Z'
      }
    ]
  }
]

const estadisticas = {
  total_administraciones: 219,
  total_nube: 45,
  total_servicio_activo: 192
}

app.get('/api/tareas', (request, response) => {
  response.json(tareas)
})

app.get('/api/monitores', (request, response) => {
  const monitors = []

  monitores.forEach((admin, index) => {
    const monitorCopy = { ...admin }

    monitors.push(monitorCopy)
    monitors[index].tareas = []

    tareas.forEach(tarea => {
      const monitor = admin.tareas.find(element => {
        return (element.nombre === tarea.nombreAda4)
      })

      if (monitor) {
        monitors[index].tareas.push(monitor)
      } else {
        monitors[index].tareas.push(createEmptyMonitor())
      }
    })
  })

  return response.json(monitors)
})

function createEmptyMonitor () {
  return {
    nombre: 'N/A',
    activa: false,
    descripcion: 'N/A',
    intervalo: 10,
    ultimaEjecucion: '2001-01-01T01:01:01.001Z'
  }
}

app.get('/api/monitores/:codigoascii', (request, response) => {
  const codigoascii = Number(request.params.codigoascii)

  const resultado = monitores.find((monitor) => { return monitor.codigoascii === codigoascii })

  if (resultado) {
    response.json(resultado)
  } else {
    response.status(404).end()
  }
})

app.post('/api/monitores', (request, response) => {
  const nuevoMonitor = request.body

  if (!nuevoMonitor || !nuevoMonitor.tareas) {
    return response.status(400).json({
      error: 'nuevoMonitor.tareas es requerido'
    })
  }

  nuevoMonitor.id = Math.max(...monitores.map(monitor => monitor.id)) + 1
  nuevoMonitor.fecha = new Date().toISOString()

  monitores = [...monitores, nuevoMonitor] // or monitores.concat()

  response.status(201).json(nuevoMonitor)
})

app.delete('/api/monitores/:codigoascii', (request, response) => {
  const codigoascii = Number(request.params.codigoascii)

  monitores = monitores.filter(monitor => monitor.codigoascii !== codigoascii)

  response.status(204).end()
})

app.get('/api/estadisticas', (request, response) => {
  response.status(200).json(estadisticas)
})

app.use((request, response) => {
  console.log(request.path)

  response.status(404).json({
    error: 'Not found'
  })
})

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
