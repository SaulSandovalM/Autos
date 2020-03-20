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
      sede: '',
      fecha: '',
      hora: '',
      isHidden: true
    };
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
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

  componentWillMount() {
    let formRef = firebaseConf
      .database()
      .ref('agenda-cita')
      .orderByKey()
      .limitToLast(6);
    formRef.on('child_added', snapshot => {
      const {nombre, apellidop, apellidom, email, rfc, municipio, colonia, fecha, hora, sede, status} = snapshot.val();
      const data = {nombre, apellidop, apellidom, email, rfc, municipio, colonia, fecha, hora, sede, status};
      this.setState({form: [data].concat(this.state.form)});
    });
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      nombre: this.inputNombre.value,
      apellidop: this.inputApellidop.value,
      apellidom: this.inputApellidom.value,
      email: this.inputEmail.value,
      rfc: this.inputRfc.value,
      municipio: this.inputMunicipio.value,
      colonia: this.inputColonia.value,
      fecha: this.inputFecha.value,
      hora: this.inputHora.value,
      sede: this.inputSede.value,
      status: this.inputStatus.value
    };
    this.setState({
      nombre: this.inputNombre.value,
      apellidop: this.inputApellidop.value,
      apellidom: this.inputApellidom.value,
      fecha: this.inputFecha.value,
      hora: this.inputHora.value,
      sede: this.inputSede.value
    })
    if (params.nombre && params.apellidop && params.apellidom && params.email && params.rfc && params.municipio
      && params.colonia && params.fecha && params.hora && params.sede && params.status) {
      firebaseConf.database().ref('agenda-cita').push(params).then(() => {
        this.showAlert('success', 'Tu solicitud fue enviada, no olvides realizar tu pago antes de ir a tu cita.');
      }).catch(() => {
        this.showAlert('danger', 'Tu solicitud no puede ser enviada');
      });
      this.resetForm();
    } else {
      this.showAlert('warning', 'Por favor llene el formulario');
    };
  }

  render() {
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
          <h1 className="back-title">Expedición de Constancia de NO Antecedentes Penales</h1>
          <div className="row">
            <div className="text">
              <h5 className="title-r">Requisitos</h5>
              <p className="size">
                Si Usted Radica en México.
                <br></br><br></br>
                1.- Recibo de pago (formato F-7)
                <br></br>
                2.- Una Copia de constancia de la  Clave Única de Registro de Población (CURP) actualizada (código QR)
                <br></br>
                3.- Una Copia de Identificación Oficial (INE)
                <br></br>
                4.- Una Fotografía a color tamaño pasaporte fondo blanco.
                <br></br><br></br>
                Si Usted radica en el Extranjero
                <br></br><br></br>
                1. Oficio del consulado dirigido a la  Procuraduría General de Justicia del Estado de Hidalgo
                <br></br>
                2. Toma de Huellas por el Consulado
                <br></br>
                3. Copia de identificación oficial (INE, Cartilla, Pasaporte o Matricula)
                <br></br>
                4. Una Copia de constancia de la  Clave Única de Registro de Población (CURP) actualizada (código QR)
                <br></br>
                5. 2 fotografías tamaño credencial a color de frente
                <br></br>
                6. Comprobante de Domicilio donde radica el interesado
                <br></br>
                7. Carta poder
                <br></br>
                8. Credencial original y copia de la persona que realiza el tramite
                <br></br>
                9. Recibo de pago (formato F-7) <a href="https://ruts.hidalgo.gob.mx/tramite/572">Desacargar formato de pago</a>
              </p>
            </div>
            <div className="text">
              <h5 className="title-r">Ubicación</h5>
              <p>Servicios Periciales</p>
              <a href="https://www.google.com.mx/maps/place/Servicios+Periciales/@20.0645574,-98.7844438,18z/data=!4m5!3m4!1s0x0:0x3c9746ad18bdeb6d!8m2!3d20.065287!4d-98.7853584">Abrir ubicación Google Maps</a>
              <p>Servicios Periciales</p>
              <a href="https://www.google.com.mx/maps/place/Agencia+del+Ministerio+Publico/@21.1496548,-98.4171,18z/data=!4m8!1m2!2m1!1sAgencia+de+Ministerio+P%C3%BAblico!3m4!1s0x85d727a12b89e037:0xb4b27e217d3f0a5e!8m2!3d21.1495294!4d-98.4171117">Abrir ubicación Google Maps</a>
              <h5 className="title-r">Informes</h5>
              <p>Para mas informacion favor de llamar al numero: <br></br>+52 (771) 71 79000 Ext. 9217</p>
            </div>
          </div>

          <div style={{width: '100%', marginBottom: '100px'}}>
            <h1 className="back-title">Agenda tu Cita</h1>
            <div className="row2">
              <div className="text2">
                <form onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
                  <div className="form-group-r">
                    <div className="modal-name">
                      <input
                        type='text'
                        className="form-control-r"
                        id='nombre'
                        placeholder='Nombre(s)'
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
                        ref={apellidop => this.inputApellidop = apellidop} />
                    </div>
                    <div className='porcent-r2'>
                      <input
                        type='text'
                        className="cell-r"
                        id='apellidom'
                        placeholder='Apellido Materno'
                        ref={apellidom => this.inputApellidom = apellidom} />
                    </div>
                  </div>
                  <div className="card-container-r2">
                    <div className='porcent-r'>
                      <input
                        type="email"
                        className="cell-r"
                        id='email'
                        placeholder='Email'
                        ref={email => this.inputEmail = email} />
                    </div>
                    <div className='porcent-r2'>
                      <input
                        type='text'
                        className="cell-r"
                        id='rfc'
                        placeholder='RFC'
                        minLength={12}
                        maxLength={13}
                        ref={rfc => this.inputRfc = rfc} />
                    </div>
                  </div>
                  <div className="form-group-r">
                    <div className="modal-name">
                      <select className="form-control-r" ref={municipio => this.inputMunicipio = municipio}>
                        <option id='municipio'>Pachuca de Soto</option>
                        <option id='municipio'>Acatlán</option>
                        <option id='municipio'>Acaxochitlán</option>
                        <option id='municipio'>Actopan</option>
                        <option id='municipio'>Agua Blanca</option>
                        <option id='municipio'>Ajacuba</option>
                        <option id='municipio'>Alfajayucan</option>
                        <option id='municipio'>Almoloya</option>
                        <option id='municipio'>Apan</option>
                        <option id='municipio'>Atitalaquia</option>
                        <option id='municipio'>Atlapexco</option>
                        <option id='municipio'>Atotonilco de Tula</option>
                        <option id='municipio'>Atotonilco el Grande</option>
                        <option id='municipio'>Calnali</option>
                        <option id='municipio'>Cardonal</option>
                        <option id='municipio'>Chapantongo</option>
                        <option id='municipio'>Chapulhuacán</option>
                        <option id='municipio'>Chilcuautla</option>
                        <option id='municipio'>Cuautepec de Hinojosa</option>
                        <option id='municipio'>El Arenal</option>
                        <option id='municipio'>Eloxochitlan</option>
                        <option id='municipio'>Emiliano Zapata</option>
                        <option id='municipio'>Epazoyucan</option>
                        <option id='municipio'>Francisco I. Madero</option>
                        <option id='municipio'>Huasca de Ocampo</option>
                        <option id='municipio'>Huautla</option>
                        <option id='municipio'>Huazalingo</option>
                        <option id='municipio'>Huehuetla</option>
                        <option id='municipio'>Huejutla de Reyes</option>
                        <option id='municipio'>Huichapan</option>
                        <option id='municipio'>Ixmiquilpan</option>
                        <option id='municipio'>Jacala de Ledezma</option>
                        <option id='municipio'>Jaltocán</option>
                        <option id='municipio'>Juárez Hidalgo</option>
                        <option id='municipio'>La Misión</option>
                        <option id='municipio'>Lolotla</option>
                        <option id='municipio'>Metepec</option>
                        <option id='municipio'>Metztitlán</option>
                        <option id='municipio'>Mineral de la Reforma</option>
                        <option id='municipio'>Mineral del Chico</option>
                        <option id='municipio'>Mineral del Monte</option>
                        <option id='municipio'>Mixquiahuala de Juárez</option>
                        <option id='municipio'>Molango</option>
                        <option id='municipio'>Nicolás Flores</option>
                        <option id='municipio'>Nopala de Villagrán</option>
                        <option id='municipio'>Omitlán de Juárez</option>
                        <option id='municipio'>Pacula</option>
                        <option id='municipio'>Pisaflores</option>
                        <option id='municipio'>Progreso de Obregón</option>
                        <option id='municipio'>San Agustín Metzquititlán</option>
                        <option id='municipio'>San Agustín Tlaxiaca</option>
                        <option id='municipio'>San Bartolo Tutotepec</option>
                        <option id='municipio'>San Felipe Orizatlán</option>
                        <option id='municipio'>San Salvador</option>
                        <option id='municipio'>Santiago de Anaya</option>
                        <option id='municipio'>Santiago Tulantepec de Lugo Guerrero</option>
                        <option id='municipio'>Singuilucan</option>
                        <option id='municipio'>Tasquillo</option>
                        <option id='municipio'>Tecozautla</option>
                        <option id='municipio'>Tenango de Doria</option>
                        <option id='municipio'>Tepeapulco</option>
                        <option id='municipio'>Tepehuacán de Guerrero</option>
                        <option id='municipio'>Tepeji del Río de Ocampo</option>
                        <option id='municipio'>Tepetitlán</option>
                        <option id='municipio'>Tetepango</option>
                        <option id='municipio'>Tezontepec de Aldama</option>
                        <option id='municipio'>Tianguistengo</option>
                        <option id='municipio'>Tizayuca</option>
                        <option id='municipio'>Tlahuelilpan</option>
                        <option id='municipio'>Tlahuiltepa</option>
                        <option id='municipio'>Tlanalapa</option>
                        <option id='municipio'>Tlanchinol</option>
                        <option id='municipio'>Tlaxcoapan</option>
                        <option id='municipio'>Tolcayuca</option>
                        <option id='municipio'>Tula de Allende</option>
                        <option id='municipio'>Tulancingo de Bravo</option>
                        <option id='municipio'>Villa de Tezontepec</option>
                        <option id='municipio'>Xochiatipan</option>
                        <option id='municipio'>Xochicoatlán</option>
                        <option id='municipio'>Yahualica</option>
                        <option id='municipio'>Zacualtipán de Ángeles</option>
                        <option id='municipio'>Zapotlán de Juárez</option>
                        <option id='municipio'>Zempoala</option>
                        <option id='municipio'>Zimapán</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group-r">
                    <div className="modal-name">
                      <input
                        type='text'
                        className="form-control-r"
                        id='colonia'
                        placeholder='Colonia'
                        ref={colonia => this.inputColonia = colonia} />
                    </div>
                  </div>
                  <div className="card-container-r2">
                    <div className='porcent-r'>
                      <input
                        min="2020-03-01"
                        max="2020-06-31"
                        type="date"
                        className="cell-r"
                        id='fecha'
                        placeholder='Fecha'
                        required
                        ref={fecha => this.inputFecha = fecha} />
                    </div>
                    <div className='porcent-r2'>
                      <select className="form-control-r" ref={hora => this.inputHora = hora}>
                        <option id='hora'>8:00</option>
                        <option id='hora'>9:00</option>
                        <option id='hora'>10:00</option>
                        <option id='hora'>11:00</option>
                        <option id='hora'>12:00</option>
                        <option id='hora'>13:00</option>
                        <option id='hora'>14:00</option>
                        <option id='hora'>15:00</option>
                        <option id='hora'>16:00</option>
                        <option id='hora'>17:00</option>
                        <option id='hora'>18:00</option>
                        <option id='hora'>19:00</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group-r">
                    <div className="modal-name">
                      <select className="form-control-r" ref={sede => this.inputSede = sede}>
                        <option id='sede'>Pachuca de Soto</option>
                        <option id='sede'>Huejutla</option>
                      </select>
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
                    <button type='submit' className="boton-color2" onClick={this.toggleHidden.bind(this)}>Confirmar</button>
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
                        <p className="name-size2">{this.state.sede}</p>
                      </div>
                      <div className="column-t">
                        <p className="name-size">Observaciones</p>
                        <p className="name-size3">
                          Le recordamos que en el caso de pagar en BBVA y Santander el pago tardara en
                          reflejarse en un tiempo de 48 horas aproximadamente.
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
