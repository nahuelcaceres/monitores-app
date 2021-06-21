import { Table as TableMaterial, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const StyledTableCell = withStyles(() => ({
  head: {
    color: 'white',
    textAlign: 'center',
    background: 'black'
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const Table = (props) => {
  return (
    <TableContainer>
      <TableMaterial>
        <TableHead>
          <TableRow>
            <StyledTableCell>Video</StyledTableCell>
            <StyledTableCell>Fecha de Publicacion</StyledTableCell>
            <StyledTableCell>Numero de Visualizaciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map(element => (
            <TableRow key={element.id}>
              <TableCell><img src={element.imagen} width='35px' height='25px' alt='img' />{'  '}{element.video}</TableCell>
              <TableCell align='center'>{element.fecha}</TableCell>
              <TableCell align='center'>{element.visualizaciones}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableMaterial>
    </TableContainer>
  )
}

export default Table
