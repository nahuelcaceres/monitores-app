import { useState, useEffect } from 'react'
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'
import administacionService from '../services/administraciones'
import timeAgo from '../services/timeAgo'

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  },
  table: {
    minWidth: 650
  },
  tableHead: {
    // backgroundColor: 'gray',
    color: 'rgb(199 76 17 / 87%)',
    border: '5'
  },
  chip: {
    color: 'green'
  }
})

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: '0px 0px',
    borderRadius: 6,
    textAlign: 'center',
    boxShadow: '0 2px 5px 2px rgba(255, 105, 135, .3)',
    // transition: 'transform .2s',
    '&:hover': {
      // transform: 'scale(1.05)'
      border: '1px solid'
    }
  }
}))(TableCell)

const Monitores = () => {
  const [monitors, setMonitors] = useState([])
  const [tasks, setTasks] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [queryByAdmin, setQueryByAdmin] = useState('')

  const classes = useStyles()

  useEffect(() => {
    administacionService
      .getTareas()
      .then(result => {
        setTasks(result)
      })
  }, [])

  useEffect(() => {
    administacionService
      .getMonitors()
      .then(result => {
        setMonitors(result)
      })
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleChangeQueryByAdmin = (event) => {
    setQueryByAdmin(event.target.value)
  }

  if (!monitors.length === 0) return

  const renderFilterAdmin = () => {
    return (
      <TextField
        className='filtrarAdmin'
        label='Filtrar Admin'
        value={queryByAdmin}
        onChange={handleChangeQueryByAdmin}
      />
    )
  }

  const getLabelAndStyle = (task, timeAgoTask) => {
    let label = 'No Conf.'
    let style = { backgroundColor: 'fushsia', color: 'black' }

    const styleActiva = { backgroundColor: 'green', color: 'white' }
    const styleReciente = { backgroundColor: 'yellow', color: 'black' }
    const styleApagada = { backgroundColor: 'red', color: 'white' }

    //  Configuracion de Tarea por nuestra parte (en el monitoresWeb)
    // {
    //     "nombreAda4": "SERVICIO_SYNC_PERFIT",
    //         "nombreVisual": "perfit",
    //             "intervalo": 10,
    //                 "semaforo": {
    //                               "activa": 60,
    //                               "intermedia": 5760,
    //                               "apagada": 5761
    //     }
    // }

    const taskConfig = tasks.find(config => config.nombreAda4 === task.nombre)

    if (!taskConfig) return { label, style }
    if (taskConfig.semaforo === undefined) return { label, style }

    if (timeAgoTask.value <= taskConfig.semaforo.activa) {
      label = 'Activa'
      style = styleActiva

      return { label, style }
    }

    if (timeAgoTask.value <= taskConfig.semaforo.intermedia) {
      label = 'Reciente'
      style = styleReciente

      return { label, style }
    }

    label = 'Apagada'
    style = styleApagada

    return { label, style }
  }

  const renderBody = () => {
    const filteredMonitors = queryByAdmin
      ? monitors.filter(x => x.detalle.toLowerCase().includes(queryByAdmin.toLowerCase()))
      : monitors

    return filteredMonitors && filteredMonitors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((administracion, index) => {
      return (
        <TableRow key={administracion.id}>

          <TableCell key={index}>
            {administracion.detalle}

          </TableCell>
          {
                        administracion.tareas.map((tarea, idx) => {
                          const timeAgoTask = timeAgo.getTimeAgo(new Date(tarea.ultimaEjecucion))
                          const { label, style } = getLabelAndStyle(tarea, timeAgoTask)

                          return (
                            <StyledTableCell key={`${index}_${idx}`}>
                              {timeAgoTask.description}
                              <div>
                                <Chip
                                  size='small'
                                  label={label}
                                  style={style}
                                />
                              </div>
                            </StyledTableCell>
                          )
                        })
                    }
        </TableRow>
      )
    })
  }

  const renderTablePagination = () => {
    return (
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={monitors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    )
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead className={classes.tableHead}>

            <TableRow>
              {renderFilterAdmin()}
            </TableRow>

            <TableRow>
              <TableCell key='adm'>ADMINISTRACION</TableCell>
              {tasks && tasks.map(task => (
                <TableCell key={task.nombreVisual} style={{ color: 'green', textAlign: 'center' }}>{task.nombreVisual.toUpperCase()}</TableCell>
              ))}
            </TableRow>

          </TableHead>

          <TableBody>
            {renderBody()}
          </TableBody>

        </Table>
      </TableContainer>

      {renderTablePagination()}

    </Paper>
  )
}

export default Monitores
