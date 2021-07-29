import React, { Component } from 'react'
import './Tables.css'
import firebaseConf from '../../Firebase'
import ListComponent from './ListComponent'

export default class TablePachuca extends Component {
  constructor () {
    super()
    this.state = {
      nuevo: '',
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        }
      ]
    }
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = []
      snap.forEach((child) => {
        lista.push({
          nombre: child.val().nombre,
          apellidop: child.val().apellidop,
          apellidom: child.val().apellidom,
          modelo: child.val().modelo,
          marca: child.val().marca,
          color: child.val().color,
          placas: child.val().placas,
          telefono: child.val().telefono,
          email: child.val().email,
          fecha: child.val().fecha,
          hora: child.val().hora,
          folio: child.val().folio,
          status: child.val().status,
          id: child.key
        })
      })
      this.setState({
        lista: lista
      })
    })
  }

  componentDidMount () {
    const itemsRef = firebaseConf.database().ref('agenda-cita/')
    this.listenForItems(itemsRef)
  }

  update = (item) => {
    let updates = {}
    updates['agenda-cita/' + item.id] = {
      status: 'Atendido',
      nombre: item.nombre,
      apellidop: item.apellidop,
      apellidom: item.apellidom,
      modelo: item.modelo,
      marca: item.marca,
      color: item.color,
      placas: item.placas,
      telefono: item.telefono,
      email: item.email,
      fecha: item.fecha,
      hora: item.hora,
      folio: item.folio
    }
    firebaseConf.database().ref().update(updates)
  }

  render () {
    return (
      <div className='App'>
        <ListComponent
          lista={this.state.lista}
          update={this.update}
        />
      </div>
    )
  }
}
