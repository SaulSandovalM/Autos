import React, { Component } from 'react'
import './Tables.css'

export default class Row extends Component {
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
          <div className='data-table-imp'>{this.props.item.nombre} {this.props.item.apellidop} {this.props.item.apellidom}</div>
          <div className='data-table-imp'>{this.props.item.placas}</div>
          <div className='data-table-imp'>{this.props.item.modelo}</div>
          <div className='data-table-imp'>{this.props.item.color}</div>
          <div className='data-table-imp'>{this.props.item.fecha} / {this.props.item.hora}</div>
          <div className='data-table-imp'>{this.props.item.status}</div>
        </div>
      }

    return (
      <div>
        {table}
      </div>
    )
  }
}
