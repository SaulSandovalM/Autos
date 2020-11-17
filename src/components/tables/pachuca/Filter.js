import React, { Component } from 'react'
import '../Tables.css'
import firebaseConf from '../../../Firebase'

export default class Filter extends Component {
  constructor () {
    super()
    this.state = {
      agendaCita: []
    }
  }

  componentWillMount () {
    firebaseConf.database().ref('agenda-cita').on('child_added', snapshot => {
      this.setState({
        agendaCita: this.state.agendaCita.concat(snapshot.val())
      })
    })
  }

  borrar = (agendaCita) => {
    firebaseConf.database().ref().child('/agenda-cita/').set({ status: 'New title'})
  }

  updateSearch (event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }

  render () {
    const filterData = this.state.agendaCita.filter(
      (agendaCita) => {
        return agendaCita.fecha.indexOf(this.state.search) !== -1
      }
    )

    return (
      <div className='App' style={{ height: '100vh' }}>
        <div className='App' style={{ height: '100vh' }}>
          <h1>Citas</h1>
          <input type='date' value={this.state.search} onChange={this.updateSearch.bind(this)} />
          <div className='products-al'>
            <div className='col-table'>Nombre</div>
            <div className='col-table'>Marca</div>
            <div className='col-table'>Modelo</div>
            <div className='col-table'>Placas</div>
            <div className='col-table'>Fecha / Hora</div>
            <div className='col-table'>Status</div>
          </div>
          {
            filterData.map(agendaCita => (
              <div className='products-al'>
                <div className='data-table'>{agendaCita.nombre} {agendaCita.apellidop} {agendaCita.apellidom}</div>
                <div className='data-table'>{agendaCita.marca}</div>
                <div className='data-table'>{agendaCita.modelo}</div>
                <div className='data-table'>{agendaCita.placas}</div>
                <div className='data-table'>{agendaCita.fecha} / {agendaCita.hora} hrs</div>
                <div className='data-table'>{agendaCita.status}</div>
              </div>
            )).reverse()
          }
        </div>
      </div>
    )
  }
}
