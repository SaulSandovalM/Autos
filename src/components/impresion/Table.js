import React, { Component } from 'react'
import './Tables.css'
import firebaseConf from '../../Firebase'
import List from './List'

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

  render () {
    return (
      <div className='App'>
        <List
          lista={this.state.lista}
        />
      </div>
    )
  }
}
