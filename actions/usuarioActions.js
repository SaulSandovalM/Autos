import firebase from '../Firebase';

export function iniciarSesionAction(usuario) {
  return {type:"INICIAR_SESION" , usuario};
}

export function cerrarSesionAction(usuario) {
  return { type:"CERRAR_SESION" , usuario };
}

export function comprobarUsuarioAction(usuario) {
  return { type:"COMPROBAR_USUARIO", usuario};
}

export function iniciarSesion(user) {
  return function(dispatch, getState) {
    return firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((u) => {
        console.log('Ya estoy adentro');
        console.log('USUARIO ID' + u.uid);
        dispatch(iniciarSesionAction(u));
      })
  }
}

export function registrarEIniciarSesion(user) {
  return function (dispatch, getState) {
    return firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        debugger;
          dispatch(iniciarSesion(user))
          .then( (result) =>{
            debugger;
            let userFirebase = firebase.auth().currentUser;
            let fullname = user.fullName;
            userFirebase.updateProfile({
                displayName: fullname,
            }).then( () => {
                console.log('Perfil actualizado');
            }, error => {
            });
          })
      })
    .catch(function(error) {
      let errorMessage = error.message;
      console.log('Algo salio mal' + errorMessage);
    });
  }
}

export function cerrarSesion() {
  return function (dispatch,getState) {
    return firebase.auth().signOut()
      .then( (r) => {
        console.log('Ya sali ', r);
        dispatch(cerrarSesionAction(null));
      }).catch( (error) => {
        console.error('No pude salir, ayuda');
      });
  }
}

export function comprobarUsuario(){
  return function (dispatch, getState) {
    return firebase.auth().onAuthStateChanged((u) => {
      if(u){
        debugger;
        dispatch(comprobarUsuarioAction(u));
      }else{
        debugger;
      }
    });
  }
}
