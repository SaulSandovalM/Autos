import React, {Component} from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="legal">
          <div className="img-f">
            <img className="imgH" src={'https://cdn.hidalgo.gob.mx/logo_hgo_2019.png'} alt="" />
          </div>
          <div className="legal" style={{width: '33.3%', justifyContent: 'center', paddingTop: '55px'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <img className="imgH2" src={'http://cdn.hidalgo.gob.mx/escudo_blanco.svg'} alt=""/>
              </div>
              <p style={{height: '0px', margin: '0', color: '#fff'}}>© 2019 Gobierno del Estado de Hidalgo</p>
            </div>
          </div>
          <div className="img-f">
            <p style={{display: 'flex', justifyContent: 'center'}}>
              Contacto <br></br>
              Carretera México – Pachuca Km 84.5, Centro Cívico
              <br></br>
              Pachuca de Soto, Hidalgo, México
              <br></br>
              +52 (771) 71 79000 Ext. 9217
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
