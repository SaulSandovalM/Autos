import React, { Component, useState } from 'react';
import '../Tables.css';
import firebaseConf from '../../../Firebase';

class TablePachuca extends Component {
  constructor () {
    super();
    this.state = {
      user: null,
      agendaCita: [],
    };
  }

  componentWillMount () {
    firebaseConf.database().ref('agenda-cita').on('child_added', snapshot => {
      this.setState({
        agendaCita: this.state.agendaCita.concat(snapshot.val())
      });
    });
  }

  borrar = (agendaCita) => {
    firebaseConf.database().ref().child('/agenda-cita/')
        .set({ status: "New title"});
  }

//  update = (data) {
  //  firebaseConf.database().ref('agenda-cita').update(
    //  {
      //  status: 'atendido',
      //},
    //);
  //}

  render() {
    return (
      <div className="App">
        <h1>Citas</h1>
          <div className="products-al">
            <div className="col-table">Nombre</div>
            <div className="col-table">Correo</div>
            <div className="col-table">RFC</div>
            <div className="col-table">Municipio</div>
            <div className="col-table">Fecha/Hora</div>
            <div className="col-table">Estatus</div>
          </div>
        {
          this.state.agendaCita.map(agendaCita => (
            <div className="products-al">
              <div className="data-table">{agendaCita.nombre} {agendaCita.apellidop} {agendaCita.apellidom}</div>
              <div className="data-table">{agendaCita.email}</div>
              <div className="data-table">{agendaCita.rfc}</div>
              <div className="data-table">{agendaCita.municipio}</div>
              <div className="data-table">{agendaCita.hora} - {agendaCita.fecha}</div>
              <div className="data-table">
                {agendaCita.status}
                <button style={{background: 'grey', color: 'white'}} borrar={this.borrar}>Atendido</button>
              </div>
            </div>
          )).reverse()
        }
      </div>
    );
  }
}

export default TablePachuca;
