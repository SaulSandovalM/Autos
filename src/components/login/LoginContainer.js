import React, {Component} from 'react';
import Login from "./Login";
import './Login.css'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as usuarioActions from '../../actions/usuarioActions';

const containerStyle = {
  height: '100vh',
  display: 'flex',
  alingItems: 'center',
  justifyContent: 'center',
};

class LoginContainer extends Component {
  state = {
    showDrawer : false
  };

  openDrawer = () => {
    let {showDrawer} = this.state;
    showDrawer = !showDrawer;
    this.setState({showDrawer});
  };

  forceClosingDrawer = () => {
    this.setState({showDrawer:false})
  };

  constructor(props) {
    super(props);
    this.state = {
      usuario:{
        email: '',
        password: '',
      }
    };
  }

  loginWithPassword = (e) => {
    e.preventDefault();
    const user = Object.assign({},this.state.usuario);
    console.log(user.email + user.password);
    this.props.usuarioActions.iniciarSesion(user)
    .then( () => {
        this.props.history.push('/TablePachuca');
    });
  };

  handleChange = (e) => {
    let usuario = this.state.usuario;
    usuario[e.target.name] = e.target.value;
    this.setState({usuario});
  };

  render(){
    return(
      <div>
        <div className="back-login">
          <div style={containerStyle}>
            <Login
              onChange={this.handleChange}
              onSubmit={this.loginWithPassword}
              usuario={this.state.usuario}
            />
          </div>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    usuario: state.usuario
  }
}

function mapDispatchToProps(dispatch) {
  return {
    usuarioActions: bindActionCreators(usuarioActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (LoginContainer);
