import React, { Component } from 'react'
import './Tables.css'
import RowComponent from './RowComponent'
import firebaseConf from '../../Firebase'
import { Link } from 'react-router-dom'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      agendaCita: [],
      fecha: ''
    }
  }

  componentWillMount () {
    firebaseConf.database().ref('agenda-cita').on('child_added', snapshot => {
      this.setState({
        agendaCita: this.state.agendaCita.concat(snapshot.val())
      })
    })
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  render () {
    return (
      <div className='App'>
        <h1>Citas</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <input
            type='date'
            className='date-cita'
            id='fecha'
            name='fecha'
            value={this.state.fecha}
            onChange={this.onChange}
            required
          />
          <Link to={'/CitasImpresion'} className='date-cita left-c'>Imprimir Citas</Link>
          <Link to={'/'} className='date-cita left-c'>Agendar Cita</Link>
        </div>
        <div ref={el => (this.sp = el)}>
          <div className='products-al-2'>
            <div className='col-table'>Nombre</div>
            <div className='col-table'>Placas</div>
            <div className='col-table'>Modelo</div>
            <div className='col-table'>Color</div>
            <div className='col-table'>Fecha/Hora</div>
            <div className='col-table'>Estatus</div>
            <div className='col-table'>Atención</div>
          </div>
          {
            this.props.lista.map(item =>
              <RowComponent
                key={item.id}
                item={item}
                update={this.props.update}
                fecha={this.state.fecha}
                reagendar={this.props.reagendar}
                cancelar={this.props.cancelar}
              />
            )
          }
        </div>
      </div>
    )
  }
}
