import React, { Component } from 'react'
import './Home.css'
import firebaseConf from '../../Firebase'
import ReactToPrint from 'react-to-print'
import logot from '../../assets/logo-t.png'

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
      apellidom: ' ',
      marca: '',
      fecha: '',
      hora: '',
      telefono: '',
      isHidden: true,
      numfolio: '',
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
    var wishRef = firebaseConf.database().ref('folio/3q4t5w63q4fw3563')
    wishRef.on('value', (snapshot) => {
      let updatedWish = snapshot.val()
      this.setState({
        numfolio: updatedWish.numfolio
      })
      wishRef.set(updatedWish)
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

  incrementFolio = () => {
    const wishRef = firebaseConf.database().ref('folio/3q4t5w63q4fw3563')
    wishRef.once('value').then(snapshot => {
      let updatedWish = snapshot.val()
      this.setState({
        numfolio: updatedWish.numfolio
      })
      updatedWish.numfolio = updatedWish.numfolio + 1
      wishRef.set(updatedWish)
    })
  }

  sendMessage (e) {
    e.preventDefault()
    const params = {
      nombre: this.inputNombre.value,
      apellidop: this.inputApellidop.value,
      apellidom: this.inputApellidom.value,
      modelo: this.inputModelo.value,
      marca: this.inputMarca.value,
      color: this.inputColor.value,
      placas: this.inputPlacas.value,
      telefono: this.inputTelefono.value,
      email: this.inputEmail.value,
      fecha: this.inputFecha.value,
      hora: this.inputHora.value,
      folio: this.inputFolio.value,
      status: this.inputStatus.value
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
      params.status && params.telefono && params.marca && params.email && params.folio) {
      firebaseConf.database().ref('agenda-cita').push(params).then(() => {
        alert('Tu solicitud fue enviada.')
      }).catch(() => {
        alert('Tu solicitud no puede ser enviada')
      })
      this.incrementFolio()
      this.resetForm()
    } else {
      alert('Por favor llene el formulario')
    }
  }

  render () {
    const dato = this.state.lista
    const fecha = this.state.fecha
    const hora = this.state.hora
    var indice2 = []
    dato.map(item =>
      item.hora === hora && item.fecha === fecha &&
        indice2.push(item)
    )
    console.log(this.state.numfolio)

    let dis
    for (var i = 0; i < dato.length; i++) {
      if (indice2.length >= 1) {
        dis = <p>Se acabaron las citas para estos parametros</p>
      } else {
        dis =
          <ReactToPrint
            trigger={() => <button className='boton-color2'>Confirmar</button>}
            content={() => this.componentRef}
            onAfterPrint={this.toggleHidden.bind(this)}
            onBeforePrint={this.toggleHidden.bind(this)}
          />
      }
    }

    var f = new Date(this.state.fecha)
    var today = new Date()
    var meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    today = f.getDate() + 1 + '-' + meses[f.getMonth()] + '-' + f.getFullYear()

    return (
      <div className='home-container'>
        <div className='home-content'>
          <div className='cita-container'>
            <h1 className='back-title'>Agenda tu Cita para el Tramite de Constancia de Vehiculo no Robado</h1>
            <div className='row2'>
              <div className='text2'>
                <h5 className='title-r'>Datos para Revision Vehicular</h5>
                <form onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
                  <div className='form-group-r'>
                    <div>
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
                        ref={apellidom => this.inputApellidom = apellidom} />
                    </div>
                  </div>
                  <div className='card-container-r2'>
                    <div className='porcent-r'>
                      <input
                        type='text'
                        className='cell-r'
                        id='Marca'
                        placeholder='Marca'
                        required
                        ref={Marca => this.inputMarca = Marca} />

                    </div>
                    <div className='porcent-r2'>
                      <input
                        className='cell-r'
                        id='modelo'
                        placeholder='Modelo'
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
                        ref={color => this.inputColor = color}
                      />
                    </div>
                    <div className='porcent-r2'>
                      <input
                        type='text'
                        className='cell-r'
                        id='placas'
                        placeholder='Placas'
                        required
                        ref={placas => this.inputPlacas = placas}
                      />
                    </div>
                  </div>
                  <div className='card-container-r2'>
                    <div className='porcent-r'>
                      <input
                        type='number'
                        className='cell-r'
                        id='telefono'
                        min='1'
                        step='1'
                        minLength={10}
                        placeholder='Telefono'
                        required
                        ref={telefono => this.inputTelefono = telefono}
                     />
                    </div>
                    <div className='porcent-r2'>
                      <input
                        type='text'
                        className='cell-r'
                        id='email'
                        placeholder='Correo'
                        required
                        ref={email => this.inputEmail = email}
                      />
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
                        ref={fecha => this.inputFecha = fecha}
                      />
                    </div>
                    <div className='porcent-r2'>
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
                    </div>
                  </div>
                  <div className='form-group-r'>
                    <div>
                      <input
                        type='text'
                        required
                        className='form-control-r'
                        id='folio'
                        placeholder='Folio'
                        ref={folio => this.inputFolio = folio}
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
                        ref={status => this.inputStatus = status}
                      />
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
                  <div className='print-source' ref={el => (this.componentRef = el)}>
                    <div className='row-h'>
                      <img className='img-ht' src={logot} alt='' />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className='column-th'>
                          <p className='name-size-h'>Folio</p>
                          <p className='name-size2-h'>CIRVR-CVNR-{this.state.numfolio}-21</p>
                        </div>
                        <div className='column-th'>
                          <p className='name-size-h'>Cita</p>
                          <p className='name-size2-h'>{today} - {this.state.hora}</p>
                        </div>
                      </div>
                    </div>
                    <div className='column-th row-ti-h'>
                      <div className='column-th'>
                        <p className='name-size-h'>Nombre</p>
                        <p className='name-size2-h'>{this.state.nombre} {this.state.apellidop}</p>
                      </div>
                      <div className='column-th'>
                        <p className='name-size-h'>Ubicación</p>
                        <p className='name-size2-h'>Coordinación de Investigación y Recuperación de Vehiculos Robados Carretera México Pachuca km 84.5, Residencial Spauah, 42083 Pachuca de Soto, Hgo</p>
                      </div>
                      <div className='column-th'>
                        <p className='name-size-h'>Observaciones</p>
                        <p className='name-size3-h'>
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
