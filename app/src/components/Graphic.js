import React from 'react'
import { Line } from 'react-chartjs-2'
import '../assets/css/Graphic.css'

const Graphic = (props) => {
  const data = {
    labels: ['Marzo', 'Abril', 'Mayo', 'Junio', 'Agosto'],
    datasets: [
      {
        label: 'Horas de Visualcion por mes',
        fill: false,
        backgroundColor: 'rgba(73,155,234,1)',
        borderColor: 'rgba(73,155,234,1)',
        pointBorderColor: 'rgba(73,155,234,1)',
        pointBorderWith: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(73,155,234,1)',
        pointHoverBorderColor: 'rgba(73,155,234,1)',
        pointRadius: 1,
        pointHitRadius: 10,
        data: [0.17, 19, 156, 565, 1149]
      }

    ]
  }
  return (
    <div className='containerGrafica'>
      <Line data={data} />
    </div>
  )
}

export default Graphic
