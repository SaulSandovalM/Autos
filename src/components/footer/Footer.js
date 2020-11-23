import React, { Component } from 'react'
import './Footer.css'
import logof from '../../assets/logof.png'
import escudo from '../../assets/escudo.svg'

export default class Footer extends Component {
  render () {
    return (
      <div className='footer-container'>
        <div className='legal'>
          <div className='img-f'>
            <img className='imgH' src={logof} alt='' />
          </div>
          <div className='legal2'>
            <div className='img-container'>
              <div className='img-content'>
                <img className='imgH2' src={escudo} alt='' />
              </div>
              <p className='p-f'>© 2019 Gobierno del Estado de Hidalgo</p>
            </div>
          </div>
          <div className='img-f'>
            <p className='img-content'>
              Contacto <br />
              Carretera México – Pachuca Km 84.5, Centro Cívico
              <br />
              Pachuca de Soto, Hidalgo, México
              <br />
              +52 (771) 71 79000 Ext. 9217
            </p>
          </div>
        </div>
      </div>
    )
  }
}
