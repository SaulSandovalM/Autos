import React, { Component } from 'react'
import './Home.css'
import firebaseConf from '../../Firebase'
import ReactToPrint from 'react-to-print'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.handleChangef = this.handleChangef.bind(this)
    this.handleChangeh = this.handleChangeh.bind(this)
    this.state = {
      form: [],
      alert: false,
      alertData: {},
      nombre: '',
      apellidop: '',
      apellidom: '',
      marca: '',
      fecha: '',
      hora: '',
      telefono: '',
      isHidden: true,
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        }
      ]
    }
  }

  handleChangef (e) {
    this.setState({ fecha: e.target.value })
  }

  handleChangeh (e) {
    this.setState({ hora: e.target.value })
  }

  resetForm () {
    this.refs.contactForm.reset()
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  componentDidMount () {
    const itemsRef = firebaseConf.database().ref('agenda-cita/')
    this.listenForItems(itemsRef)
  }

  componentWillMount () {
    const formRef = firebaseConf.database().ref('agenda-cita').orderByKey().limitToLast(6)
    formRef.on('child_added', snapshot => {
      const { nombre, apellidop, apellidom, placas, modelo, color, fecha, hora, marca, status, telefono } = snapshot.val()
      const data = { nombre, apellidop, apellidom, placas, modelo, color, fecha, hora, marca, status, telefono }
      this.setState({ form: [data].concat(this.state.form) })
    })
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = []
      snap.forEach((child) => {
        lista.push({
          fecha: child.val().fecha,
          hora: child.val().hora
        })
      })
      this.setState({
        lista: lista
      })
    })
  }

  sendMessage (e) {
    e.preventDefault()
    const params = {
      nombre: this.inputNombre.value,
      apellidop: this.inputApellidop.value,
      apellidom: this.inputApellidom.value,
      placas: this.inputPlacas.value,
      modelo: this.inputModelo.value,
      color: this.inputColor.value,
      fecha: this.inputFecha.value,
      hora: this.inputHora.value,
      marca: this.inputMarca.value,
      status: this.inputStatus.value,
      telefono: this.inputTelefono.value
    }
    this.setState({
      nombre: this.inputNombre.value,
      apellidop: this.inputApellidop.value,
      apellidom: this.inputApellidom.value,
      fecha: this.inputFecha.value,
      hora: this.inputHora.value
    })
    if (params.nombre && params.apellidop && params.apellidom && params.placas &&
      params.modelo && params.color && params.fecha && params.hora && params.marca &&
      params.status && params.telefono) {
      firebaseConf.database().ref('agenda-cita').push(params).then(() => {
        alert('Tu solicitud fue enviada, no olvides realizar tu pago antes de ir a tu cita.')
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada')
      })
      this.resetForm()
      this.toggleHidden()
    } else {
      alert('Por favor llene el formulario')
    }
  }

  render () {
    const dato = this.state.lista
    const fecha = this.state.fecha
    const hora = this.state.hora
    let dis
    for (var i = 0; i < dato.length; i++ ) {
      if (fecha === dato[i].fecha && hora === dato[i].hora) {
        dis = <p>Estas fecha ya esta reserbada</p>
        console.log('Las Fechas no son iguales')
      } else {
        dis = <button type='submit' className='boton-color2'>Confirmar</button>
      }
    }

    return (
      <div style={{ width: '100%', justifyContent: 'center', display: 'flex', zIndex: '100', paddingTop: '100px' }}>
        <div style={{ width: '65%' }}>
          <h1 className='back-title'>Constancia de Vehículo no Robado</h1>
          <div className='row'>
            <div className='text'>
              <p>Para evitar la compra-venta de <b>vehículos robados</b> o con alteraciones en sus números de identificación.</p>
              <h5 className='title-r'>Vehículo Nacional</h5>
              <p className='size'>
                <b>Riquisitos</b>
                <br /><br />
                1.- Indispensable presentar el vehículo.
                <br />
                2.- Factura original, endosada o en defecto contrato de compra-venta o carta responsiva.
                <br />
                3.- Tarjeta de circulación o baja de placas.
                <br />
                4.- Identificación oficial.
                <br />
                5.- CURP.
                <br /><br />
                * Deberás presentar copia de los docuemntos antes mencionados.
                <br /><br />
                <h5 className='title-r'>Vehículo Extranjero</h5>
                <b>Riquisitos</b>
                <br /><br />
                1.- Indispensable presentar el vehículo.
                <br />
                2.- Titulo de propiedad y/o Certificado de propiedad debidamente endosado.
                <br />
                3.- Tarjeta de circulación.
                <br />
                4.- Pedimento de Importacióon y/o Constancia de Inscripción.
                <br />
                5.- Credencial de elector.
                <br />
                6.- CURP.
                <br />
                <br />
                * Deberás presentar copia de los docuemntos antes mencionados.
              </p>
            </div>
            <div className='text2-res'>
              <h5 className='title-r'>Ubicación</h5>
              <p>
                Coordinación de Investigación y Recuperación de Vehiculos Robados
                Carretera México Pachuca km 84.5, Residencial Spauah, 42083
                Pachuca de Soto, Hgo
              </p>
              <a href='https://www.google.com.mx/maps/place/Coordinaci%C3%B3n+de+Investigaci%C3%B3n+y+Recuperaci%C3%B3n+de+Veh%C3%ADculos+Robados/@20.0641759,-98.7839683,18.25z/data=!4m5!3m4!1s0x85d1a0fd90dbd9df:0xcf5d49e41985ff46!8m2!3d20.0654064!4d-98.7847576'>Abrir ubicación Google Maps</a>
              <h5 className='title-r'>Contactate con nosotros</h5>
              <p>
                Para mas informacion favor de llamar al numero:
                <br />01 (771) 710 8813
                <br />01 (771) 710 8796
              </p>
              <h5 className='title-r'>Horario</h5>
              <p>lunes a viernes | 9 a 14 horas</p>
              <br />
              <h5 className='title-r'>Costo de la constancia</h5>
              <p><b>$339.00 M.N.</b></p>
            </div>
          </div>

          <div style={{ width: '100%', marginBottom: '100px' }}>
            <h1 className='back-title'>Agenda tu Cita</h1>
            <div className='row2'>
              <div className='text2'>
                <h5 className='title-r'>Datos para Revision Vehicular</h5>
                <form onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
                  <div className='form-group-r'>
                    <div className='modal-name'>
                      <input
                        type='text'
                        className='form-control-r'
                        id='nombre'
                        placeholder='Nombre(s)'
                        required
                        ref={nombre => this.inputNombre = nombre} />
                    </div>
                  </div>
                  <div className='card-container-r2'>
                    <div className='porcent-r'>
                      <input
                        type='text'
                        className='cell-r'
                        id='apellidop'
                        placeholder='Apellido Paterno'
                        required
                        ref={apellidop => this.inputApellidop = apellidop} />
                    </div>
                    <div className='porcent-r2'>
                      <input
                        type='text'
                        className='cell-r'
                        id='apellidom'
                        placeholder='Apellido Materno'
                        required
                        ref={apellidom => this.inputApellidom = apellidom} />
                    </div>
                  </div>
                  <div className='card-container-r2'>
                    <div className='porcent-r'>
                      <input
                        type='text'
                        className='cell-r'
                        id='placas'
                        placeholder='Placas'
                        minLength={6}
                        maxLength={7}
                        required
                        ref={placas => this.inputPlacas = placas} />
                    </div>
                    <div className='porcent-r2'>
                      <input
                        type='number'
                        className='cell-r'
                        id='modelo'
                        min='1'
                        step='1'
                        placeholder='Modelo'
                        minLength={12}
                        maxLength={13}
                        required
                        ref={modelo => this.inputModelo = modelo} />
                    </div>
                  </div>
                  <div className='card-container-r2'>
                    <div className='porcent-r'>
                      <input
                        type='text'
                        className='cell-r'
                        id='color'
                        placeholder='Color'
                        required
                        ref={color => this.inputColor = color} />
                    </div>
                    <div className='porcent-r2'>
                      <input
                        type='number'
                        className='cell-r'
                        id='telefono'
                        min='1'
                        step='1'
                        minLength={10}
                        placeholder='Telefono'
                        required
                        ref={telefono => this.inputTelefono = telefono} />
                    </div>
                  </div>
                  <div className='card-container-r2'>
                    <div className='porcent-r'>
                      <input
                        type='date'
                        className='cell-r'
                        id='fecha'
                        required
                        onChange={this.handleChangef}
                        ref={fecha => this.inputFecha = fecha} />
                    </div>
                    <div className='porcent-r2'>
                      <select
                        className='form-control-r'
                        onChange={this.handleChangeh}
                        ref={hora => this.inputHora = hora}>
                        <option id='hora'>9:00</option>
                        <option id='hora'>9:30</option>
                        <option id='hora'>10:00</option>
                        <option id='hora'>10:30</option>
                        <option id='hora'>11:00</option>
                        <option id='hora'>11:30</option>
                        <option id='hora'>12:30</option>
                        <option id='hora'>13:00</option>
                      </select>
                    </div>
                  </div>
                  <div className='form-group-r'>
                    <div className='modal-name'>
                      <input
                        type='text'
                        required
                        className='form-control-r'
                        id='marca'
                        placeholder='Marca'
                        ref={marca => this.inputMarca = marca}
                      />
                    </div>
                  </div>
                  <div className='form-group-r hidden'>
                    <div className='modal-name'>
                      <input
                        type='text'
                        className='form-control-r'
                        id='status'
                        value='en espera'
                        ref={status => this.inputStatus = status} />
                    </div>
                  </div>
                  <div className='presentation-cta'>

                    {dis}
                  </div>
                  {!this.state.isHidden &&
                    <ReactToPrint
                      trigger={() => <button>Imprimie aqui tu Ticket</button>}
                      content={() => this.componentRef}
                      onAfterPrint={this.toggleHidden.bind(this)}
                    />
                  }
                  <div className='print-source' style={{padding: '20px'}} ref={el => (this.componentRef = el)}>
                    <div className='row-ti'>
                      <img className='img-cc' src={'https://seeklogo.com/images/G/gobierno-del-estado-de-hidalgo-logo-83001C1D96-seeklogo.com.png'} alt='' />
                      <div className='column-t'>
                        <p className='name-size'>Folio de Atención</p>
                        <p className='name-size3'>w9oer78y19487t</p>
                        <p className='name-size'>Cita</p>
                        <p className='name-size2'>{this.state.fecha}, {this.state.hora}</p>
                      </div>
                    </div>
                    <div className='column-t row-ti'>
                      <div className='column-t'>
                        <p className='name-size'>Nombre</p>
                        <p className='name-size2'>{this.state.nombre} {this.state.apellidop}</p>
                      </div>
                      <div className='column-t'>
                        <p className='name-size'>Ubicación</p>
                        <p className='name-size2'>Pachuca de Soto</p>
                      </div>
                      <div className='column-t'>
                        <p className='name-size'>Observaciones</p>
                        <p className='name-size3'>
                          Le recordamos que en el caso de pagar en BBVA y Santander
                          el pago tardara en reflejarse en un tiempo de 48 horas aproximadamente.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
