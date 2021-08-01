import React, { Component } from 'react'
import './Tables.css'
import Popup from 'reactjs-popup'

export default class RowComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido',
      fecha: '',
      hora: ''
    }
  }

  update = () => {
    this.props.update(this.props.item)
  }

  reagendar = () => {
    this.props.reagendar(this.props.item, this.inputFecha.value, this.inputHora.value)
  }

  cancelar = () => {
    this.props.cancelar(this.props.item)
  }

  render () {
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd
    const fechaC = this.props.item.fecha
    let table
    if (fechaC === today) {
      table =
        <div className='products-al-2'>
          <div className='data-table'>{this.props.item.nombre} {this.props.item.apellidop} {this.props.item.apellidom}</div>
          <div className='data-table'>{this.props.item.placas}</div>
          <div className='data-table'>{this.props.item.modelo}</div>
          <div className='data-table'>{this.props.item.color}</div>
          <div className='data-table'>{this.props.item.fecha} / {this.props.item.hora}</div>
          <div className='data-table'>{this.props.item.status}</div>
          <div className='data-table'>
            <button onClick={this.update}>Atendido</button>
            <button onClick={this.cancelar}>Cancelar</button>
            <Popup
              trigger={<buttom className='btn-imp-of'>Reagendar</buttom>}
              modal
              style={{ height: '500px' }}
              closeOnDocumentClick
            >
              <div style={{ background: 'red', height: '300px', width: '500px', padding: '20px' }}>
                <p>Ingrese la nueva fecha y hora de la cita</p>
                <input
                  type='date'
                  className='cell-r'
                  style={{ marginBottom: '10px' }}
                  id='fecha'
                  required
                  onChange={this.handleChangef}
                  ref={fecha => this.inputFecha = fecha}
                />
                <select
                  className='form-control-r'
                  onChange={this.handleChangeh}
                  ref={hora => this.inputHora = hora}
                >
                  <option id='hora'></option>
                  <option id='hora'>9:00</option>
                  <option id='hora'>9:30</option>
                  <option id='hora'>10:00</option>
                  <option id='hora'>10:30</option>
                  <option id='hora'>11:00</option>
                  <option id='hora'>11:30</option>
                  <option id='hora'>12:30</option>
                  <option id='hora'>13:00</option>
                </select>
                <button onClick={this.reagendar}>Reagendar</button>
              </div>
            </Popup>
          </div>
        </div>
      }

    return (
      <div>
        {table}
      </div>
    )
  }
}
