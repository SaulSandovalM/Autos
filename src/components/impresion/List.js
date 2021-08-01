import React, { Component } from 'react'
import './Tables.css'
import Row from './Row'
import firebaseConf from '../../Firebase'
import ReactToPrint from 'react-to-print'

export default class List extends Component {
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
          <ReactToPrint
            trigger={() => <buttom>Imprimir citas diarias</buttom>}
            content={() => this.sp}
          />
        </div>
        <div ref={el => (this.sp = el)}>
          <div className='products-al-2'>
            <div className='col-table-imp'>Nombre</div>
            <div className='col-table-imp'>Placas</div>
            <div className='col-table-imp'>Modelo</div>
            <div className='col-table-imp'>Color</div>
            <div className='col-table-imp'>Fecha/Hora</div>
            <div className='col-table-imp'>Estatus</div>
          </div>
          {
            this.props.lista.map(item =>
              <Row
                key={item.id}
                item={item}
              />
            )
          }
        </div>
      </div>
    )
  }
}
