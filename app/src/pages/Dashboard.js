import { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Navbar from '../components/Navbar'
import CardsHeader from '../components/CardHeader'
// import Card from '../components/Card'
// import Graphic from '../components/Graphic'
import Monitores from '../components/Monitores'

import 'fontsource-roboto'
import '../assets/css/Dashboard.css'

import YouTubeIcon from '@material-ui/icons/YouTube'
import PublicIcon from '@material-ui/icons/Public'
import VideocamIcon from '@material-ui/icons/Videocam'
import administraciones from '../services/administraciones'
// import Table from '../components/Table';

const styles = {
  root: {
    flexGrow: 1
  },
  iconos: {
    color: 'red'
  },
  container: {
    paddingTop: '40px',
    alignItems: 'center'
  },
  containerGrafica: {
    marginTop: '40px'
  },
  containerTabla: {
    marginTop: '40px'
  }
}

const useStyles = makeStyles(styles)

// const data = [
//     {
//       id:1,
//       video:
//         "Como Hacer un Split en React JS || React Split Pane || Tutorial en Español (2020)",
//       fecha: "6 de sep. 2020",
//       visualizaciones: 32,
//       imagen: require("../assets/img/split.webp"),
//     },
//     {
//       id:2,
//         video:
//           "Cómo Solucionar Error al Crear Applicación de React JS",
//         fecha: "5 de sep. 2020",
//         visualizaciones: 31,
//         imagen: require("../assets/img/error.webp"),
//       },
//       {
//       id:3,
//         video:
//           "Cómo Utilizar Forever en Node JS || Ejecutar Node JS en Segundo Plano || Background Node JS",
//         fecha: "4 de sep. 2020",
//         visualizaciones: 21,
//         imagen: require("../assets/img/forever.webp"),
//       },
//   ];

const Dashboard = () => {
  const [statistics, setStatistics] = useState({})
  const classes = useStyles()

  useEffect(() => {
    administraciones
      .getEstadisticas()
      .then(result => {
        setStatistics(result)
      })
  }, [])
  return (
  // <div className={classes.root}>
    <div>
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <Navbar />
        </Grid>

        <Grid item xs={12} sm={4} lg={4} xl={4}>
          <CardsHeader icono={<YouTubeIcon className={classes.iconos} />} titulo='ADMINISTRACIONES' texto={statistics.total_administraciones} color='rgba(248,80,50,1)' font='black' />
        </Grid>

        <Grid item xs={12} sm={4} lg={4} xl={4}>
          <CardsHeader icono={<PublicIcon className={classes.iconos} />} titulo='NUBE' texto={statistics.total_nube} color='rgba(248,80,50,1)' font='black' />
        </Grid>

        <Grid item xs={12} sm={4} lg={4} xl={4}>
          <CardsHeader icono={<VideocamIcon className={classes.iconos} />} titulo='SERVICIO ACTIVO' texto={statistics.total_servicio_activo} color='rgba(248,80,50,1)' font='black' />
        </Grid>

        <Grid item xs={12} className={classes.containerTabla}>
          <Monitores />
        </Grid>
        {/*
                <Grid item container spacing={1} className={classes.container} xs={12} sm={12} md={6} lg={6} xl={6} >
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                        <Card titulo='SUSCRIPCIONES' texto='692' />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                        <Card titulo='VISUALIZACIONES' texto='111,092' />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                        <Card titulo='TIEMPO VISUALICION' texto='2,504 horas' />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                        <Card titulo='PORCENTAJE IMPRESIONES' texto='14,2%' />
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={1} lg={1} xl={1} ></Grid>

                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} className={classes.containerGrafica} >
                    <Graphic />
                </Grid> */}

        {/* <Grid item xs={12} className={classes.containerTabla}>
                    <Table data={data}/>
                </Grid> */}

      </Grid>
    </div>
  )
}

export default Dashboard
