import { Card as CardMaterial, Typography, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
    backgroundColor: 'rgba(73,155,234,1)'
  },
  texto: {
    fontSize: 18,
    color: 'black'
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black'
  }
}))

const Card = (props) => {
  const classes = useStyles()

  return (
    <CardMaterial className={classes.root}>
      <CardContent>
        <Typography className={classes.titulo}>
          {props.titulo}
        </Typography>

        <Typography className={classes.texto}>
          {props.texto}
        </Typography>
      </CardContent>

    </CardMaterial>
  )
}

export default Card
