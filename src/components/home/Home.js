import React, { Component } from 'react';
import './Home.css';
import firebaseConf from '../../Firebase';
import ReactToPrint from 'react-to-print';

class Home extends Component {
  constructor(props) {
    super(props);
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
      agendaCita: '',
      lista: [],
      isHidden: true,
    };
  }

  showAlert(type, message) {
    this.setState({
      alert: true,
      alertData: {type, message}
    });
    setTimeout(() => {
      this.setState({alert: false});
    }, 6000);
  }

  resetForm() {
    this.refs.contactForm.reset();
  }

  toggleHidden() {
   this.setState({
     isHidden: !this.state.isHidden
   })
 }

  componentDidMount() {
    const picker = document.getElementById('fecha');
    picker.addEventListener('input', function(e){
      var day = new Date(this.value).getUTCDay();
      if([6,0].includes(day)){
        e.preventDefault();
        this.value = '';
        alert('Este dia no se puede seleccionar');
      }
    });
  }

  componentWillMount() {
    let formRef = firebaseConf
      .database()
      .ref('agenda-cita')
      .orderByKey()
      .limitToLast(6);
    formRef.on('child_added', snapshot => {
      const {nombre, apellidop, apellidom, placas, modelo, color, fecha, hora, marca, status, telefono} = snapshot.val();
      const data = {nombre, apellidop, apellidom, placas, modelo, color, fecha, hora, marca, status, telefono};
      this.setState({form: [data].concat(this.state.form)});
    });
  }

  sendMessage(e) {
    e.preventDefault();
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
    };
    this.setState({
      nombre: this.inputNombre.value,
      apellidop: this.inputApellidop.value,
      apellidom: this.inputApellidom.value,
      fecha: this.inputFecha.value,
      hora: this.inputHora.value,
    })
    if (params.nombre && params.apellidop && params.apellidom && params.placas && params.modelo
      && params.color && params.fecha && params.hora && params.marca && params.status && params.telefono) {
      firebaseConf.database().ref('agenda-cita').push(params).then(() => {
        this.showAlert('success', 'Tu solicitud fue enviada, no olvides realizar tu pago antes de ir a tu cita.');
      }).catch(() => {
        this.showAlert('danger', 'Tu solicitud no puede ser enviada');
      });
      this.resetForm();
      this.toggleHidden();
    } else {
      this.showAlert('warning', 'Por favor llene el formulario');
    };
  }

  render() {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if ( dd < 10 ){
      dd = '0' + dd
    }
    if ( mm < 10 ){
      mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;

    const fecha = this.state.fecha;
    const hora2 = this.state.lista.hora;
    console.log(hora2);

    var d = new Date();
    var n = d.getHours();
    var tf8 = false;
    var tf9 = false;
    var tf10 = false;
    var tf11 = false;
    var tf12 = false;
    var tf13 = false;
    var tf14 = false;
    var tf15 = false;

    if (today && n > 8) {
      tf8 = true;
      console.log('primer if ' + tf8)
      if (fecha && n > 8 && fecha !== today) {
        tf8 = false;
        console.log(tf8)
      }
    }
    if (today && n > 8) {
      tf9 = true;
      console.log('primer if ' + tf9)
      if (fecha && n > 8 && fecha !== today) {
        tf9 = false;
        console.log(tf9)
      }
    }
    if (today && n > 9) {
      tf10 = true;
      console.log('primer if ' + tf10)
      if (fecha && n > 9 && fecha !== today) {
        tf10 = false;
        console.log(tf10)
      }
    }
    if (today && n > 9) {
      tf11 = true;
      console.log('primer if ' + tf11)
      if (fecha && n > 9 && fecha !== today) {
        tf11 = false;
        console.log(tf11)
      }
    }
    if (today && n > 10) {
      tf12 = true;
      console.log('primer if ' + tf12)
      if (fecha && n > 10 && fecha !== today) {
        tf12 = false;
        console.log(tf12)
      }
    }
    if (today && n > 10) {
      tf13 = true;
      console.log('primer if ' + tf13)
      if (fecha && n > 10 && fecha !== today) {
        tf13 = false;
        console.log(tf13)
      }
    }
    if (today && n > 11) {
      tf14 = true;
      console.log('primer if ' + tf14)
      if (fecha && n > 11 && fecha !== today) {
        tf14 = false;
        console.log(tf14)
      }
    }
    if (today && n > 11) {
      tf15 = true;
      console.log('primer if ' + tf15)
      if (fecha && n > 11 && fecha !== today) {
        tf15 = false;
        console.log(tf15)
      }
    }

    return (
      <div style={{width: '100%', justifyContent: 'center', display: 'flex', zIndex: '100', paddingTop: '100px'}}>
        <div style={{justifyContent: 'left', zIndex: '200'}}>
          {this.state.alert && <div className={`alert alert-${this.state.alertData.type}`} role='alert'>
            <div className='container'>
              {this.state.alertData.message}
            </div>
          </div>}
        </div>
        <div style={{width: '65%'}}>
          <h1 className="back-title">Constancia de Vehículo no Robado</h1>
          <div className="row">
            <div className="text">
              <p>Para evitar la compra-venta de <b>vehículos robados</b> o con alteraciones en sus números de identificación.</p>
              <h5 className="title-r">Vehículo Nacional</h5>
              <p className="size">
                <b>Riquisitos</b>
                <br></br><br></br>
                1.- Indispensable presentar el vehículo.
                <br></br>
                2.- Factura original, endosada o en defecto contrato de compra-venta o carta responsiva.
                <br></br>
                3.- Tarjeta de circulación o baja de placas.
                <br></br>
                4.- Identificación oficial.
                <br></br>
                5.- CURP.
                <br></br><br></br>
                * Deberás presentar copia de los docuemntos antes mencionados.
                <br></br><br></br>
                <h5 className="title-r">Vehículo Extranjero</h5>
                <b>Riquisitos</b>
                <br></br><br></br>
                1.- Indispensable presentar el vehículo.
                <br></br>
                2.- Titulo de propiedad y/o Certificado de propiedad debidamente endosado.
                <br></br>
                3.- Tarjeta de circulación.
                <br></br>
                4.- Pedimento de Importacióon y/o Constancia de Inscripción.
                <br></br>
                5.- Credencial de elector.
                <br></br>
                6.- CURP.
                <br></br>
                <br></br>
                * Deberás presentar copia de los docuemntos antes mencionados.
              </p>
            </div>
            <div className="text2-res">
              <h5 className="title-r">Ubicación</h5>
              <p>Coordinación de Investigación y Recuperación de Vehiculos Robados Carretera México
              Pachuca km 84.5, Residencial Spauah, 42083 Pachuca de Soto, Hgo</p>
              <a href="https://www.google.com.mx/maps/place/Coordinaci%C3%B3n+de+Investigaci%C3%B3n+y+Recuperaci%C3%B3n+de+Veh%C3%ADculos+Robados/@20.0641759,-98.7839683,18.25z/data=!4m5!3m4!1s0x85d1a0fd90dbd9df:0xcf5d49e41985ff46!8m2!3d20.0654064!4d-98.7847576">Abrir ubicación Google Maps</a>
              <h5 className="title-r">Contactate con nosotros</h5>
              <p>Para mas informacion favor de llamar al numero:
                <br></br>01 (771) 710 8813
                <br></br>01 (771) 710 8796</p>
              <h5 className="title-r">Horario</h5>
              <p>lunes a viernes | 9 a 14 horas</p>
              <br></br>
              <h5 className="title-r">Costo de la constancia</h5>
              <p><b>$339.00 M.N.</b></p>
            </div>
          </div>

          <div style={{width: '100%', marginBottom: '100px'}}>
            <h1 className="back-title">Agenda tu Cita</h1>
            <div className="row2">
              <div className="text2">
              <h5 className="title-r">Datos para Revision Vehicular</h5>
                <form onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
                  <div className="form-group-r">
                    <div className="modal-name">
                      <input
                        type='text'
                        className="form-control-r"
                        id='nombre'
                        placeholder='Nombre(s)'
                        required
                        ref={nombre => this.inputNombre = nombre} />
                    </div>
                  </div>
                  <div className="card-container-r2">
                    <div className='porcent-r'>
                      <input
                        type='text'
                        className="cell-r"
                        id='apellidop'
                        placeholder='Apellido Paterno'
                        required
                        ref={apellidop => this.inputApellidop = apellidop} />
                    </div>
                    <div className='porcent-r2'>
                      <input
                        type='text'
                        className="cell-r"
                        id='apellidom'
                        placeholder='Apellido Materno'
                        required
                        ref={apellidom => this.inputApellidom = apellidom} />
                    </div>
                  </div>
                  <div className="card-container-r2">
                    <div className='porcent-r'>
                      <input
                        type="text"
                        className="cell-r"
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
                        className="cell-r"
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
                  <div className="card-container-r2">
                    <div className='porcent-r'>
                      <input
                        type='text'
                        className="cell-r"
                        id='color'
                        placeholder='Color'
                        required
                        ref={color => this.inputColor = color} />
                    </div>
                    <div className='porcent-r2'>
                      <input
                        type='number'
                        className="cell-r"
                        id='telefono'
                        min='1'
                        step='1'
                        minLength={10}
                        placeholder='Telefono'
                        required
                        ref={telefono => this.inputTelefono = telefono} />
                    </div>
                  </div>
                  <div className="card-container-r2">
                    <div className='porcent-r'>
                      <input
                        min={today}
                        max="2020-06-31"
                        type="date"
                        className="cell-r"
                        id='fecha'
                        placeholder='Fecha'
                        required
                        ref={fecha => this.inputFecha = fecha} />
                    </div>
                    <div className='porcent-r2'>
                      <select className="form-control-r" ref={hora => this.inputHora = hora} required>
                        <option id='hora' disabled={tf8}>9:00</option>
                        <option id='hora' disabled={tf9}>9:30</option>
                        <option id='hora' disabled={tf10}>10:00</option>
                        <option id='hora' disabled={tf11}>10:30</option>
                        <option id='hora' disabled={tf12}>11:00</option>
                        <option id='hora' disabled={tf13}>11:30</option>
                        <option id='hora' disabled={tf14}>12:30</option>
                        <option id='hora' disabled={tf15}>13:00</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group-r">
                    <div className="modal-name">
                    <input
                      type='text'
                      required
                      className="form-control-r"
                      id='marca'
                      placeholder='Marca'
                      ref={marca => this.inputMarca = marca} />
                    </div>
                  </div>
                  <div className="form-group-r hidden">
                    <div className="modal-name">
                      <input
                        type='text'
                        className="form-control-r"
                        id='status'
                        value="en espera"
                        ref={status => this.inputStatus = status} />
                    </div>
                  </div>
                  <div className="presentation-cta">
                    <button type='submit' className="boton-color2">Confirmar</button>
                  </div>
                  {!this.state.isHidden && <ReactToPrint
                    trigger={() => <a href="/#">Imprimie aqui tu Ticket</a>}
                    content={() => this.componentRef}
                  />}
                  <div className='print-source' style={{padding: '20px'}} ref={el => (this.componentRef = el)}>
                    <div className="row-ti">
                      <img src={'https://firebasestorage.googleapis.com/v0/b/citas-f171e.appspot.com/o/5e74eab95d5a0_1584720603_5e74eab95d53b%20(1).png?alt=media&token=08fc00ea-9814-4419-a6d0-549e03bbcb00'} alt='' className='img-cc'/>
                      <div className="column-t">
                        <p className="name-size">Cita</p>
                        <p className="name-size2">{this.state.fecha}, {this.state.hora}</p>
                      </div>
                    </div>
                    <div className="column-t row-ti">
                      <div className="column-t">
                        <p className="name-size">Nombre</p>
                        <p className="name-size2">{this.state.nombre}{this.state.apellidop}</p>
                      </div>
                      <div className="column-t">
                        <p className="name-size">Ubicación</p>
                        <p className="name-size2">Coordinación de Investigación de vehiculos</p>
                      </div>
                      <div className="column-t">
                        <p className="name-size">Observaciones</p>
                        <p className="name-size3">
                          Le recordamos que es obligatorio que se presente el propietario del vehículo.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div>
      </div>
      </div>
    );
  }
}

export default Home;
